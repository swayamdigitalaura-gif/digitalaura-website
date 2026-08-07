#!/usr/bin/env bash
# Adds specific, hard-coded `location` blocks to the live nginx config if
# they aren't there yet — so a new landing-page slug starts routing
# without a manual SSH edit. Deliberately NOT a generic "diff the whole
# file" tool: earlier attempts at that misdetected an existing block
# (/admin-panel/) as missing due to a formatting difference on the live
# file, which is exactly the kind of mistake this script must never make
# against production. Only touch what we explicitly, individually verify.
#
# Safety:
#  - Idempotent: a location path that's already live is left untouched.
#  - Self-heals a known past mistake: an earlier version of this script
#    wrote its backup file *inside* sites-enabled/, which nginx globs —
#    that produced a duplicate `listen` directive and failed `nginx -t`.
#    This version always removes any such stray backups before doing
#    anything else, and writes new backups to /tmp/, never sites-enabled/.
#  - Never edits the live file directly — writes to a temp copy, then
#    only swaps it in if `nginx -t` passes against it.
#  - Any failure (can't find the live file, `nginx -t` fails) aborts
#    with a non-zero exit and restores the original file, so this can
#    never leave the live site broken.
set -euo pipefail

# path -> full location block to insert if `path` isn't already live.
declare -A NEW_LOCATIONS=(
  [/digital-marketing-company-ahmedabad]='    # Digital marketing company landing page (same app as seo-services-ahmedabad)
    location /digital-marketing-company-ahmedabad {
        proxy_pass http://localhost:5003;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }'
)

# Literal substring (no regex metacharacters) — the insertion point.
ANCHOR='js|css|png|jpg|jpeg|gif|webp|ico|svg|woff|woff2|ttf|eot'

# Find the live server block for thedigitalaura.com (not the www-redirect
# block, which has no `location` directives of its own).
LIVE=""
for f in /etc/nginx/sites-enabled/* /etc/nginx/conf.d/*.conf /etc/nginx/nginx.conf; do
  [ -f "$f" ] || continue
  case "$f" in *.bak-*) continue ;; esac
  if grep -q 'server_name thedigitalaura.com;' "$f" 2>/dev/null; then
    LIVE="$f"
    break
  fi
done

if [ -z "$LIVE" ]; then
  echo "ERROR: couldn't find the live thedigitalaura.com server block under /etc/nginx. Nothing changed — add the missing location block(s) manually." >&2
  exit 1
fi

echo "Live nginx config: $LIVE"

# Clean up any stray backups a previous run may have left inside the
# same directory as $LIVE — nginx globs that whole directory, so a
# leftover backup there causes a permanent "duplicate listen" failure.
LIVE_DIR="$(dirname "$LIVE")"
LIVE_NAME="$(basename "$LIVE")"
shopt -s nullglob
STRAYS=("$LIVE_DIR/$LIVE_NAME".bak-*)
shopt -u nullglob
if [ "${#STRAYS[@]}" -gt 0 ]; then
  echo "Removing ${#STRAYS[@]} stray backup file(s) left in $LIVE_DIR by a previous run: ${STRAYS[*]}"
  sudo rm -f "${STRAYS[@]}"
fi

WORK="$(mktemp)"
cp "$LIVE" "$WORK"
CHANGED=0

for path in "${!NEW_LOCATIONS[@]}"; do
  if grep -qF "location $path {" "$WORK"; then
    echo "Already live, skipping: $path"
    continue
  fi

  echo "Adding missing location: $path"
  block="${NEW_LOCATIONS[$path]}"
  awk -v block="$block" -v anchor="$ANCHOR" '
    index($0, anchor) > 0 && !done { print block; done = 1 }
    { print }
  ' "$WORK" > "$WORK.new"
  mv "$WORK.new" "$WORK"
  CHANGED=1
done

if [ "$CHANGED" != "1" ]; then
  echo "Nothing to add — live config already has every location block."
  rm -f "$WORK"
  exit 0
fi

echo "Validating candidate config with nginx -t..."
# Backups go to /tmp — NEVER back into sites-enabled/, which nginx globs.
BACKUP="/tmp/$(basename "$LIVE").bak-$(date +%s)"
sudo cp "$LIVE" "$BACKUP"
sudo cp "$WORK" "$LIVE"
rm -f "$WORK"

if sudo nginx -t; then
  sudo systemctl reload nginx
  echo "nginx reloaded successfully with the new location block(s)."
else
  echo "ERROR: nginx -t failed against the updated config — restoring the previous version, nothing was reloaded." >&2
  sudo cp "$BACKUP" "$LIVE"
  exit 1
fi

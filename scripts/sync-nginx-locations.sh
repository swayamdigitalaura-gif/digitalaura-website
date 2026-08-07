#!/usr/bin/env bash
# Syncs any simple `location /path { ... }` blocks from the repo's
# nginx-updated.conf into the live nginx config that aren't there yet —
# so a new landing-page slug starts routing without a manual SSH edit.
# Only plain path-based locations are handled (not `=`, `^~`, `~*`
# modifier locations) — that's exactly the shape every landing-page
# block uses, and it keeps the matching logic simple and predictable.
#
# Safety:
#  - Idempotent: a location path that's already live is left untouched.
#  - Never edits the live file directly — writes to a copy, then only
#    swaps it in if `nginx -t` passes against the copy.
#  - Any failure (can't find the live file, `nginx -t` fails) aborts
#    with a non-zero exit and changes nothing, so this can never take
#    the live site down.
set -euo pipefail

SRC=/tmp/nginx-updated.conf
# Literal substring (no regex metacharacters) so it can be handed to awk
# via -v without any backslash-escaping surprises.
ANCHOR='js|css|png|jpg|jpeg|gif|webp|ico|svg|woff|woff2|ttf|eot'

if [ ! -f "$SRC" ]; then
  echo "ERROR: $SRC not found (did the scp step run?)" >&2
  exit 1
fi

# Find the live server block for thedigitalaura.com (not the www-redirect
# block, which has no `location` directives of its own).
LIVE=""
for f in /etc/nginx/sites-enabled/* /etc/nginx/conf.d/*.conf /etc/nginx/nginx.conf; do
  [ -f "$f" ] || continue
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

WORK="$(mktemp)"
cp "$LIVE" "$WORK"
CHANGED=0

# Extract each top-level `location /path { ... }` block from the repo's
# reference file, and insert any that are missing from the live file.
# Uses process substitution (not a trailing pipe) so the loop runs in
# *this* shell — a piped `while read` would run in a subshell and lose
# the CHANGED flag once the loop ends.
while IFS= read -r -d $'\x02' entry; do
  path="${entry%%$'\x01'*}"
  block="${entry#*$'\x01'}"

  if grep -qF "location $path {" "$WORK"; then
    echo "Already live, skipping: $path"
    continue
  fi

  echo "Adding missing location: $path"
  # Insert right before the static-asset-caching block, which is a
  # stable, unique anchor present in every version of this config.
  awk -v block="$block" -v anchor="$ANCHOR" '
    index($0, anchor) > 0 && !done { print block; done = 1 }
    { print }
  ' "$WORK" > "$WORK.new"
  mv "$WORK.new" "$WORK"
  CHANGED=1
done < <(awk '
  /^    location \/[^ ]+ \{/ {
    path = $2
    block = $0 "\n"
    depth = gsub(/\{/, "{") - gsub(/\}/, "}")
    while (depth > 0 && (getline line) > 0) {
      block = block line "\n"
      depth += gsub(/\{/, "{", line) - gsub(/\}/, "}", line)
    }
    printf "%s\x01%s\x02", path, block
  }
' "$SRC")

if [ "$CHANGED" != "1" ]; then
  echo "Nothing to add — live config already has every location block."
  rm -f "$WORK"
  exit 0
fi

echo "Validating candidate config with nginx -t..."
BACKUP="$LIVE.bak-$(date +%s)"
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

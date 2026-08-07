<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Never add `robots.txt` or `sitemap.xml` to `public/`

This app is proxied under `thedigitalaura.com/<slug>` — it is not its own site.
On deploy, `.github/workflows/deploy.yml` runs:

```
cp -r /home/landing-seo/public/* /home/digitalaura.temp/public_html/
```

so everything in `public/` lands **on top of the main site's web root**. A
`robots.txt` or `sitemap.xml` here silently overwrites the real, site-wide ones
— that is exactly how the live sitemap once ended up listing a single URL.

Canonical versions live in `digital-aura-project`: `public/robots.txt`, and
`scripts/prerender.mjs` which generates `sitemap.xml` at build time. When adding
a new landing-page slug, add it to that script's `EXTRA_LIVE_ROUTES` array and
to `nginx-updated.conf`.

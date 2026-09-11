# Islamic Society of Sheboygan (redirect)

islamicsocietysheboygan.org has moved to https://islamic-society-of-sheboygan.minbar.one/.

This repo only redirects visitors there:

- `netlify.toml`: Netlify redirects every URL on the domain to the new site (HTTP 301).
- `index.html`: fallback page that redirects in the browser and shows a button if that doesn't happen.

The previous Jekyll site is still in the git history before this change.

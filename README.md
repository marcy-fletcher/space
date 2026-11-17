# Moving notice

A standalone temporary notice matching Marcy's Library: Barlow Condensed Light, raspberry accents, the site's light and plum graphite dark palettes, and a transparent resin-style librarian illustration.

## Message

The move is still in progress: "We're moving to a new home." The supporting copy reads "The library is packing its shelves. We'll be back soon." There is no destination link or promised reopening date.

## Upload

Upload `index.html`, `styles.css`, and the complete `assets/` directory to the old site's public document root. Preserve their relative paths. No installation, build, backend, CDN, or framework is required. You can also open `index.html` directly to preview it.

The page does not redirect automatically. The theme follows the operating system, with no manual switch. The page requires no JavaScript and contains no analytics or remote assets.

## GitHub Pages deployment

The `Deploy` workflow publishes the notice on pushes to `master`. It can also be started manually from the Actions tab with `master` selected.

The workflow copies only `index.html`, `styles.css`, and `assets/` into `dist/`, then publishes that directory to the `gh-pages` branch. It requires no Node.js, npm dependencies, build command, or repository secrets beyond the automatic `GITHUB_TOKEN`. Old published files are removed during deployment.

In the repository's **Settings → Pages**, the source must be **Deploy from a branch**, with branch **gh-pages** and folder **/ (root)**.

This notice applies wherever your host serves this HTML file. Existing deep URLs need a host-level fallback or redirect configured separately. No hosting configuration is included.

The local Barlow Condensed Light font is distributed under the SIL Open Font License in `assets/OFL.txt`. The icon comes from this project's brand artwork.

## Artwork

The page uses `assets/moving-librarian-v3.webp`, the optimized owner-provided illustration with its transparent alpha channel preserved.

The WebP is resized to 1120 pixels wide without enlargement and encoded at quality 88 with alpha quality 100.

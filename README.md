# Deep Radio Docs

Technical documentation for **Deep Radio** by BaSig Wireless Laboratories, published at
**https://deepradio.basigwireless.com**.

- Pages are Markdown files in `docs/`; the menu is set in `mkdocs.yml` (`nav:`).
- Every push to `main` builds the site with MkDocs Material and deploys it to GitHub Pages
  (`.github/workflows/pages.yml`).
- Preview locally: `pip install "mkdocs>=1.6,<2" "mkdocs-material>=9.7,<10"` then `mkdocs serve`.

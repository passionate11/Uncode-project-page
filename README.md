# UNCODE — Project Page

Academic project page for **"Empirical Analysis of Decoding Biases in Masked Diffusion Models"** (ACL 2026).

It is a fully **static** site (plain HTML/CSS/JS) — no build step, no server-side code.

```
site/
├── index.html
└── static/
    ├── css/style.css
    ├── js/main.js
    ├── images/        # figures extracted from the paper + poster
    └── pdf/           # paper PDF + poster PDF (linked by the buttons)
```

## Preview locally

Just open the file — or, to make the relative paths and PDF links behave exactly like production, serve it:

```bash
cd site
python3 -m http.server 8000
# then open http://localhost:8000
```

(Plain double-click of `index.html` also works; a local server is only nicer for the PDF links.)

## Publish it — you are **not** limited to GitHub

This is a static folder, so it can live anywhere:

| Option | How | Notes |
|---|---|---|
| **GitHub Pages** | push `site/` contents to a repo, enable Pages | free, `username.github.io/repo`; what most academic pages use |
| **Netlify** | drag-and-drop the `site/` folder at app.netlify.com/drop | free, instant URL, custom domain |
| **Vercel** | `vercel` CLI or import the repo | free, custom domain |
| **Cloudflare Pages** | connect repo or direct upload | free, fast CDN |
| **GitLab Pages** | push + `.gitlab-ci.yml` | free |
| **Any web/lab server** | copy `site/` into the web root | full control |

### GitHub Pages quick start

```bash
cd site
git init
git add .
git commit -m "UNCODE project page"
git branch -M main
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main
# GitHub → repo Settings → Pages → Source: "main" / root  → Save
```

Your page goes live at `https://<you>.github.io/<repo>/`.
Tip: for a clean `https://<you>.github.io/` URL, name the repo `<you>.github.io`.

## Editing

- Text/structure: `index.html`
- Colors, layout, responsiveness: `static/css/style.css` (CSS variables at the top)
- Behavior (nav, copy-BibTeX, image zoom): `static/js/main.js`
- Equations use MathJax (loaded from a CDN) — internet needed only for the math fonts and Google Fonts; everything else is local.

## Things you may want to update

- **Venue line** — set to `ACL 2026 · Main Conference` (city removed). ✓
- **Author homepage links** — first author (Pengcheng Huang) links to https://passionate11.github.io/. Add links for the other authors if you have them (currently plain text).
- **Contact email** (`pengcheng.neu@outlook.com`) and **Code link** (`https://github.com/NEUIR/Uncode`) — confirmed. ✓
- **BibTeX** — currently an ACL-2026 `@inproceedings` stub with the arXiv id in a note; swap in the official ACL Anthology id once available.
- **Social previews**: `og:image`, `og:url`, and `twitter:image` in `<head>` are currently relative paths. Social scrapers (X/Twitter, LinkedIn, Slack) need **absolute** `https://…` URLs, so after you pick a host set them to e.g. `https://<you>.github.io/<repo>/static/images/fig1_teaser.png`. There is a reminder comment right above those tags.

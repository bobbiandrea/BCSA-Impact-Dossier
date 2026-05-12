# BCSA Impact Report — Production Site

**Based Creators Southern Africa (@BCSA_Region)**
Impact Report 2025 — Official southern region chapter site.

---

## Project Structure

```
bcsa-site/
├── index.html          ← Main page (edit content here)
├── netlify.toml        ← Netlify deployment config
├── vercel.json         ← Vercel deployment config
├── public/
│   ├── favicon.svg     ← BC favicon
│   └── images/         ← All 42 photos (reference as /images/filename.jpg)
└── src/
    ├── styles.css      ← All styles (Base brand fonts + design system)
    └── main.js         ← Scroll reveal, KPI counters, lightbox, tabs
```

---

## Deploy in 2 Minutes

### Option A — Netlify (Recommended, free)
1. Go to [netlify.com](https://netlify.com) → Sign up
2. Drag and drop the **entire `bcsa-site` folder** onto the Netlify deploy area
3. Done — live URL instantly

### Option B — Vercel
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Push this folder to a GitHub repo
3. Import repo in Vercel → Deploy
4. Done — live URL instantly

### Option C — GitHub Pages (free)
1. Push to a GitHub repo
2. Go to repo Settings → Pages → Source: main branch, root folder
3. Done — live at `yourusername.github.io/bcsa-site`

---

## Adding Your Custom Domain

After deploying on Netlify or Vercel:
1. Go to Domain Settings in the dashboard
2. Add your domain (e.g. `bcsa.create.blue`)
3. Add the CNAME record they give you to your DNS provider
4. SSL is automatic

---

## Updating Content

All content is in `index.html` — open it in Windsurf/VS Code and edit:

- **Stats** → search for `kpi-num` to find the numbers
- **Council members** → search for `q-panel` section
- **Chapter table** → search for `table-wrap`
- **New images** → drop into `public/images/` and add a new `.gallery-item` div

---

## Image Notes

Images are in `public/images/`. They load lazily (`loading="lazy"`) so
the page loads fast even with 42 photos. The hero image loads with
priority (`fetchpriority="high"`).

If you want to compress images for even faster load:
```
npx sharp-cli --input "public/images/*.jpg" --output "public/images/" --quality 80
```

---

## Fonts (Base Brand)

- **Inter Tight** — headlines, nav, KPI numbers
- **Inter** — body text, descriptions
- **Roboto Mono** — labels, tags, metadata, eyebrows
- **Doto** — ticker text, statement watermark

Loaded from Google Fonts CDN. Fallback: Arial Narrow / system-ui / Courier New.

---

Built for Based Creators Southern Africa — @BCSA_Region
create.blue | discord.thecreators.com | GM

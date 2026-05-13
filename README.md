# BCSA Impact Dossier — Production Site

**Based Creators Southern Africa (@BCSA_Region)**
Impact Report 2025—2026 — Official southern region chapter site.

---

## 🏗️ Project Overview
This is a high-fidelity impact dossier for BCSA, showcasing regional growth, builder metrics, and the strategic roadmap for Southern Africa's onchain ecosystem on Base.

### Tech Stack
- **Foundation**: Semantic HTML5 / Vanilla JavaScript (ES6+)
- **Styling**: Modern CSS3 (Custom Properties, Grid, Flexbox)
- **Visuals**: Three.js (Architectural WebGL visualizations)
- **Typography**: Inter Tight, Inter, IBM Plex Mono (Google Fonts)

---

## 📂 Project Structure

```
bcsa-site/
├── index.html          ← Main landing page & ecosystem dossier
├── report.html         ← Formal impact report (Data-driven)
├── netlify.toml        ← Netlify deployment config
├── vercel.json         ← Vercel deployment config
├── public/
│   ├── favicon.svg     ← BCSA brand favicon
│   └── images/         ← Verified IRL activity photos & social proof
└── src/
    ├── styles.css      ← Design system & brand-aligned styles
    └── main.js         ← Interactive logic, Three.js scenes, & UI state
```

---

## 🚀 Deployment

### Quick Deploy (Netlify)
1. Drag and drop the `bcsa-site` folder onto the [Netlify Drop](https://app.netlify.com/drop) area.
2. Configure your custom domain (e.g., `bcsa.create.blue`).

### Professional Deploy (Vercel)
1. Push this repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com).
3. The `vercel.json` file handles performance headers and redirects automatically.

---

## 🛠️ Maintenance & Updates

- **Verified Metrics**: Keep numbers in `index.html` and `report.html` aligned (e.g., Chapter counts, Member totals).
- **Images**: New verified IRL photos should be added to `public/images/` and referenced in the masonry gallery.
- **Brand Consistency**: All styling should adhere to the tokens defined in `:root` inside `src/styles.css`.

---

## ⚖️ Governance & Alignment
This site is maintained by the BCSA Council. It is designed to be **Base-aligned** but operates as an independent regional initiative for Southern Africa.

**Last Updated**: 13 May 2026, CAT
**Contact**: @BCSA_Region on X / warpcast

---
Built with 💙 on Base.

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

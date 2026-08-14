# BCSA Impact Dossier — Production Site

**Based Creators Southern Africa (@BCSA_Region)**
Impact Report 2025—2026 — Official southern region chapter site.

> **Status:** this repository is being reconstructed as the personal portfolio and digital
> archive of Bobbi Andrea. BCSA is a completed chapter of that work and is being re-framed
> as historical material. The pages below still contain the original BCSA copy and have not
> yet been rewritten. See `content/` for the editorial and evidence ledger that the new site
> will be built from.

---

## Privacy & data handling

18 image files were removed from this repository because they contained personal or
sensitive material: financial transaction receipts, a phone number, a community member
roster with real names and profile photos, live-call participant lists, a shipping tracking
number, internal planning and governance documents, an electronic signature form with
personal-data fields, and third-party private social content. They are listed in
`content/excluded.json` with the reason for each, described generically so that this
repository does not restate the data it is meant to remove.

**Cleanup that is still outstanding and cannot be done from this repository:**

- **Git history.** The files were removed from the current `HEAD` only. Every earlier commit
  still contains them, and because this repository is public they remain retrievable from
  GitHub until history is rewritten. That decision is deliberately deferred.
- **Previous deployments.** This project has been deployed to Vercel. Vercel retains every
  past deployment at its own immutable URL, so earlier builds continue to serve the removed
  files regardless of the current state of `main`. These must be deleted from the Vercel
  dashboard by the account owner.
- **Third-party caches.** Search engines, social-card scrapers, and archiving services may
  hold copies of the removed images independently of both of the above.

**Rules for adding images to this repository:**

1. Inspect every image individually before use. Filenames in the original asset set were
   unreliable and several actively misdescribed their contents.
2. Do not publish an image containing an identifiable person without recorded consent.
   Consent status is tracked per file in `content/excluded.json`.
3. Do not publish screenshots of chat apps, member lists, email, documents, payment
   confirmations, or wallet interfaces.
4. Write `alt` text that describes what is actually in the image, not what it is meant to
   demonstrate.

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
├── content/            ← Editorial & evidence ledger (not rendered)
│   ├── work.json       ← Projects, roles, creative work, experiments
│   ├── trajectory.json ← Employment & professional history
│   └── excluded.json   ← Material that must not be published, with reasons
├── public/
│   ├── favicon.svg     ← BCSA brand favicon
│   └── images/         ← Image assets (see "Privacy & data handling" above)
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

- **Verified Metrics**: Keep numbers in `index.html` and `report.html` aligned (e.g., Square counts, Member totals).
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
- **Square table** → search for `table-wrap`
- **New images** → drop into `public/images/` and add a new `.gallery-item` div

---

## Image Notes

Images are in `public/images/` and load lazily (`loading="lazy"`). 24 files remain after the
privacy removal described above. Only images that contain no identifiable people are
currently published; the rest are retained in the repository but unreferenced, pending
consent decisions recorded in `content/excluded.json`.

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

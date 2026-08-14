# Bobbi Andrea — personal portfolio

Personal portfolio and digital archive for **Bobbi Andrea**: multidisciplinary creative, technologist and
builder. Music and songwriting, graphic design, radio and media, onchain and community work, software and AI.

This repository began life as the *BCSA Impact Dossier*. That material is now source material for one completed
chapter of the work, preserved as an archive — it is not the identity of this site.

---

## Status

The structure and the evidence-controlled content model are in place. A number of descriptions are deliberately
**controlled placeholders** rather than prose, because the underlying facts have not been supplied. Placeholders
render as visible chips (for example `Date not supplied`) and are never filled in with plausible-sounding guesses.

Outstanding before launch: see [Launch checklist](#launch-checklist).

---

## Architecture

Intentionally zero-build: static HTML, one stylesheet, one vanilla-JavaScript file, static assets. No framework,
no bundler, no dependencies, no build step. Clean URLs come from directories containing `index.html`, which works
identically on Netlify, Vercel and a plain local static server.

```
/                             index.html                Home
/work/                        work/index.html           Work index (filterable)
/work/swice/                  work/swice/index.html     SWICE case study
/work/bcsa/                   work/bcsa/index.html      BCSA case study
/archive/bcsa-report/         archive/…/index.html      Archived BCSA report (noindex)
/about/                       about/index.html          Biography and full trajectory
/report.html                  report.html               Redirect to the archive

content/                      Editorial and evidence ledger (not rendered)
  work.json                   Projects, roles, creative work, experiments
  trajectory.json             Employment and professional history
  excluded.json               Material that must not be published, with reasons
public/favicon.svg            Favicon
public/og/bobbi-andrea.png    Typographic Open Graph image (1200×630)
public/images/                Image assets — see Privacy & data handling
src/styles.css                Design system
src/main.js                   Reveal animations, work filters, hero WebGL
```

**Asset paths are root-relative** (`/src/styles.css`), so pages in subdirectories resolve correctly. This means
opening an HTML file directly from disk (`file://`) will not load styles — use the local server below.

### Local development

```bash
npm start          # serves at http://localhost:3000
```

Any static server works, for example `python3 -m http.server 3000`.

---

## Content model

`content/*.json` is the editorial source of truth and the evidence ledger. It is not rendered by any page; it
exists so that an assumption never becomes a biographical claim.

Every entry carries an **evidence** level — `VERIFIED_PUBLIC`, `USER_PROVIDED`, `INTERNAL_PROJECT_HISTORY`,
`NEEDS_VERIFICATION`, `UNCERTAIN`, `EXCLUDED` — and a **visibility** state: `published`, `draft`, `placeholder`,
`internal_only`, `excluded`.

Rules that the pages follow:

1. Nothing whose evidence is `NEEDS_VERIFICATION` or `UNCERTAIN` is published as established fact.
2. Approximate dates stay visibly approximate. Unknown dates stay unknown.
3. Items are classified by what they are — `EMPLOYMENT`, `ROLE`, `PROJECT`, `CREATIVE_WORK`, `MEDIA`,
   `COMMUNITY`, `EXPERIMENT`, `RESEARCH`, `CURRENT_BUILD`, `ARCHIVED`, `THIRD_PARTY` — and never flattened into
   one kind of card. Employment is not presented as a personal project.
4. Ecosystem participation is never written as ownership, founding or affiliation.
5. Internal engineering milestones are not converted into public product claims.
6. Prefer "unknown" over "probably", and "not publicly available" over "coming soon".
7. `excluded.json` records what must never be published, so an exclusion decided once cannot be quietly reversed
   by later work.

### Editing content

Update the JSON ledger first, then the page markup. Cards and rows are authored as real HTML carrying
`data-discipline` attributes; the JSON is the record and the audit trail, not a runtime data source. This is
deliberate — see *No-JavaScript guarantee*.

---

## No-JavaScript guarantee

**All content is visible without JavaScript.** JavaScript only enhances: scroll reveals, the work-index filters,
and the atmospheric hero visual.

- Reveal animations are opt-in. An inline snippet in each page head adds a `js` class; the stylesheet only hides
  reveal targets under that class. If `src/main.js` fails to load or throws, a fail-open timer removes the class
  and everything appears.
- The work index renders every row in the HTML. Filters are buttons that hide rows via the `hidden` attribute, so
  with JavaScript off the full list is shown.
- The hero WebGL is skipped entirely when Three.js is unavailable, when WebGL is unsupported, or when reduced
  motion is requested. It pauses when off-screen and when the tab is hidden.
- `prefers-reduced-motion` disables the reveals, the ticker and the WebGL animation loop.

---

## Privacy & data handling

18 image files were removed from this repository because they contained personal or sensitive material:
financial transaction receipts, a phone number, a community member roster with names and profile photos,
live-call participant lists, a shipping tracking number, internal planning and governance documents, an
electronic signature form with personal-data fields, and third-party private social content. They are listed in
`content/excluded.json` with the reason for each, described generically so that this repository does not restate
the data it is meant to remove.

**Cleanup that is still outstanding and cannot be done from this repository:**

- **Git history.** The files were removed from the current `HEAD` only. Every earlier commit still contains them,
  and because this repository is public they remain retrievable from GitHub until history is rewritten. That
  decision is deliberately deferred.
- **Previous deployments.** This project has been deployed to Vercel. Vercel retains every past deployment at its
  own immutable URL, so earlier builds continue to serve the removed files regardless of the current state of the
  default branch. These must be deleted from the Vercel dashboard by the account owner.
- **Third-party caches.** Search engines, social-card scrapers and archiving services may hold copies
  independently of both of the above. One removed file was the previous site's Open Graph share image.

**Rules for adding images:**

1. Inspect every image individually before use. Filenames in the original asset set were unreliable and several
   actively misdescribed their contents.
2. Do not publish an image containing an identifiable person without recorded consent. Consent status is tracked
   per file in `content/excluded.json`.
3. Do not publish screenshots of chat apps, member lists, email, documents, payment confirmations or wallet
   interfaces.
4. Write `alt` text describing what is actually in the image, not what it is meant to demonstrate.

### Images and the gallery

24 image files remain and **none is referenced by any page.** The gallery is deferred rather than filled: the
remaining safe images are cafe interiors, food and venue shots, which are not portfolio material. Seven
photographs showing identifiable people are retained but unreferenced, pending consent.

There is **no headshot** of Bobbi Andrea in this repository. `bobbi.jpg` is a screenshot of a social-media photos
tab, not a portrait, and must not be used as one.

---

## Design system

Editorial and architectural: a near-white canvas, near-black text, hairline-grid card groups, monospace
micro-labels, and one accent. Type is Inter Tight for display, Inter for body, IBM Plex Mono for labels.

The accent is `--accent: #C2410C`, a deliberate personal accent. It is **not** Base's brand blue: this is a
personal portfolio and must not read as an official Base property. Base appears in factual descriptions of the
work only. There is no "BUILT ON BASE" badge and no Base wordmark.

Removed from the original: the "Ecosystem Map" and "Regional Footprint" WebGL visualisations, which plotted
randomly generated points and were presented as ecosystem data. The hero atmosphere is retained because it is
explicitly decorative.

---

## Launch checklist

Everything below is blocked on information that has not been supplied, or must be done at launch:

- [ ] **Final domain.** Then add absolute `og:url`, `og:image`, `twitter:image` and `rel=canonical` to every
      page, and add `sitemap.xml` and `robots.txt`. Open Graph requires absolute URLs; the current relative paths
      are placeholders.
- [ ] **Contact email** and the final set of public profile links.
- [ ] **Headshot**, plus any approved photography for a gallery.
- [ ] **Music links** — no audio, release page or artwork exists in the repository.
- [ ] **Design portfolio assets** at real resolution.
- [ ] **Exact wording** for: the DC Radio show title and role; the New School Rhythms dates; On Base Rhythms'
      scope; whether "New School Rhythmz" and "New School Rhythms" are one entity.
- [ ] **SWICE disclosure boundaries** — which technical detail may be published.
- [ ] **BCSA figures** — a per-item decision on each quarantined claim. Default is to omit.
- [ ] **Consent** for the seven retained photographs of identifiable people.
- [ ] Consider deleting old Vercel deployments and rewriting git history (see Privacy above).

---

## Deployment

Static hosting; publish the repository root.

- `netlify.toml` — security headers, cache headers matching the paths the pages actually request, and a 301 from
  `/report.html` to the archive.
- `vercel.json` — the same, with `cleanUrls` and `trailingSlash` enabled.

`report.html` also contains a meta-refresh redirect so the archive is reachable on hosts without redirect rules.

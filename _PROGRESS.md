# Berkeley Deck — Work In Progress

**Status (updated 2026-04-29):** ~98% complete. Section 01 restructured to side-by-side proof iframes; hero h1 now uses the official Berkeley SVG wordmark inline. Mobile check + final deploy remain. Last deployed commit: `c62dc76` (side-by-side iframes only — hero wordmark changes not yet pushed).

### Added 2026-04-29 (this session)

- **Section 01 — Proof restructure**: removed the two-tab UI (felt like the user got "stuck inside" the loaded tour). Replaced with a 2-column grid loading both tours concurrently — Woodberry left, SQP right. Each iframe lives in a `.proof-card` with a small navy header strip showing development name + unit, so the user always knows they're inside the deck. Mobile (≤860px) stacks vertically at 65vh each. Tab-switching JS removed entirely. Deployed as commit `c62dc76`.
- **Hero h1 — inline Berkeley wordmark**: replaced the text "for the Berkeley Group" with `for [Berkeley logo]`. Logo is the **official SVG** fetched from Berkeley's Sitecore CDN at `https://www.berkeleygroup.co.uk/-/media/feature/navigation/footer/strapline/berkeley-group-color.ashx` — saved locally as `brand_assets/Berkeley_Logos/optimized/berkeley-group-color.svg` and added to `.deploy-config.json`. Tried Cormorant Garamond serif italic first — rejected; serif fights Inter 800 at hero size and reads weaker not stronger. Vector logo solves both contrast and authentic Berkeley red treatment in one move.
- **CSS crop technique** for the wordmark: `background: url(svg) no-repeat right center / auto 100%` with explicit `width` smaller than the natural bg width = right-aligned crop that hides the leftmost portion (the crest). Avoids redundancy with the nav crest. Crop math: SVG viewBox 956.4×322.36; crest ends at x≈231, "Berkeley" begins at x≈296. Current crop at x≈243 lands cleanly in the gap. Width: `3.1em`, height: `1.4em`, vertical-align: `-0.42em`. **Pending visual verification by user in browser.**

### Added 2026-04-30

- **Section 02 — Standards (`#s-standards`)** — five "No" cards (no camera in reflections / no untidy nadirs / no doors-ajar / no awkward navigation / no entry-level hardware) framed positively as See3D minimum deliverable standards, NOT as a knock on Berkeley's existing tours. "NO" badges use the navy gradient with cyan text — quality stamp, not warning. Closing banner: *"Quality control is part of the deliverable, not an upsell."*
- **Worked example block** appended to `#s-commercial` after the dual cards. Counted **28 tours** from `BerkeleyLiveMatterport.png` (`discover.matterport.com/account/MHDViTe3Cen`). Stats grid: 28 / ~£500 / £3,700 / 3–5 yrs. Comparison table shows Year 1 / 3yr / 5yr cumulative hosting deltas with red↔green visual contrast. Source link to the Matterport portal included for verification. Disclaimer explicitly acknowledges Berkeley operates across multiple divisions and external partners — these tours may not pertain to the recipient's division — to avoid any presumption.
- Eyebrow renumbering: Commercial 02→03, Integration 03→04
- Nav: "Standards" link inserted between "The Proof" and "Commercial"

## Done so far

- [x] Scaffolded + seeded from Denaploy deck
- [x] Berkeley logos copied into `brand_assets/Berkeley_Logos/`
- [x] **Visual identity — See3D brand alignment:** root palette, Inter typography, blue canvas particles, navy gradients
- [x] **Berkeley logos:** using `optimized/berkeley-grey-400.png` throughout (tight crop, transparent bg, works with `filter:brightness(0)invert(1)`)
- [x] `<title>` + `<meta name="description">` rewritten for Berkeley pitch
- [x] **Cover (s01) — KEPT AS-IS:** headline *"Cost-certain virtual tours for the Berkeley Group"*, badge "Already delivered: South Quay Plaza · Woodberry Down", canvas particle animation

### Major rebuild — 2026-04-29

Complete restructure from ~12-section bloated deck to a focused 4-section pitch:

- [x] **Nav** — 4 links: The Proof / Commercial / Integration / Next Steps. Height 64px. See3D logo 26px, Berkeley logo 40px.
- [x] **Section 1 — THE PROOF (`#s-proof`):** Two-tab UI loading full See3D landing pages as iframes.
  - Tab 1: `southquayplaza.see3d.ai` — loads immediately
  - Tab 2: `woodberrydown.see3d.ai` — lazy-loaded on first tab click
  - Iframes are 86vh. Minimal text: "Already delivered. Inside the Berkeley portfolio."
- [x] **Section 2 — THE COMMERCIAL ADVANTAGE (`#s-commercial`):** Side-by-side cards.
  - Dark card (See3D): Pay once, £0 hosting, CapEx, no lock-in
  - Light card (the alternative): subscription trap, £3,700+/year, OpEx, tours go dark if cancelled
  - Matterport **never named** directly
- [x] **Section 3 — THE SEAMLESS INTEGRATION (`#s-integration`):** Three cards: Embed anywhere / Closing tool for remote buyers / Permanent. Zero maintenance. Banner: "Built to complement your existing digital sales ecosystem — not replace it." **Millerhare never named.**
- [x] **Next Steps (`#s12`):** Three punchy cards: Pick a pilot / Book the scan / Formalise supply chain. Contact block.
- [x] **Footer** — Berkeley logo + "See3D × Berkeley Group — Proposal April 2026 · Confidential"
- [x] **Pricing section removed** — not needed for this pitch format; can be discussed verbally

## TO DO — remaining before ship

### 1. Polish

- [ ] Mobile test pass at 390px — nav, proof tabs, commercial cards, integration cards
- [ ] Quick end-to-end browser read — check for any stray Denaploy / Millerhare / O&M language
- [ ] Confirm both tour iframes load (southquayplaza.see3d.ai + woodberrydown.see3d.ai)

### 2. Ship

- [ ] `node deploy.mjs` — config points at `https://github.com/OllieHardy91/Berkeley-Proposal.git` → Vercel auto-deploys

---

## Berkeley brief — key directives

(From `Berkeley_Gemini.md.docx`. Re-read before any major copy decision.)

**Decision-maker:** Sales Director **Christian Barr** + procurement team.

**Three questions the deck must answer:**

1. **Is this on-brand?** Luxury polish, Inter typography, sophisticated navy/blue palette.
2. **Is this proven?** Lead with SQP penthouse 53.01 + Woodberry Down riverside.
3. **Is this easy to procure?** PQQ-ready, standard supplier terms, 30 mins on a call.

**Tone:** *Placemaking · Interactive Presentation · Overseas Enablement · Long-term Value*. Avoid: O&M, Golden Thread, BSA, FM, dilapidations, Millerhare (by name).

**Commercial framing:** CapEx not OpEx. No monthly hosting. Complement (not replace) existing CGI + interactive suites.

**Reference materials:**

- `Berkeley_Gemini.md.docx` — the brief
- `brand_assets/Berkeley_Logos/optimized/` — use `berkeley-grey-400.png`
- `../_proposal-template/CLAUDE.md` — 6 hard See3D positioning rules
- `../_shared/REFERENCE.md` — cross-project ledger

## Quick start

```bash
cd "C:\Users\ollie\OneDrive\Documents\360 Virtual Tour Business\00.Claude Code - Berkeley Deck"
node serve.mjs              # http://localhost:3000
```

When ready to ship:

```bash
node deploy.mjs             # → github.com/OllieHardy91/Berkeley-Proposal → Vercel
```

# CLAUDE.md — Berkeley proposal deck

## Always Do First
- **Read `_PROGRESS.md`** in this folder — it has the current work-in-progress state, what's done, what's still to do, and the Berkeley brief summary.
- Invoke the `frontend-design` skill before writing any frontend code.
- Read `../_proposal-template/CLAUDE.md` for the canonical See3D positioning rules and anti-generic guardrails.
- Skim `../_shared/REFERENCE.md` for context from past client decks (positioning quirks, lessons, what worked).
- The full Berkeley brief is in `Berkeley_Gemini.md.docx` — re-read it before any major copy decision.

## This deck
- Single `index.html` file, all styles inline (Tailwind via CDN).
- Served locally at http://localhost:3000 via `node serve.mjs`.
- Deployed via `node deploy.mjs` (reads `.deploy-config.json` → pushes to https://github.com/OllieHardy91/Berkeley-Proposal.git → Vercel auto-deploys).

## Brand
- Client: Berkeley
- See3D's See3D_Vector.png is in `brand_assets/`. Add Berkeley's logo and any client-specific assets to the same folder, then list them in `.deploy-config.json` under `"assets"`.

## Hard rules carried from template
The 6 See3D positioning rules in `../_proposal-template/CLAUDE.md` apply here too unless this deck explicitly overrides one. Common ones to remember:
- Hosting is FREE — never a recurring fee.
- Self-host route always offered as first-class option.
- No uptime SLA committed in writing.
- Pricing is INDICATIVE — wrap numbers in "guideline, not a quote" framing.
- Data ownership belongs to the client.
- Hardware/platform: Realsee Galois M2 + 3DVista Pro (134 MP, ±20mm at 10m).

## When complete, append a learnings entry to `../_shared/REFERENCE.md`.

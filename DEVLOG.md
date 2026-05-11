# DEVLOG

## Day 1 — 2026-05-03

Hours worked: 6
What I did: Project scaffolding, Next.js App Router setup, Tailwind config, basic layout and hero.
What I learned: App Router conventions in Next 15; server/client boundaries are simple for this MVP.
Blockers: None significant.
Plan for tomorrow: Build audit engine and pricing constants; start spend form.

## Day 2 — 2026-05-04

Hours worked: 7
What I did: Implemented audit engine and deterministic rules; created pricing constants and PRICING_DATA.md
What I learned: Pricing normalization needed for per-seat vs flat.
Blockers: Pricing sources vary in format; documented choices.
Plan for tomorrow: Implement report page and persistence.

## Day 3 — 2026-05-05

Hours worked: 6
What I did: Built spend form with React Hook Form + Zod, localStorage persistence, navigation to report.
What I learned: Keep client payload small (base64) for quick share URLs.
Blockers: UI polish pending.
Plan for tomorrow: Results page and Anthropic integration.

## Day 4 — 2026-05-06

Hours worked: 5
What I did: Results page and per-tool breakdown; add lead capture schema + Supabase SQL.
What I learned: Need to secure Supabase service key for writes.
Blockers: Email integration to finish.
Plan for tomorrow: Add Anthropic summary API route and Resend email template.

## Day 5 — 2026-05-07

Hours worked: 7
What I did: Wrote PROMPTS.md, tests for audit engine, CI workflow.
What I learned: Tests help lock down financial rules.
Blockers: None.
Plan for tomorrow: Docs and final polish.

## Day 6 — 2026-05-08

Hours worked: 4
What I did: Added README, ARCHITECTURE, other docs, and environment examples.
What I learned: Documentation is key for hiring review.
Blockers: Visual design refinement remains.
Plan for tomorrow: Final checks, accessibility summary, and prepare deliverables.

## Day 7 — 2026-05-09

Hours worked: 5
What I did: Final touches, test run, updated PRICING_DATA and PROMPTS, CI validation.
What I learned: Combined deterministic engine + LLM summary gives a reliable product.
Blockers: None.
Plan for tomorrow: Handoff and deployment notes.

# AI Spend Audit

AI Spend Audit helps startups audit AI tool spending and find savings — think "Mint for AI tool spend".

## Screenshots

- hero.png (placeholder)
- report.png (placeholder)

## Quick start

1. Copy `.env.example` to `.env` and set keys (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY, ANTHROPIC_API_KEY, RESEND_API_KEY).
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`

## Deployment

- Deploy to Vercel. Provide environment variables in project settings.

## Project summary

- Next.js 15 App Router, TypeScript, Tailwind, shadcn/ui, Supabase, Resend, Anthropic API, Zod, React Hook Form, Framer Motion.

## Architecture overview

See ARCHITECTURE.md

## Technical tradeoffs

- Deterministic audit engine (no LLM) ensures reproducible, testable recommendations.
- Anthropic only used for human-readable summary — not for core logic.
- Supabase used for simple lead storage; avoids self-hosted DB complexity.
- Client-side encoded report payload keeps initial MVP stateless.
- Server-side signing and email sending via Resend uses service keys — requires secure env.

## Deployed URL

- https://ai-spend-audit.example.com (placeholder)

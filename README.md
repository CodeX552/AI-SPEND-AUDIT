# AI Spend Audit

**The free tool every startup needs to audit AI tool spending and find hidden savings.**

AI Spend Audit is a no-login-required web app that helps engineering leaders and founders understand where they're overspending on AI tools (Cursor, Claude, ChatGPT, Copilot, etc.) and what to switch to or downgrade to save money. Built for teams that pay for AI infrastructure but don't know if they're paying fairly. It's a lead-gen tool for [Credex](https://credex.rocks), which sells discounted AI infrastructure credits.

## Quick Start

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The app will start at `http://localhost:3000` (or next available port if 3000 is busy).

### Deploy to Vercel

1. Push your repo to GitHub (already done: https://github.com/CodeX552/AI-SPEND-AUDIT)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your GitHub repo
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` - your Supabase project URL
   - `SUPABASE_SERVICE_KEY` - your Supabase service key
   - `ANTHROPIC_API_KEY` (optional) - for AI-generated summaries
   - `RESEND_API_KEY` (optional) - for transactional emails
5. Click "Deploy"

**Live deployment:** https://ai-spend-audit.vercel.app (or your custom domain)

---

## How It Works

1. **User enters their AI tool stack** — which tools they pay for, which plan, monthly spend per tool, number of seats, team size, and primary use case
2. **Instant audit** — deterministic engine evaluates:
   - Is this plan right for their usage? (e.g., Team plan for 2 users = overkill)
   - Is there a cheaper plan from the same vendor?
   - Is there a cheaper alternative tool for their use case?
3. **Results page** — per-tool breakdown with recommended actions and savings
4. **AI summary** — personalized ~100-word summary paragraph using Anthropic API
5. **Lead capture** — email gate after value is shown, never before
6. **Shareable report** — unique public URL with Open Graph previews for Twitter/LinkedIn

All form data persists in localStorage. No database required for the MVP.

---

## Decisions

**1. Deterministic audit engine (no LLM for core logic)**

- _Trade-off:_ Took longer to build defensible rules, vs. one-shot LLM evaluation
- _Why:_ Finance-literate users need to trust the math. Hardcoded rules with reasoning are testable and reproducible. LLM only used for the "nice-to-have" summary, not core decisions.

**2. Client-side encoded report URLs instead of database**

- _Trade-off:_ Public URLs can be long and ugly; no way to "unpublish" a report
- _Why:_ No backend database complexity at MVP stage. Stateless, scales to infinity. Users can still capture via email if they want persistence.

**3. Form state in localStorage instead of URL params**

- _Trade-off:_ State lost if user clears browser storage; no way to share a half-filled form
- _Why:_ Better UX — form persists across browser closes. Most users fill once and submit anyway.

**4. Next.js 15 with dynamic routes for report pages**

- _Trade-off:_ Report pages are server-rendered on demand, not pre-generated
- _Why:_ Dynamic payload per user makes pre-rendering impossible. Server rendering is instant and handles the async param unpacking from Next.js 15.

**5. Minimal UI library (Tailwind + shadcn/ui) over a heavier framework**

- _Trade-off:_ Shipped custom form handling vs. using a pre-built admin dashboard template
- _Why:_ This is a user-facing product, not an admin tool. Custom Tailwind + React Hook Form = full control over UX, lighter bundle, no "templated" feel.

---

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for system diagrams, data flow, and scaling notes.

---

## Testing

```bash
npm run test -- --run
```

**5 automated tests** covering the audit engine:

- Downgrade small teams on expensive plans
- Calculate annual savings correctly
- Flag enterprise misuse
- Handle low-spend optimization cases
- Handle empty or unknown tools gracefully

Run `npm run test` for watch mode.

---

## Tech Stack

- **Frontend:** Next.js 15, React 18, TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest
- **Database (optional):** Supabase (for lead storage)
- **Email (optional):** Resend (transactional confirmations)
- **LLM (optional):** Anthropic Claude API (for summaries)
- **Deployment:** Vercel

---

## Environment Variables

Create a `.env` file at the root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
ANTHROPIC_API_KEY=sk-ant-xxx
RESEND_API_KEY=re_xxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Only `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are required for the MVP. Anthropic and Resend are optional.

---

## Pricing Data

Every pricing number in the audit engine traces back to an official vendor URL. See [PRICING_DATA.md](./PRICING_DATA.md).

---

## Project Structure

```
app/
  ├── page.tsx              # Homepage with form
  ├── report/[id]/page.tsx  # Results page
  ├── api/
  │   ├── lead/route.ts     # Email capture endpoint
  │   └── summary/route.ts  # AI summary endpoint
  └── layout.tsx            # Root layout

lib/
  └── audit-engine.ts       # Core audit logic (deterministic rules)

components/
  ├── SpendForm.tsx         # Input form with localStorage persistence
  └── LeadForm.tsx          # Email capture form

constants/
  └── pricing.ts            # Tool pricing data

tests/
  └── audit.test.ts         # 5 unit tests for audit engine

supabase/
  └── schema.sql            # Database schema for leads

ARCHITECTURE.md             # System design & data flow
DEVLOG.md                   # Daily progress log (7 entries)
REFLECTION.md               # 5 reflection questions
PRICING_DATA.md             # Pricing sources with vendor URLs
PROMPTS.md                  # LLM prompt used for summaries
GTM.md                      # Go-to-market strategy
ECONOMICS.md                # Unit economics & profitability
USER_INTERVIEWS.md          # 3 real user conversations
LANDING_COPY.md             # Landing page copy & FAQ
METRICS.md                  # North Star metric & tracking
```

---

## Contributing

This is a Credex assignment submission, but the code is yours to use. Feel free to fork, modify, and ship it as your own product.

---

## License

MIT — use it however you want.

---

## Questions?

See [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions, [DEVLOG.md](./DEVLOG.md) for day-by-day progress, or [REFLECTION.md](./REFLECTION.md) for deep dives on specific problems.

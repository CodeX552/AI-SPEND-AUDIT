# Reflection

1. Hardest bug

- Tuning deterministic rules to avoid over-aggressive recommendations. It required balancing realistic vendor pricing and seat counts. I resolved by adding sanity caps and conservative multipliers.

2. Reversed decision

- Initially planned to store full reports server-side. I reversed to client-encoded URLs for faster privacy-first sharing and simpler infra.

3. Week 2 improvements

- Add PDF export and embed widget, add usage pull from billing APIs (when permitted), add signup flow and audit scheduling.

4. AI usage honesty

- I used Anthropic only for a short human-readable summary. Core logic, pricing and decisions are deterministic and tested.

5. Self ratings

- Code quality: 8/10
- Product polish: 7/10
- Tests & reliability: 8/10
- UX: 7/10

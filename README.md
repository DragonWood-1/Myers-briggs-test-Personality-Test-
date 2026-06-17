# PersonalityTypeCheck.com — Myers-Briggs & Personality Test Platform

A free, mobile-first, statically-generated personality platform built with **Next.js (App Router)** and **TypeScript**. Everything is generated from structured data, so the site scales to hundreds of SEO pages with no per-page maintenance.

## What's included

| Area | Pages | Source |
| --- | --- | --- |
| Core tests | `/myers-briggs-test`, `/free-personality-test`, `/personality-type-test`, `/career-personality-test`, `/relationship-personality-test`, `/cognitive-functions-test` | interactive quiz |
| 16 type profiles | `/intj-personality`, `/infj-personality`, … | `data/types.ts` |
| Career guides | `/careers/best-careers-for-intj`, `/careers/best-remote-jobs-for-istp`, … (5 variants × 16 types = 80) | `data/careers.ts` |
| Compatibility | `/compatibility/intj-and-enfp`, … (16 × 16 = 256) | `data/compatibility.ts` |
| Assessments | IQ, EQ, DISC, Enneagram, Big Five, Love Languages, Leadership, Entrepreneur, Learning, Work Style | `data/assessments.ts` |
| Explainers | `/introvert-vs-extrovert`, `/personality-types-explained`, `/personality-types` | static |

**377 pages** are pre-rendered at build time.

## The test

The MBTI quiz (`data/questions.ts` + `components/Quiz.tsx`) scores 32 questions across the four dichotomies entirely **client-side**. No answers are sent to a server; results live only in the browser.

## Mobile compatibility

- Responsive, mobile-first CSS with fluid `clamp()` typography and breakpoints at 900/860/760/600px.
- Collapsible hamburger navigation on small screens.
- `viewport` meta + accessible tap targets and `role="radiogroup"` quiz controls.

## Security

- **Strict security headers** in `next.config.mjs`: Content-Security-Policy (no third-party scripts), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, and HSTS.
- `poweredByHeader` disabled.
- No user data collected or stored server-side — the app is fully static, eliminating server-side injection/database attack surface.
- No `dangerouslySetInnerHTML`; all rendered content comes from trusted in-repo data.
- Dependencies kept on a patched Next.js major version.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (prerenders all pages)
npm run typecheck  # tsc --noEmit
```

## Deploy

Optimised for **Vercel** (zero-config Next.js). Push to the connected repo or run `vercel`.

## Extending

- Add/adjust type content in `data/types.ts`.
- Add career guide variants in `CAREER_VARIANTS` (`data/careers.ts`) — each new variant adds 16 pages automatically.
- The compatibility model lives in `data/compatibility.ts` and covers all 256 pairings deterministically.

> For self-discovery and education only — not a clinical or diagnostic instrument.

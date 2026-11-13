# swosti-nayak

Personal portfolio — a macOS-style desktop where project cards expand into full case studies.

**Live:** https://swosti-nayak.vercel.app

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · CSS Modules + Tailwind v4 ·
[motion](https://motion.dev) for animation · Resend for the feedback form · deployed on Vercel.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

The site runs without any environment variables. These enable optional features:

| Variable | Used by | If unset |
| --- | --- | --- |
| `RESEND_API_KEY` | Feedback form email (`src/app/api/feedback/route.ts`) | Feedback submissions fail |
| `FEEDBACK_TO_EMAIL` | Feedback form recipient | Falls back to a hardcoded address |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (`src/app/layout.tsx`) | Analytics is skipped |

The values live in the Vercel project, scoped to Production (the default `vercel env pull` targets Development, which has none). To pull them into `.env.local`:

```bash
vercel env pull --environment=production
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Generates the code database, then starts the dev server |
| `npm run build` | Generates the code database, then builds for production |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint (currently reports pre-existing issues — see `AGENTS.md`) |

`scripts/buildCodeDB.mjs` runs before `dev` and `build`. It serialises `src/` into
`src/data/codeDB.json` so the site can show its own source in the in-page code panel.
That file is generated and gitignored.

`scripts/compressImages.mjs` is a manual utility that converts images in `public/`
larger than 100KB to WebP.

## Layout

See [`AGENTS.md`](AGENTS.md) for a full map of the codebase and its conventions.

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

The feedback form needs a Resend API key. Without it the rest of the site runs fine:

```bash
# .env.local
RESEND_API_KEY=your_key_here
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

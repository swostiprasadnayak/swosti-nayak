<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repo map

Portfolio site for Swosti Nayak. Next.js 16 (App Router, Turbopack), React 19, TypeScript,
CSS Modules + Tailwind v4. Deployed on Vercel at https://swosti-nayak.vercel.app.

**Read this file before exploring.** The tree below is the whole app — if something is not
listed here, it does not exist. Skip the directory-walking.

## Concept

The homepage is a macOS-style desktop: a wallpaper, a dock, a control-centre panel, and a
stack of project cards you expand into full case studies. That framing explains most of the
odd-looking component names (`trafficLights`, `dockMagnification`, `brightnessSlider`).

## Layout

```
src/app/
  page.tsx            Homepage. Owns wallpaper + card-stack state. Start here.
  layout.tsx          Root layout, fonts, analytics, context providers
  posts/page.tsx      /posts route
  api/feedback/       POST route — sends feedback email via Resend
  contexts/           5 React contexts: Theme, Viewport, AboutModal, FeedbackModal, VoiceModal
  hooks/              useIsMobile, useMusicPlayer, useVideoPlayback, useWindowMode
  types/              cards.types.ts, projects.types.ts  ← project metadata lives here

src/components/
  homePage/
    cardStackContainer/   The card stack + filtering. Second place to look.
    expandedProject/      Card → full-screen case study transition
    projectControls/      Dock-adjacent UI: filters, view toggle, theme toggle,
                          control panel (brightness, music), code-reveal panel
  caseStudy/
    template/             One template per case study — Unicef, Blinkit, GCDental, InsureTech
    insure-tech/          Interactive InsureTech pieces (tree, design system, builder)
    blocks/               Shared case-study building blocks
  dock/ desktopSidebar/ mobile/     Navigation shells (desktop dock, sidebar, mobile nav)
  aboutModal/ feedbackModal/ feedbackPopup/ voiceModal/ welcomeOverlay/    Overlays
  card/ screenshot/ gradientBlur/ ui/ posts/                               Primitives

scripts/
  buildCodeDB.mjs     Runs before dev+build. Serialises all of src/ into
                      src/data/codeDB.json for the in-site code-reveal panel.
                      Generated + gitignored — never edit or commit it.
  compressImages.mjs  Manual: converts public/ images >100KB to WebP.
```

## Conventions

- Styling is **CSS Modules** (`foo.module.css` next to `foo.tsx`). Global tokens and
  theme variables live in `src/app/globals.css` — use the CSS custom properties
  (`--bg-card`, `--text-primary`, `--border-subtle`) rather than hardcoding colours.
- Animation is **motion** (`motion/react`), not framer-motion's old package name.
- Images go through `next/image` pointing at the **original** `.png`/`.jpg` in `public/`.
  Next generates AVIF/WebP at request time, so do **not** hand-generate `.webp` siblings
  and reference them — that was cleaned out, don't reintroduce it.
- Adding a project: add its entry to `src/app/types/projects.types.ts`, then add a
  template under `src/components/caseStudy/template/`.

## Gotchas

- `public/*.html` (`roz-system-architecture.html`, `more-system-map.html`,
  `prototypes/*.html`) are **standalone pages opened by direct URL**, not imported by any
  component. They look unreferenced to a grep. Do not delete them.
- `npm run lint` currently reports ~300 pre-existing errors/warnings (mostly
  `no-explicit-any` and `react-hooks/set-state-in-effect`). The build does not gate on
  them. Don't treat a non-empty lint run as a regression you caused — compare first.
- `public/` is the heavy part of the repo (~31 MB of video/audio/screenshots). Avoid
  listing it wholesale; target the subdirectory you need.

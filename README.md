# Sarosh Kumar — Portfolio

Personal portfolio site for Sarosh Kumar, a software engineer focused on AI systems, backend engineering, and full-stack development. Built with Next.js (App Router) and heavily animated with GSAP ScrollTrigger, Lenis smooth-scroll, and Framer Motion.

**Live site:** https://portfolio-rd5en3i80-saroshkumar00-4678s-projects.vercel.app

## Tech stack

- **Framework:** Next.js 16 (App Router) + TypeScript (strict) + React 19
- **Styling:** Tailwind CSS v4 (CSS-first theme via `@theme inline` in `app/globals.css`)
- **Animation:** GSAP + ScrollTrigger, Lenis (smooth scroll), Framer Motion, `motion`, `ogl`
- **Fonts:** self-hosted via `next/font/google` (Archivo, Instrument Serif, Roboto Flex, Anton, Kanit, JetBrains Mono) — see `lib/fonts.ts`

## Sections & notable features

- **Hero (`PinnedHero` / `Hero`)** — pinned via GSAP `ScrollTrigger` (not CSS `position: sticky`, to avoid transform glitches) while an animated frame sequence scrubs in the background; a landing toggle switches the background between the scroll-scrubbed frame sequence and a looping video.
- **`LensReveal`** — chromatic-aberration cursor-reveal effect over the hero headline.
- **`Playbook`** — scroll-pinned "Approach" section with its own scroll-scrubbed frame-sequence background and a looping tech-stack logo marquee (`LogoLoop`).
- **`Projects`** — a draggable/wheel/keyboard-navigable carousel of project cards; clicking a card opens a terminal-style detail modal (`components/ui/terminal.tsx`) that types out real project info sourced from `components/projectDetails.ts`.
- **`Gallery`** — an orbiting image gallery (`OrbitImages`) with a lightbox.
- **`Contact`** — closing section with real contact/social links.
- **`GrainOverlay`** — a subtle full-page film-grain layer.
- **`ScrollProvider`** — wires up Lenis smooth-scroll and registers GSAP's `ScrollTrigger` plugin globally.

Scroll-scrubbed backgrounds are driven by JPEG frame sequences (extracted from source video) rendered onto a canvas as the user scrolls, rather than a playing `<video>`, which keeps them frame-accurate and scrub-able with GSAP.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build` (production build), `npm run start` (serve the production build), `npm run lint` (ESLint).

## Deployment

Deployed on [Vercel](https://vercel.com). Pushing to the production branch triggers a new deployment automatically. Site-wide metadata (canonical URL, name, title, description used by `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts`) is centralized in `lib/site.ts` — update `SITE_URL` there if the project moves to a custom or stable domain.

> **Note:** the `public/` directory contains large frame-sequence image folders (`Landing/`, `approach/`, `About/`) used for the scroll-scrubbed backgrounds, totaling roughly 130MB. This is expected and fine for Vercel's static asset handling, but worth knowing if you're cloning the repo.

## Project structure

```
app/            App Router pages, layout, metadata, robots/sitemap/icon
components/     Section components (Hero, Nav, Playbook, Projects, Gallery, Contact, ...)
components/ui/  Reusable/ported UI primitives (terminal, logo loop, orbit images, ...)
lib/            Fonts, site metadata constants, utilities
public/         Static assets (images, frame sequences, video)
```

# AGENTS.md — Handbook for AI agents working on wahyuteguh.com

Read this file first. It exists so that any agent (Claude, opencode,
Codex, Gemini, etc.) can jump in safely, regardless of the model reading
it. The `docs/` folder holds the details — check the [Docs index](#docs-index)
below.

## What this is

Personal website for **Wahyu Teguh** (why.teguh@gmail.com / @why_teguh).
A fully static [Astro 5](https://astro.build) site deployed on **Vercel**.
Blog posts and resources are plain markdown; interactive resources are
self-contained single-file HTML apps. Frontend language is English; blog and
resource bodies are usually written in **Bahasa Indonesia** (match whatever
file you are editing).

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | `astro build` → static output to `dist/` |
| `npm run preview` | Preview the production build |
| `npx astro build` | Same as build; run this to verify your work |

**Always run `npx astro build` before saying a change is done.** It must
succeed. If your change adds a page/resource, confirm the generated route
appears in `dist/`.

## Repo map

```
src/
  content/            # blog + resources (markdown). The actual content.
  content.config.ts   # frontmatter schemas (blog, resources). THE schema.
  layouts/
    Base.astro        # main site shell (nav-free, theme + freeze effects)
    AppShell.astro    # full-screen shell for webapp resources (footer only)
  lib/
    site.ts           # socials, typeLabel, fmtMonth
    youtube.ts        # build-time latest-videos fetch (RSS + fallback)
  pages/              # Astro routes: index, blog, resources, link, 404, suratlangit
  styles/global.css   # dot-paper design tokens + all shared CSS. THE tokens.
public/
  apps/<slug>/index.html  # each webapp resource (self-contained single file)
  downloads/               # ebook/landing downloadable files
  images/                  # photos (photo.jpg, wahyu-wizard.jpg)
  favicon.png, freeze.mp4, robots.txt
supabase/functions/submit-message/  # Surat Langit only
vercel.json  # security headers + Surat Langit CSP
```

Scratch space (gitignored, never edit): `assets-src/`, `references/`,
`supabase/.temp/`, `.astro/`.

## Content model

### Blog post — `src/content/blog/<slug>.md`

```md
---
title: "Post title"
description: "One-line summary shown on cards."
date: 2026-07-03
tags: ["tag1"]
draft: false        # true = hidden everywhere
---
Body…
```

Filename becomes the URL slug (`my-post.md` → `/blog/my-post/`). Posts and
resources are usually **pairs**: write the resource app, then publish a blog
post linking to it (see oldest blog posts for the pattern).

### Resource — `src/content/resources/<slug>.md`

Two types (see `src/content.config.ts`):

- **`type: webapp`** — an interactive app at `public/apps/<slug>/index.html`,
  rendered full-screen in `AppShell.astro` (iframe, no page chrome). Fields:
  `title, description, type: webapp, icon <emoji>, appUrl: "/apps/<slug>/index.html", date`.
- **`type: landing`** — an ebook/template download page. Fields:
  `type: landing, downloadUrl, downloadLabel`. File lives in `public/downloads/`.

## Non-negotiable rules (breaking these = design drift)

1. **Never invent new colors, fonts, spacing, or radii.** Every token lives in
   `src/styles/global.css` `:root` (and the `data-mode` overrides). Webapp
   resources carry their own copy of the same palette in a `<style>` block —
   copy verbatim from `docs/design-system.md` / the `webapp-resource` skill.
2. **No new npm dependencies.** The site is intentionally tiny. CDN scripts
   already used by webapps: Tailwind, React + ReactDOM, Babel standalone
   (via `cdn.tailwindcss.com` / `unpkg.com`). Fonts come from Google Fonts
   (`Courier Prime`, `Caveat`, `Dancing Script`).
3. **Webapps must not duplicate chrome.** `AppShell.astro` already renders the
   `← wahyuteguh | all resources` footer and the theme toggle. No header nav,
   no back link, no theme button inside the app itself.
4. **Privacy by default.** Non-Surat-Langit webapps persist to **localStorage
   only** — no backend, no analytics, no trackers. Say so in the resource
   markdown: "Saved in your browser only — nothing is sent anywhere."
5. **`dist/` is committed.** The repo tracks the build output (see commit
   "Sync dist with published content"). After finishing a change that alters
   site output, rebuild and commit the `dist/` sync if that's the repo's
   current convention.
6. **Don't touch scratch folders** (`assets-src/`, `references/`) — they hold
   raw sources (e.g. `screen freeze.mp4`) that must NOT enter the repo.

## Gotchas

- **YouTube fetch is flaky on purpose.** `src/lib/youtube.ts` is called at
  build time; YouTube RSS answers 500/404 from Vercel cloud IPs, so it retries
  4× and falls back to scraping the channel page. Both branches are intended —
  do not "simplify" this into a single fetch.
- **Surat Langit is special.** `public/apps/suratlangit/` talks to Supabase
  (`submit-message` edge function) and Cloudflare Turnstile, and its own CSP
  is hardcoded in `vercel.json` (that's why it has `connect-src`/`frame-src`
  exceptions). Don't generalize its tokens or data-fetching into other apps.
- **Theme mode keys:** the site has four modes — `paper`, `dark`, `ice`,
  `ice-night`, stored in `localStorage.wt-mode`. Webapps sync via
  `document.documentElement.classList.toggle('dark', m === 'dark' || m === 'ice-night')`.
  The `ice*` worlds belong to the main site, not to webapps.
- **`src/pages/suratlangit/index.astro`** is a thin iframe wrapper that lets
  the Surat Langit app also live on its own path/subdomain.

## Definition of done

1. `npx astro build` succeeds.
2. Design only uses tokens/patterns from `docs/design-system.md`.
3. No new dependency, no new color/font, no duplicated chrome.
4. Resource frontmatter matches `src/content.config.ts`.
5. New/changed route verified in `dist/`.
6. Logged under "What changed" in `docs/backlog.md`.

## Docs index

- `docs/architecture.md` — how the site is built and deployed.
- `docs/design-system.md` — the dot-paper design system, tokens, vocabulary.
- `docs/backlog.md` — change log + backlog. **Append here after real work.**
- `.claude/skills/webapp-resource/SKILL.md` — step-by-step for building or
  re-skinning a webapp resource.
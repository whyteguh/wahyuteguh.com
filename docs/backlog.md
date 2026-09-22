# Backlog & change log

Two jobs in one file: **what should be done next** (backlog) and **what has
been done** (change log). Keeping this current is what makes switching
models/providers safe — the next agent reads recent entries to know where the
project stands.

## How to log work

After any real change, append a **one-line entry** to the change log:

```md
- `2026-09-14` — What changed and why. Reference the route/files touched: `src/…`.
```

Backlog ideas live in [Backlog](#backlog). When you start one, move the item's
status to `in progress`; when done, cut it from Backlog and add a log line.

## Change log

(Reverse chronological; `hash` = git commit for reference.)

### 2026-09-22
- Add Speaking Tempo webapp resource (Web Audio metronome 30–260 BPM with a
  JS-driven smooth pendulum, 2/4–6/8 time signatures, tap tempo, three sound
  timbres) plus a teleprompter with 60–320 wpm speed control and fullscreen —
  `public/apps/speaking-tempo/index.html`,
  `src/content/resources/speaking-tempo.md`.
- Add paired blog post "Dulu Aku Ngomong Kenceng Banget. Ternyata Itu Bukan
  Tanda Pinter."; CTA links to `/resources/speaking-tempo/` —
  `src/content/blog/dulu-aku-ngomong-kenceng-banget.md`.

### 2026-09-18
- Add Speed Reader webapp resource + paired blog post "Kenapa Nampilin Satu
  Kata Doang Bisa Bikin Kamu Baca Lebih Cepat"; post CTA links to
  `/resources/speed-reader/` — `public/apps/speed-reader/index.html`,
  `src/content/{blog,resources}/…`.
- Add Ikigai webapp resource + paired blog post "Diagram Ikigai yang Sering
  Kamu Liat Itu Bukan Buatan Jepang"; post CTA links to `/resources/ikigai/`
  — `public/apps/ikigai/index.html`, `src/content/{blog,resources}/…`.

### 2026-08-29
- Widen page layout, remove emoticons from section labels (`6ca6ddb`).

### 2026-08-11
- Add Odyssey Plan JSON download; fall back to channel page when YouTube RSS
  bot-blocks builds — `src/lib/youtube.ts` (`514c96a`).
- Retry YouTube RSS (4×) that 500s on bursts (`97e7248`).
- Add falling snow to ice themes; publish 5 new blog posts (`9c8b720`).
- Publish tsundoku / wheel-of-life / narrative identity blog posts, each
  linking to its resource (`89b3e51`, `f5700c7`, `c4d9a5b`).
- Remove unused working files: FLOW, suratlangit, old freeze video, refs
  (`c9b7734`) — `references/` and `assets-src/` are now gitignored scratch.
- Add security headers + SEO meta; clean repo of build caches; stay with
  sitemap/RSS/robots from `33853cd` (`c363c43`).
- Swap freeze-effect video to the new screen-freeze clip; fix Surat Langit
  button starry-night background (`70e8e23`, `07adc43`).

### 2026-08-10
- Sync `dist/` with published content and resource apps (`8d66e24`).
- Publish Muslim productivity + Flowmodoro blog posts linking to their
  resources (`ec674c6`, `c79766c`).
- Improve Harada Method master-grid interactions; add the resource
  (`54c5240`, `ca3914b`).
- Add Habitat and Surat Langit webapp resources (`5140b45`).
- **Surat Langit launch**: standalone app + route + subdomain routing +
  Supabase Edge Function `submit-message` + Cloudflare Turnstile + restrictive
  insert policies + its own CSP in `vercel.json` (`76dd671` → `d7d8e59`, ~16
  commits).

### 2026-07-16
- Add Wheel of Life and Priority Workspace resources (`bf41328`).

### 2026-07-15
- Add sitemap, RSS feed, robots.txt (`33853cd`).

### 2026-07-13
- Add `webapp-resource` skill for design-consistent resource apps
  (`0161964`).
- Add Tsundoku Tamer resource, redesigned to match the dot-paper theme
  (`140ce44`).
- Full-screen app shell for webapp resources (`e2b3d5d`).

### 2026-07-11
- Mark existing blog posts as draft and add draft support to resources
  (`ad377a1`, `f3ceffb`).

### 2026-07-10
- Add ice-wizard theme with video-driven freeze effect (`66548ae`).

### 2026-07-03 → 2026-07-09
- Initial site: dot-paper design, link bio page, Moslem Productivity Rhythm,
  Flowmodoro (`c684983`, `a4cdfd8`, `9fa6b0d`, `c82b430`).

## Live inventory

**Blog** (17): Dulu Aku Ngomong Kenceng Banget, Mencari Petunjuk, Ohtani,
Eisenhower, Habit Bolong Sehari, Hidup Kamu Punya Pola, Ikigai (bukan Venn
diagram), Kariernya Lancar, Kenalan Sama Flowmodoro, Muslim sudah disetting…,
Odyssey Plan, RSVP (satu kata), Semuanya Kelihatan Penting, Tsundoku,
tools-i-use, hello-world, shipping-small.

**Resources** (14) — note the pairing pattern blog ⇄ resource:
- webapp: habitat, surat-langit, history-of-my-life, moslem-productivity-rhythm,
  odyssey-plan, pomodoro-timer, priority-workspace, tsundoku-tamer, wheel-of-life,
  harada-method, ikigai, speed-reader, speaking-tempo
- landing (ebook): shipping-checklist-ebook (dir is `downloads/`)

## Backlog

### Ideas / content
- **Project A.C.E** — gamified productivity framework; homepage already has a
  "coming soon…" placeholder card.
- V-CRM / Synergish.dev / CRM-CDP landing-card blurbs are hardcoded in
  `src/pages/index.astro` — could become a content collection if they gain
  pages.
- Blog post left unpaired: `shipping-small`, `tools-i-use`, `hello-world`.

### Engineering / maintenance
- **YouTube fetcher** (`src/lib/youtube.ts`): `fromChannelPage` returns shorts;
  documentary-style long videos lose the homepage slot when RSS is blocked.
  Consider a second parse path or cache strategy.
- **`dist/` sync** is manual and noisy. Explore vercel build pre-clean or a
  `.gitignore` split so only `favicon`-class assets sync instead of all of
  `dist/`.
- `assets-src/` + `references/` scratch folders are growing; keep them out of
  git (already ignored) and delete stale files (see `c9b7734` precedent).
- Draft-scheduling: posts respect `draft: true` only; no date-based
  publish/un-publish yet.

### Design system
- `--fsx` multiplier exists but is unused everywhere (always `1`). Either
  exercise it (accessibility: font-size bump) or remove.
- Webapp token block is duplicated across 10 apps — extract a shared snippet
  and keep `webapp-resource/SKILL.md` as the single canonical copy.

### Surat Langit
- Data fetch: `api.alquran.cloud` could fall back to a bundled JSON for builds
  without network.
- Verify Turnstile + Supabase client/node key handling against the latest
  Supabase policies (`e1d91f6` era) before touching flow.
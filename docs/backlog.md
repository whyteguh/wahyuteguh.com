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

### 2026-10-04
- Add The Paper Oracle webapp resource (from `references/paperoracle.html`) —
  a four-colour paper-magic personality reading: nine sliders describe someone,
  a jointed paper person changes outfit/mood/colour, and a cut-and-reveal
  overlay stamps a red / yellow / green / blue verdict. Light-touch reskin:
  kept the paper-craft look and the four DISC colours (they are the content),
  swapped Special Elite to Courier Prime (kept Caveat), and added site
  dark-mode with a header toggle that follows `wt-mode`. English —
  `public/apps/paperoracle/index.html`, `src/content/resources/paperoracle.md`.
- Remove the dead `--fsx` type multiplier (defined as `1`, never overridden)
  and replace every `calc(Npx * var(--fsx))` with its plain pixel value across
  `src/styles/global.css`, `src/pages/{index,404,link,resources/[slug]}.astro`.
  Webapps never used it. `dist/` synced. Docs updated —
  `src/styles/global.css`, `src/pages/…`, `docs/design-system.md`.
- Add the Skillform webapp resource (from `references/skillshape.html`) —
  map skill depth and breadth on a live figure and get an archetype (I / — /
  T / π / M / comb) with a coach that names the one field closest to the next
  shape. Ported to dot-paper (Caveat + Courier Prime, site tokens), inline
  SVG icons, English, localStorage only —
  `public/apps/skillform/index.html`, `src/content/resources/skillform.md`.

### 2026-09-30
- Rebuild Sleep Lab as a single swipeable almanac of ten tools, merging the
  richer `references/sleep..html` (Somnium) with the earlier Sleep Lab extras:
  Age, Bedtime (draggable 24h dial + hypnogram), Debt (week bars + battery),
  Chronotype (MEQ), Doze (Epworth), Polyphasic (timeline), Caffeine (decay
  curve), Hygiene (10-3-2-1-0), Breathe (4-7-8 / box / sigh) and Papers.
  Swipe left/right, tab strip, or arrow keys to move between tools; active
  tool and settings persist. Reskinned to dot-paper; English — 
  `public/apps/sleep-lab/index.html`, `src/content/resources/sleep-lab.md`.

### 2026-09-30
- Rewrite the Tsundoku Tamer resource from the field-study reference
  (`references/tsundoku.html`) — a live physics pile in centimetres you can
  inspect and dust off, a guilt index, an audit ledger, reading sessions with
  a focus timer, a shelf of honor, a graveyard, an intervention modal, and a
  field-notes log. Reskinned to dot-paper (Caveat + Courier Prime, site
  tokens); dropped the lucide CDN for an inline SVG icon registry; kept
  English. Verdict/roasts written in the reference's dry voice —
  `public/apps/tsundoku-tamer/index.html`, `src/content/resources/tsundoku-tamer.md`.

### 2026-09-30
- Add the Sleep Lab webapp resource — eight sleep tools grounded in consensus
  research (AASM/SRS/AAP recommended hours by age; Sleep Foundation review for
  cycle timing, the 10-3-2-1-0 rule, and nap guidance): recommended sleep by
  age, bedtime/wake calculator, sleep debt, cycle wake times, nap planner,
  polyphasic schedules, hygiene checklist, and a chronotype quiz. English copy,
  dot-paper tokens, localStorage only —
  `public/apps/sleep-lab/index.html`, `src/content/resources/sleep-lab.md`.

### 2026-09-29
- Add the Six Thinking Hats webapp resource (from `references/6thinkinghat.html`):
  wear each of de Bono's six hats, think in its voice, pin notes per hat, then
  let the blue hat synthesize (bloom chart, insights, verdict gauge,
  transcript). Ported to the dot-paper design system — remapped paper/ink to
  site tokens while keeping the six method colours, swapped Fraunces/Instrument
  for Caveat/Courier Prime, and replaced the lucide CDN with inline SVG icons.
  Copy translated to Indonesian (`Six Thinking Hats`) —
  `public/apps/six-hats/index.html`, `src/content/resources/six-hats.md`.

### 2026-09-28
- Wording pass across blog + resources: fix typos/unnatural Indonesian (e.g.
  "kebentuk"→"terbentuk", "kebuka"→"terbuka", "kesedia"→"tersedia",
  "kepahami"→"dipahami", "nasehat"→"nasihat", "Superstisi"→"Takhayul",
  incomplete clauses, unit mismatches), standardize the negative particle to
  "nggak" across all Indonesian posts, rename the Fear & Decision resource slug
  from `decision-clarity` to `fear-and-decision`, use "AI Analysis" for the
  history-of-my-life prompt button, and smooth the 7→10 area transition in the
  Wheel of Life CTA. `shipping-checklist-ebook` stays `draft: true` (dummy).
- Add an Indonesian version of the Difficult Conversation NVC builder as a
  **separate page/resource** (`obrolan-sulit`) rather than a toggle: translated
  UI, chapters, feelings/needs banks, judgment detector (with Indonesian
  patterns), fake-feeling map, scenarios and script templates, plus a language
  link in each app's masthead. English version links back to it —
  `public/apps/nvc-id/index.html`, `src/content/resources/obrolan-sulit.md`,
  `public/apps/nvc/index.html`.
- Add the Difficult Conversation webapp resource: an NVC (Rosenberg) script
  builder ported from the reference to the dot-paper tokens and reworked into
  one page (intro hero + builder on the same scroll, no view switching). Keeps
  the judgment-detecting observation editor, feelings/needs word banks, the
  vent distiller, the live letter, and copy/download/speak/print. Copy stays
  English (word bank + generated script). Also fixed two latent bugs from the
  source (`partComplete` called as a function instead of indexed) —
  `public/apps/nvc/index.html`,
  `src/content/resources/difficult-conversation.md`.

### 2026-09-27
- Design system: document the **brick-red accent house look** shared by
  `woop` / `dunbar-orrery` / `vital-few` (terracotta accent on cream, the
  warmth ramp, no second accent) — `docs/design-system.md`.
- Fix Dunbar's Orrery wording ("Satu ratus" → "Seratus", Indonesian timeline
  labels, "tandai ditemui", "CARA HITUNG DECAY") —
  `public/apps/dunbar-orrery/index.html`.
- Add the Dunbar's Orrery webapp resource: a layered relationship map (5
  confidants / 15 close / 50 active / 150 acquaintances) where bonds warm and
  cool by contact recency. Drag people between rings, mark them seen, and
  scrub or play a year forward to watch lights fade. Reskinned from the
  reference to the dot-paper tokens (canvas reads the CSS vars per frame) —
  `public/apps/dunbar-orrery/index.html`,
  `src/content/resources/dunbar-orrery.md`.

### 2026-09-26
- Rebuild WOOP as a single-page tool in the dot-paper design: collapse the
  home / interview / review / library screens into one scroll (W-O-O-P steps,
  live sheet, collection), remap the reference's palette to the site tokens,
  and drop its page-wide light/dark step switching so the AppShell theme stays
  authoritative — `public/apps/woop/index.html`,
  `src/content/resources/woop.md`.
- Randomizer: move the animation setting into one shared panel below the
  tools with three options (off / normal / drama), add a settle-flash on name
  and number draws, and fix leftover shake/spin animations on the dice and
  coin (each cell now uses a swappable inner wrapper so the loop stops on
  settle) — `public/apps/randomizer/index.html`.
- Add a configurable "suspense" animation to Randomizer (0–5s slider): dice
  spin and decelerate before settling, cards shuffle before revealing, and
  name/number draws flicker then stop. Uses a generation token so switching
  tabs mid-animation can't throw —
  `public/apps/randomizer/index.html`.
- Add the Randomizer webapp resource: a tabbed set of crypto-backed random
  tools — dice (1–6, sides 2–100), coin flip, 52-card deck draws, number
  generator (with a no-repeat mode), name/option drawing, list shuffle, random
  letter, and random color — `public/apps/randomizer/index.html`,
  `src/content/resources/randomizer.md`.
- Add the WOOP webapp resource (Wish → Outcome → Obstacle → Plan as a stacked
  "wall & ladder" single-scroll form with live cards, a temptation slider, and
  copy/.md export) plus the paired blog post "Nulis Mimpi Aja Nggak Cukup —
  Justru Itu Bikin Kamu Makin Males" linking to `/resources/woop/` —
  `public/apps/woop/index.html`, `src/content/{resources,blog}/…`.
- Rework Decision Clarity from a multi-step wizard into a single-scroll form
  with a live output panel: no next/back, the report (and its completeness
  meter) builds as you type, and History / Daftar Haram moved to their own tabs
  outside the flow. Storage key bumped to v2 —
  `public/apps/fear-and-decision/index.html`,
  `src/content/resources/fear-and-decision.md`.
- Add Decision Clarity webapp resource: a decision tool built on Fear-Setting
  (Ferriss), Inversion (Munger) and Regret Minimization (Bezos). Multi-step
  wizard with a reversibility check (quick vs deep mode), a nightmare list with
  probability sliders, benefit-of-attempting and cost-of-inaction, an explained
  regret score, anti-goals with a required if-then trigger that auto-generates a
  not-to-do list, a standing "Daftar Haram", a decision report with copy-as-AI-
  prompt and .md download, plus history with staleness follow-ups. No AI calls —
  pure form + text compilation, localStorage only —
  `public/apps/fear-and-decision/index.html`,
  `src/content/resources/fear-and-decision.md`.

### 2026-09-24
- Remove the Jar of Life resource (`public/apps/jar-of-life/`,
  `src/content/resources/jar-of-life.md`) — dropped from resources.
- Migrate the Pareto "Vital Few" effort × impact matrix into resources as
  `vital-few`: draggable 10×10 map, auto vital-few line, adjustable 60–95%
  threshold, Pareto curve and execution list — reskinned to the dot-paper
  tokens. Fixed several bugs from the source: `setPointerCapture` could
  throw and kill node interaction (now guarded), the empty state now shows
  when every task is done (not just when the list is empty), a single vital
  task no longer reads "DISTRIBUSI MERATA", and SVG-baked colors now repaint
  when the site theme flips —
  `public/apps/vital-few/index.html`, `src/content/resources/vital-few.md`.
- Migrate The 12 Week Year execution board into resources: 84-day grid,
  weekly execution score with an 85% target, per-day commitments, cycle
  settings and progress strip — reskinned to the dot-paper tokens (the
  source used its own palette/fonts) — `public/apps/12-week-year/index.html`,
  `src/content/resources/12-week-year.md`.

### 2026-09-23
- Add Personal OKR webapp resource: objectives + measurable key results with
  live progress, inline fill-in tooltips, load-sample, "copy as prompt to AI"
  modal, print/PDF, and clear. Key results capped at 2–5 per objective —
  `public/apps/personal-okr/index.html`,
  `src/content/resources/personal-okr.md`.

### 2026-09-22
- Serve Surat Langit at `suratlangit.wahyuteguh.com` from the **same** Vercel
  project: `vercel.json` rewrites that host's `/` to the app and applies a
  host-scoped CSP. In-repo app + `/suratlangit` wrapper kept —
  `vercel.json`, `docs/architecture.md`.
- Switch Surat Langit resource to `type: external` pointing at
  `https://suratlangit.wahyuteguh.com/`, so the resource page is an
  outbound link card instead of an iframe. In-repo app + `/suratlangit/`
  wrapper + CSP left in place for now —
  `src/content/resources/surat-langit.md`.
- Add Quranote resource as a new `external` resource type (app hosted on
  `quranote.wahyuteguh.com`, its own Vercel project): the resource page is a
  card with an outbound "open" link instead of an iframe — `type: external`
  + `externalUrl` in `src/content.config.ts`, rendered in
  `src/pages/resources/[slug].astro` — `src/content/resources/quranote.md`.
- Rename Speaking Tempo blog post "kenceng" → "cepet" (kenceng implies volume
  in Indonesian) — slug now
  `src/content/blog/dulu-aku-ngomong-cepet-banget.md`.
- Add Speaking Tempo webapp resource (Web Audio metronome 30–260 BPM with a
  JS-driven smooth pendulum, 2/4–6/8 time signatures, tap tempo, three sound
  timbres) plus a teleprompter with 60–320 wpm speed control and fullscreen —
  `public/apps/speaking-tempo/index.html`,
  `src/content/resources/speaking-tempo.md`.
- Add paired blog post "Dulu Aku Ngomong Cepet Banget. Ternyata Itu Bukan
  Tanda Pinter."; CTA links to `/resources/speaking-tempo/` —
  `src/content/blog/dulu-aku-ngomong-cepet-banget.md`.

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

**Blog** (17): Dulu Aku Ngomong Cepet Banget, Mencari Petunjuk, Ohtani,
Eisenhower, Habit Bolong Sehari, Hidup Kamu Punya Pola, Ikigai (bukan Venn
diagram), Kariernya Lancar, Kenalan Sama Flowmodoro, Muslim sudah disetting…,
Odyssey Plan, RSVP (satu kata), Semuanya Kelihatan Penting, Tsundoku,
tools-i-use, hello-world, shipping-small.

**Resources** (29) — note the pairing pattern blog ⇄ resource:
- webapp: habitat, surat-langit, quranote, history-of-my-life,
  moslem-productivity-rhythm, odyssey-plan, pomodoro-timer, priority-workspace,
  tsundoku-tamer, wheel-of-life, harada-method, ikigai, speed-reader,
  speaking-tempo, personal-okr, 12-week-year, vital-few, fear-and-decision, woop,
  randomizer, dunbar-orrery, difficult-conversation, obrolan-sulit, six-hats, sleep-lab, skillform, paperoracle
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
- (audited 2026-10-04: values match canonical across all 20 apps —
  remaining diffs are formatting-only; `--fsx` removed, sizes are plain px)

### Surat Langit
- Data fetch: `api.alquran.cloud` could fall back to a bundled JSON for builds
  without network.
- Verify Turnstile + Supabase client/node key handling against the latest
  Supabase policies (`e1d91f6` era) before touching flow.
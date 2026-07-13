---
name: webapp-resource
description: >
  Build or align a single-page webapp resource (type: webapp) for wahyuteguh.com
  so it matches the dot-paper design system used by the other resources
  (Pomodoro, History of My Life, Moslem Productivity Rhythm, Tsundoku Tamer).
  Covers both flows: building a new app from scratch in Claude Code, and
  aligning an app the user built elsewhere and dropped in references/.
  Use when the user says "new resource", "add a webapp", "new tool for
  resources", "align this with the site design", "make this match the other
  apps", or drops a file in references/ and asks to integrate it.
---

# Webapp resource: design consistency

Every `type: webapp` resource is a **self-contained single HTML file** at
`public/apps/<slug>/index.html`, rendered full-screen inside
`src/layouts/AppShell.astro` (no iframe box, no site header/nav — AppShell's
footer already provides "← wahyuteguh | all resources" and the ink/paper
theme toggle). The app must never duplicate that chrome.

## Design tokens (copy verbatim)

Every app binds Tailwind colors to CSS vars so `html.dark` (toggled by
AppShell from `localStorage.wt-mode`) repaints the whole app with no extra
work. Use these exact values — don't invent new ones:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;600;700&display=swap" rel="stylesheet">

<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    cream: 'rgb(var(--c-cream) / <alpha-value>)',
                    'cream-dark': 'rgb(var(--c-cream-dark) / <alpha-value>)',
                    earth: 'rgb(var(--c-earth) / <alpha-value>)',
                    'earth-light': 'rgb(var(--c-earth-light) / <alpha-value>)',
                    'earth-dark': 'rgb(var(--c-earth-dark) / <alpha-value>)',
                    charcoal: 'rgb(var(--c-charcoal) / <alpha-value>)',
                    'charcoal-mid': 'rgb(var(--c-charcoal-mid) / <alpha-value>)',
                    stone: 'rgb(var(--c-stone) / <alpha-value>)',
                    accent: 'rgb(var(--c-accent) / <alpha-value>)',
                    surface: 'rgb(var(--c-surface) / <alpha-value>)',
                },
                fontFamily: {
                    serif: ['Caveat', 'cursive'],
                    hand: ['Caveat', 'cursive'],
                    sans: ['Courier Prime', 'monospace'],
                }
            }
        }
    }
</script>

<style>
    :root {
        --c-cream: 251 250 246;
        --c-cream-dark: 240 235 225;
        --c-earth: 139 111 71;
        --c-earth-light: 196 168 130;
        --c-earth-dark: 92 69 48;
        --c-charcoal: 43 41 37;
        --c-charcoal-mid: 74 69 64;
        --c-stone: 154 147 144;
        --c-accent: 179 67 43;
        --c-surface: 255 255 255;
    }
    html.dark {
        --c-cream: 27 25 21;
        --c-cream-dark: 69 63 52;
        --c-earth: 196 168 130;
        --c-earth-light: 214 190 150;
        --c-earth-dark: 214 190 150;
        --c-charcoal: 230 225 211;
        --c-charcoal-mid: 164 157 141;
        --c-stone: 124 118 106;
        --c-accent: 224 122 95;
        --c-surface: 55 51 43;
    }
    body {
        font-family: 'Courier Prime', monospace;
        background-color: rgb(var(--c-cream));
        color: rgb(var(--c-charcoal));
        background-image: radial-gradient(circle, rgba(139, 111, 71, 0.18) 1px, transparent 1.2px);
        background-size: 22px 22px;
        transition: background-color 0.5s ease, color 0.5s ease;
    }
    html.dark body {
        background-image: radial-gradient(circle, rgba(196, 168, 130, 0.12) 1px, transparent 1.2px);
    }
    .serif { font-family: 'Caveat', cursive; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
    .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>

<!-- Theme: follow the parent site's mode (same-origin localStorage 'wt-mode') -->
<script>
    function applyTheme() {
        var m = 'paper';
        try { m = localStorage.getItem('wt-mode') || 'paper'; } catch (e) {}
        document.documentElement.classList.toggle('dark', m === 'dark' || m === 'ice-night');
    }
    applyTheme();
    window.addEventListener('storage', function (e) { if (e.key === 'wt-mode') applyTheme(); });
</script>
```

`<body class="bg-cream text-charcoal font-sans">` — always.

## Style vocabulary

- **Cards**: `bg-surface border border-cream-dark rounded-2xl` (or `rounded-3xl`
  for hero/stat cards), `shadow-sm`.
- **Primary CTA**: `bg-earth text-cream hover:bg-earth-dark`, pill-shaped
  (`rounded-full`).
- **Secondary/neutral button**: `bg-cream text-stone hover:bg-cream-dark`.
- **Destructive/critical only** (delete, "let it go"): `text-accent` /
  `bg-accent`. Don't use accent for anything that isn't a warning or a
  deliberate red highlight — it's the site's one red.
- **Tabs / pill toggles**: `bg-cream-dark/50 p-1 rounded-full`, active state
  `bg-charcoal text-cream`.
- **Eyebrow labels**: `text-[10px] font-bold uppercase tracking-widest text-stone`.
- **Big/playful headings or taglines**: `.serif` (Caveat) class, often with a
  slight rotation for a handwritten feel: `style={{ transform: 'rotate(-1deg)' }}`.
- **Modals**: `bg-charcoal/40 backdrop-blur-sm` overlay, `bg-surface
  rounded-[2rem] border border-cream-dark animate-slideUp` panel.
- Icons: inline SVG, `stroke="currentColor"`, no icon font/library dependency.

## What NOT to add

- No header nav, back-to-home link, or theme toggle inside the app —
  `AppShell.astro`'s footer already covers navigation and theme.
- No backend calls, analytics, or trackers. Everything persists to
  `localStorage` only (say so in the resource's markdown body: "Saved in
  your browser only — nothing is sent anywhere").
- No new npm dependency. Everything loads from the same three CDN scripts
  (Tailwind, React + ReactDOM, Babel standalone) already used by every
  sibling app — or, for a genuinely simple tool with little state (see
  `public/apps/pomodoro/index.html`), skip React entirely and write plain
  HTML/CSS/JS using the same tokens. Don't reach for React on a tool that's
  just a form and a timer.

## Flow A — building a new app from scratch here

1. Ask (or infer) what the tool does and whether it needs real UI state
   (tabs, modals, CRUD lists → React) or not (single timer/counter → vanilla
   JS, see `public/apps/pomodoro/index.html` for the vanilla pattern with
   the same tokens).
2. Write `public/apps/<slug>/index.html` using the boilerplate above.
3. Register it (Flow C below).

## Flow B — aligning an app dropped in `references/`

1. Read the file in full.
2. Swap its `<head>` for the canonical boilerplate above (fonts, Tailwind
   config, CSS vars, theme-sync script) — don't hand-tune a new palette.
3. Remap its component classes: any `slate-*`, `indigo-*`, `gray-*`, `blue-*`
   Tailwind color → the nearest token (`charcoal`, `earth`, `stone`, `cream`,
   `accent`). Square/sharp corners → `rounded-full` for buttons/pills,
   `rounded-2xl`/`rounded-3xl` for cards. `font-sans`/system fonts → Courier
   Prime (body) / Caveat (headings, via `.serif`).
4. Strip any header/nav/theme-toggle the original app built for itself —
   AppShell already provides that.
5. Save the result to `public/apps/<slug>/index.html` (the `references/`
   copy can stay as the original scratch file, it isn't part of the build).
6. Register it (Flow C below).

## Flow C — register as a resource (both flows end here)

Create `src/content/resources/<slug>.md`:

```md
---
title: "<Name>"
description: "<one or two sentences, matches the tone of the other resources>"
type: webapp
icon: "<single emoji>"
appUrl: "/apps/<slug>/index.html"
date: <today, YYYY-MM-DD>
---

## About this tool

<1-2 sentence intro>

- **<Feature>** — <what it does>.
- ...

Saved in your browser only — nothing is sent anywhere.
```

Schema is defined in `src/content.config.ts` — `type`, `appUrl`, `date` are
required; `icon` defaults to 📦 if omitted but always set one; `draft: true`
to hide it without deleting.

## Verify

Run `npx astro build` and confirm `/resources/<slug>/index.html` appears in
the generated routes. Skim the rendered HTML (`curl` or a headless browser)
for the app's own text strings to confirm React/JS didn't crash silently.

# Dot-paper design system

The whole site reads from CSS variables. Change a token in one place and the
site repaints. **The one canonical source is `src/styles/global.css`.** If
anything here disagrees with that file, the CSS wins — fix this doc.

## Concept

"Dot-paper" notebook aesthetic: cream paper with a faint dot grid, a red
margin rule, monospace body text, handwritten caveat accents, dotted
underlines. There are **four modes** = two worlds × day/night, switched via
`<html data-mode="…">` and persisted in `localStorage.wt-mode`:

| World | Day | Night |
| --- | --- | --- |
| Normal | `paper` | `dark` |
| Ice wizard | `ice` (frost) | `ice-night` (aurora / polar night) |

Clicking the polaroid photo casts the "freeze" spell (chroma-keyed
`freeze.mp4` + CSS fallback) and crosses worlds, carrying day/night across.

## Global tokens (`html[data-mode]`)

| Token | paper | dark | ice | ice-night |
| --- | --- | --- | --- | --- |
| `--paper` | `#fbfaf6` | `#1b1915` | `#eaf1f8` | `#0b1420` |
| `--dots` | radial `#d8d3c6` | radial `#37332b` | radial `#c3d4e6` | radial `#1c2c40` |
| `--ink` | `#2b2925` | `#e6e1d3` | `#1c2b3d` | `#dbe7f2` |
| `--muted` | `#5d594f` | `#a49d8d` | `#47607a` | `#93a7bd` |
| `--soft` | `#9a9482` | `#7c766a` | `#8399ad` | `#6b809a` |
| `--faint` | `#cfc9b8` | `#453f34` | `#c3d3e3` | `#26384f` |
| `--dotline` | `#b8b2a2` | `#4d463a` | `#a8bdd2` | `#2c405a` |
| `--card` | `rgba(255,255,255,.65)` | `rgba(255,255,255,.05)` | `rgba(255,255,255,.55)` | `rgba(120,170,210,.08)` |
| `--accent` | `#b3432b` | `#e07a5f` | `#2f6f9f` | `#6cc6d9` |
| `--rule` | accent .55 | accent .5 | accent .5 | accent .45 |

`--font-body: 'Courier Prime', monospace`; `--font-hand: 'Caveat', cursive`;
`--fsx: 1` (global type multiplier). Google Fonts CDN adds `Dancing Script`
for decorative bits. All sizes derive from `calc(N * var(--fsx))`.

## Layout primitives

- `.page` — max-width 980px centered column.
- `.ruled` + `.rule` — the red vertical margin line at `left: 140px`
  (hidden < 700px).
- `.flow` — pad `76px 8px 56px 176px`, vertical flex gap 48px.
  `.flow.centered` strips the rule gutter (used by `/link`).
- `.sec` — one content section; holds a `.note`.
- `.note` — handwritten (Caveat, accent, `rotate(-2deg)`) margin label at
  `left:-176px`, e.g. `hello`, `writing`, `toolbox`, `elsewhere`.
- `.hand-link` — Caveat accent "all posts →" links.
- `.back-link`, `.kicker` (uppercase accent eyebrow).

## Components (all in `global.css`)

- `.sec-title` — uppercase, `border-bottom` ink rule, `fit-content` width.
- `.page-title` / `.page-desc` — page hero.
- `.card` / `.card-grid` — 2-col grid, `1px solid --faint`, `--card` fill.
  `.card.dashed` for "coming soon…" placeholders; `.card.wide` spans both.
- `.post-row` — blog list row, dotted bottom border, `.compact` variant.
- `.res-row` — resource row with a fixed-width uppercase key label.
- `.btn` — solid accent button on the paper color.
- `.prose` — markdown body: uppercase `h2`, `blockquote` in Caveat with accent
  rule, `code` in a faint-bordered card box, dotted-underlined links.
- `.post-meta`, `.social-row`, `.colophon` — footer bits.
- `.theme-toggle` — fixed top-right pill, `border: 1px dashed --faint`.
- Hero extras (homepage only): `.polaroid` + tape + `.wiz` overlay photo,
  `.spell-note`, name → "why?teguh" type-in animation, `.video-row`/`.thumb`.
- The **red accent is one deliberate color** — reserve it for highlights,
  handwritten notes, and danger. Don't scatter it.

## Webapp resources

AppShell renders the app full-screen; apps carry **their own verbatim copy**
of the palette (Tailwind colors bound to CSS vars) so `html.dark` repaints
them. Canonical boilerplate blocks live in
`.claude/skills/webapp-resource/SKILL.md` — copy them exactly, colors:

```css
--c-cream 251 250 246   (dark 27 25 21)
--c-cream-dark 240 235 225 (dark 69 63 52)
--c-earth 139 111 71    (dark 196 168 130)
--c-earth-light 196 168 130 (dark 214 190 150)
--c-earth-dark 92 69 48 (dark 214 190 150)
--c-charcoal 43 41 37   (dark 230 225 211)
--c-charcoal-mid 74 69 64 (dark 164 157 141)
--c-stone 154 147 144   (dark 124 118 106)
--c-accent 179 67 43    (dark 224 122 95)
--c-surface 255 255 255 (dark 55 51 43)
```

Theme sync (never change):

```html
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

### App style vocabulary

- **Cards:** `bg-surface border border-cream-dark rounded-2xl` (`rounded-3xl`
  for hero/stat), `shadow-sm`.
- **Primary CTA:** `bg-earth text-cream hover:bg-earth-dark`, pill
  (`rounded-full`).
- **Secondary button:** `bg-cream text-stone hover:bg-cream-dark`.
- **Tabs/pill toggles:** `bg-cream-dark/50 p-1 rounded-full`, active
  `bg-charcoal text-cream`.
- **Eyebrow label:** `text-[10px] font-bold uppercase tracking-widest text-stone`.
- **Playful heading:** `.serif` (Caveat), slight `rotate(-1deg)`.
- **Modals:** `bg-charcoal/40 backdrop-blur-sm` overlay, `bg-surface
  rounded-[2rem] border border-cream-dark animate-slideUp` panel.
- **Icons:** inline SVG, `stroke="currentColor"`. No icon libs.

### Webapp rules

- No header/nav/theme button inside the app — AppShell owns that chrome.
- No new deps; single `index.html`. Simple tools → vanilla JS (see
  `public/apps/pomodoro/index.html`); stateful tools → React via CDN.
- Persist to `localStorage` only (Surat Langit is the sole exception).
- Body label in the resource markdown: "Saved in your browser only — nothing
  is sent anywhere."

## Darkening a new palette (anti-drift checklist)

1. Pull values from the tables above; do not invent hex codes.
2. Keep the paper dot-grid radial background and the 22px grid.
3. Reserve `accent` for warning/highlight only.
4. Match font stacks exactly (Courier Prime body, Caveat headings/serif).
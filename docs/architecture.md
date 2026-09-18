# Architecture

Static personal site for **wahyuteguh.com**. Everything is content-first:
markdown drives the pages, and interactive tools are plain HTML files embedded
full-screen. There is almost no runtime JavaScript — the only runtime module
is `src/lib/youtube.ts` and it runs at **build time**.

## Stack

- **Astro 5** (static output), Node ESM, TypeScript in `.astro` frontmatter.
- **Integrations:** `@astrojs/sitemap` only (see `astro.config.mjs`).
- **Deploy:** Vercel (`vercel.json` only adds security headers; no rewrite
  config needed).
- **No** React/state framework in the site itself. Webapp resources may use
  React via CDN (see design doc).
- **Supabase** is used only by Surat Langit (edge function
  `supabase/functions/submit-message`).

## Directory map

| Path | Purpose |
| --- | --- |
| `src/content/` | `blog/` + `resources/` markdown collections |
| `src/content.config.ts` | Zod schemas for both collections (`astro:content`) |
| `src/layouts/Base.astro` | Main site shell: head/SEO/OG, dot-paper theme, freeze + snow effects, footer |
| `src/layouts/AppShell.astro` | Full-screen shell for webapp resources: iframe + minimal footer + theme toggle |
| `src/pages/index.astro` | Homepage: hero, projects, blog, resources, latest videos |
| `src/pages/blog/` | Collection index + `[slug].astro` post renderer |
| `src/pages/resources/` | Collection index + `[slug].astro` (chooses Base or AppShell by `type`) |
| `src/pages/link.astro` | Bio link-page (`/link`), centered layout, Surat Langit's starry button |
| `src/pages/404.astro` | Error page |
| `src/pages/suratlangit/index.astro` | Thin iframe wrapper so the SL app can live at `/suratlangit` |
| `src/pages/rss.xml.js` | RSS feed from the blog collection |
| `src/lib/site.ts` | Socials, resource type labels, date formatting |
| `src/lib/youtube.ts` | Build-time latest-videos lookup |
| `src/styles/global.css` | Design tokens + all shared component CSS |
| `public/` | Static assets (favicon, images, downloads, `freeze.mp4`) |
| `public/apps/<slug>/` | One self-contained `index.html` per webapp resource |
| `supabase/` | Surat Langit edge functions + SQL scratch |
| `dist/` | Build output — **committed** to the repo by convention |

## Content flow

1. A `.md` file lands in `src/content/<collection>/`.
2. `src/content.config.ts` validates its frontmatter.
3. `[slug].astro` renders it. For resources, `type: webapp` switches the
   layout from `Base` (site chrome) to `AppShell` (full-screen iframe) pointing
   at `public/apps/<slug>/index.html`.
4. `sitemap` + `rss.xml.js` pick the pages up automatically.
5. `npx astro build` writes `dist/`; the repo convention is to commit that.

## Layouts: Base vs AppShell

**Base.astro** (`data-mode="paper"`) renders:
- SEO/OG/Twitter meta + canonical, Google Fonts (`Courier Prime`, `Caveat`,
  `Dancing Script`).
- The dot-paper background, a red margin rule, `.flow` content column.
- Theme toggle (☾ ink / ☀ paper ⇄ ice world), CSS+canvas "freeze" spell
  (chroma-keyed `freeze.mp4`), falling snow in ice modes, the wizard photo
  reveal — all in one inline script. The `wt-mode` key in localStorage holds
  one of `paper | dark | ice | ice-night`.
- Socials + colophon footer on the homepage only.

**AppShell.astro** (`data-mode="paper"`, dark when `wt-mode` is dark-side):
- No site header. Just the `<iframe class="app-frame">` and a slim footer
  with `← wahyuteguh | all resources` and an ink/paper theme toggle.

## Resources

- **Webapp** — `/apps/<slug>/index.html`. Embedded as a full-screen iframe.
  Must be self-contained (fonts + Tailwind/React via CDN), no app chrome, and
  its own copy of the token palette in `<style>`. Theme follows the parent via
  the `dark` class on `<html>`.
- **Landing / ebook** — rendered with `Base`, hero + download button +
  markdown prose body. Downloadable file under `public/downloads/`.

## Surat Langit (the exception)

- Standalone app `public/apps/suratlangit/index.html` (also shown at
  `/suratlangit` via iframe wrapper).
- **Cloudflare Turnstile** on the client; message submission flows through the
  Supabase edge function `submit-message`, which enforces a restrictive insert
  policy (public role cannot write directly).
- Its CSP is pinned in `vercel.json` (`/suratlangit/(.*)` and
  `/apps/suratlangit/(.*)`), with `connect-src` to Supabase + Al-Qur'an API and
  `frame-src` to Turnstile. Do not copy this CSP onto the whole site.

## Build-time data: latest videos

`src/lib/youtube.ts`:

1. Try the channel RSS feed (`feeds/videos.xml`) — has publish dates, gives
   full-length video links.
2. If RSS is bot-blocked (returns 500/404 from cloud IPs), retry 4× with
   `AbortSignal.timeout(12000)`, then fall back to parsing `ytInitialData` from
   the channel `/videos` page (shorts shelf). Fallback has no publish dates.
3. Homepage renders up to 3; an empty result degrades to a "Watch on YouTube"
   link. Never hard-fail the build on YouTube.

## Deployment & conventions

- **Build:** `npm run build` → static `dist/`.
- **Headers:** `vercel.json` sets `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy` globally, plus Surat Langit CSP.
- **Committed build output:** `dist/` is tracked. After content/UI changes the
  repo history shows a "Sync dist" pattern — match the most recent convention
  rather than guessing.
- Domain: `www.wahyuteguh.com` (site: set in `astro.config.mjs`).
- Subdomain: Surat Langit was previously routed to a subdomain root by Vercel
  (see `54bfe93`, `2871e6d`) — currently a standalone GitHub-connected Vercel
  project is out-of-repo (`d7d8e59` prepared it), so treat Surat Langit as
  living in this repo at `/suratlangit`.
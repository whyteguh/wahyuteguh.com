# wahyuteguh.com

Personal website built with [Astro](https://astro.build). Fully static — blog
posts and resources are plain markdown files.

## Commands

```sh
npm run dev      # dev server at localhost:4321
npm run build    # static build to dist/
npm run preview  # preview the build
```

## Adding a blog post

Drop a `.md` file in `src/content/blog/`:

```md
---
title: "Post title"
description: "One-line summary shown on cards."
date: 2026-07-03
tags: ["tag1", "tag2"]
draft: false        # true = hidden everywhere
---

Post body in markdown...
```

The filename becomes the URL slug (`my-post.md` → `/blog/my-post/`).

## Adding a resource

Resources live in `src/content/resources/` and come in two types:

### Web app (runs in the browser)

```md
---
title: "Tool name"
description: "What it does."
type: webapp
icon: "🍅"
appUrl: "/apps/my-tool/index.html"
date: 2026-07-03
---

Optional write-up shown below the embedded app.
```

Put the app itself (self-contained HTML/JS/CSS) in `public/apps/my-tool/`.
It gets embedded in an iframe on the resource page.

### Landing page (ebook / template download)

```md
---
title: "Ebook title"
description: "Pitch shown in the landing hero."
type: landing
icon: "📕"
downloadUrl: "/downloads/my-ebook.pdf"
downloadLabel: "Download the ebook (PDF)"
date: 2026-07-03
---

Longer sales copy / what's inside, shown below the hero.
```

Put the downloadable file in `public/downloads/`.

## Design tokens

All colors, fonts, and radii are CSS variables at the top of
`src/styles/global.css` (`:root` block). To apply the Claude Design
(`Home.dc.html`) look, swap the token values there — the rest of the site
reads from them.

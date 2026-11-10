# hrtsegv / GopherLog

A personal engineering site with selected projects and occasional writing about Go and systems. Built with React, TypeScript, and Vite; hosted on GitHub Pages.

## Development

Use Node.js 22.18+ and npm.

```sh
npm ci
npm run dev
```

## Write a post

Create a Markdown file in `content/posts/`. Posts are discovered automatically; no TypeScript changes are needed.

```markdown
---
title: "A small thing I learned"
date: 2026-11-10
description: "A short description of the problem and what worked."
category: Go
tags: [go, debugging]
slug: a-small-thing-i-learned
---

Start writing here. Use Markdown headings, links, tables, and fenced code blocks.
```

Quote titles and descriptions containing a colon. Slugs must be unique lowercase words separated by hyphens. Existing slugs should stay unchanged so published links keep working. Posts appear newest first. Dates use `YYYY-MM-DD`; tags are optional. Invalid metadata produces an error naming the file.

## Check and build

```sh
npm run typecheck
npm test
npm run check:content
npm run build
npm run preview
```

Every build checks TypeScript and all post metadata, including duplicate slugs. The GitHub Actions workflow also runs the content parser tests, then builds and deploys `dist/` on pushes to `main`. Hash routes keep direct article links working on GitHub Pages under `/gopher-log/`.

## Customize

- `data/profile.ts`: identity, introduction, and contact links.
- `data/projects.ts`: the full project collection.
- `pages/Home.tsx`: featured projects and homepage structure.
- `index.css`: colors, layout, typography, and responsive styles.

The site defaults to a dark terminal palette. The theme button also offers a light palette and remembers the visitor's choice.

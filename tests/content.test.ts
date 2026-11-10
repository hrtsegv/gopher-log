import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { loadPosts, parsePost } from "../lib/content.ts";

const markdown = (slug = "a-note", date = "2026-01-01") => `---
title: "A note: with punctuation"
date: ${date}
description: >-
  A description that
  spans two lines.
category: Go
slug: ${slug}
tags: [go, "tools, small"]
---

## A heading

\`\`\`go
fmt.Println("hello")
\`\`\`
`;

test("parses real YAML and preserves Markdown and code fences", () => {
  const post = parsePost(markdown().replace(/\n/g, "\r\n"), "note.md");
  assert.equal(post.frontmatter.title, "A note: with punctuation");
  assert.equal(
    post.frontmatter.description,
    "A description that spans two lines.",
  );
  assert.deepEqual(post.frontmatter.tags, ["go", "tools, small"]);
  assert.ok(post.content.includes('```go\nfmt.Println("hello")\n```'));
});

test("loads newest first and rejects duplicate URLs", () => {
  const files = {
    "older.md": markdown("old"),
    "newer.md": markdown("new", "2026-02-01"),
  };
  assert.deepEqual(
    loadPosts(files).map((post) => post.slug),
    ["new", "old"],
  );
  assert.throws(
    () => loadPosts({ ...files, "duplicate.md": markdown("old") }),
    /duplicate slug/,
  );
});

test("identifies the file when frontmatter is missing or invalid", () => {
  for (const raw of [
    "No frontmatter",
    markdown().replace("date: 2026-01-01", "date: 2026-02-30"),
    markdown().replace("slug: a-note", "slug: ../bad"),
    markdown().replace('tags: [go, "tools, small"]', "tags: go"),
    markdown().replace(
      'title: "A note: with punctuation"',
      "title: unquoted: punctuation",
    ),
  ]) {
    assert.throws(() => parsePost(raw, "broken.md"), /broken\.md:/);
  }
});

test("the existing article retains its original slug and code examples", () => {
  const raw = readFileSync(
    new URL("../content/posts/singleflight-in-go.md", import.meta.url),
    "utf8",
  );
  const post = parsePost(raw, "singleflight-in-go.md");
  assert.equal(post.slug, "singleflight-in-go");
  assert.equal(post.frontmatter.date, "2025-01-20");
  assert.ok(post.content.includes("requestGroup.Do("));
  assert.ok(post.content.includes("## Conclusion"));
});

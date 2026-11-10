import { parse } from "yaml";
import type { BlogPost, Frontmatter } from "../types";

export function parsePost(raw: string, filename: string): BlogPost {
  const match = raw
    .replace(/\r\n/g, "\n")
    .match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/);
  const fail = (message: string): never => {
    throw new Error(`${filename}: ${message}`);
  };

  if (!match) return fail("add YAML frontmatter between --- lines.");
  let metadata: Record<string, unknown>;
  try {
    metadata = parse(match[1]);
  } catch (error) {
    return fail(`invalid YAML frontmatter: ${(error as Error).message}`);
  }
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return fail("frontmatter must be a mapping.");
  }

  const required = [
    "title",
    "date",
    "description",
    "category",
    "slug",
  ] as const;
  for (const key of required) {
    if (typeof metadata[key] !== "string" || !metadata[key].trim()) {
      return fail(`"${key}" must be a non-empty string.`);
    }
  }

  const frontmatter = metadata as unknown as Frontmatter;
  const parsedDate = new Date(`${frontmatter.date}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.date) ||
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== frontmatter.date
  ) {
    return fail('"date" must be a valid date in YYYY-MM-DD format.');
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(frontmatter.slug)) {
    return fail('"slug" must contain lowercase words separated by hyphens.');
  }
  if (
    frontmatter.tags !== undefined &&
    (!Array.isArray(frontmatter.tags) ||
      frontmatter.tags.some((tag) => typeof tag !== "string"))
  ) {
    return fail('"tags" must be a list of strings.');
  }
  if (!match[2].trim())
    return fail("write some Markdown below the frontmatter.");

  return { slug: frontmatter.slug, frontmatter, content: match[2] };
}

export function loadPosts(files: Record<string, string>): BlogPost[] {
  const seen = new Set<string>();
  return Object.entries(files)
    .map(([filename, raw]) => {
      const post = parsePost(raw, filename);
      if (seen.has(post.slug))
        throw new Error(`${filename}: duplicate slug "${post.slug}".`);
      seen.add(post.slug);
      return post;
    })
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

import { allPosts } from "../data/posts";
import type { BlogPost } from "../types";

export function getSortedPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

import { readdirSync, readFileSync } from 'node:fs';
import { loadPosts } from '../lib/content.ts';

const directory = new URL('../content/posts/', import.meta.url);
const files = Object.fromEntries(
  readdirSync(directory)
    .filter(name => name.endsWith('.md'))
    .map(name => [name, readFileSync(new URL(name, directory), 'utf8')]),
);
const posts = loadPosts(files);
console.log(`Validated ${posts.length} post${posts.length === 1 ? '' : 's'}.`);

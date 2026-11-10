import { loadPosts } from '../lib/content';

const files = import.meta.glob<string>('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const allPosts = loadPosts(files);

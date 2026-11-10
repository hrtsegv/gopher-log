import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "../components/Layout";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { getPostBySlug } from "../lib/markdown";
import { formatDate } from "../lib/utils";

export function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  if (!post)
    return (
      <Layout>
        <div className="empty-state">
          <p className="section-comment">// no matching record</p>
          <h1>Post not found.</h1>
          <Link className="text-link" to="/writing">
            Back to writing <ArrowLeft size={15} />
          </Link>
        </div>
      </Layout>
    );
  const readTime = Math.max(
    1,
    Math.ceil(post.content.trim().split(/\s+/).length / 200),
  );
  // The page title already provides the article's h1. Keep existing Markdown files intact.
  const content = post.content.replace(/^\s*#\s+[^\n]+\n/, "");
  return (
    <Layout>
      <article className="article">
        <Link className="back-link" to="/writing">
          <ArrowLeft size={15} aria-hidden="true" />
          GopherLog / writing
        </Link>
        <header className="article-header">
          <div className="article-meta">
            <span className="post-topic">{post.frontmatter.category}</span>
            <time dateTime={post.frontmatter.date}>
              {formatDate(post.frontmatter.date)}
            </time>
            <span>{readTime} min read</span>
          </div>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.description}</p>
        </header>
        <MarkdownRenderer content={content} />
        <footer className="article-footer">
          <div className="tag-list">
            {post.frontmatter.tags?.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          <Link className="text-link" to="/writing">
            <ArrowLeft size={15} aria-hidden="true" />
            Back to writing
          </Link>
        </footer>
      </article>
    </Layout>
  );
}

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "../types";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link className="post-row" to={`/post/${post.slug}`}>
      <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
      <div>
        <h3>{post.frontmatter.title}</h3>
        <p>{post.frontmatter.description}</p>
        <span className="post-topic">{post.frontmatter.category}</span>
      </div>
      <ArrowUpRight className="row-arrow" size={17} aria-hidden="true" />
    </Link>
  );
}

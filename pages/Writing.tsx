import { Layout } from "../components/Layout";
import { PostCard } from "../components/PostCard";
import { RowsCount, TerminalPrompt } from "../components/TerminalPrompt";
import { getSortedPosts } from "../lib/markdown";

export function Writing() {
  const posts = getSortedPosts();
  return (
    <Layout>
      <header className="page-heading">
        <p className="section-comment">// notes from the workbench</p>
        <h1>
          GopherLog<span className="heading-tag">writing</span>
        </h1>
        <p>Go, backend engineering, and things learned by building.</p>
      </header>
      <TerminalPrompt>
        <span className="sql-keyword">SELECT</span> *{" "}
        <span className="sql-keyword">FROM</span> posts{" "}
        <span className="sql-keyword">ORDER BY</span> date{" "}
        <span className="sql-keyword">DESC</span>;
      </TerminalPrompt>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <RowsCount count={posts.length} />
    </Layout>
  );
}

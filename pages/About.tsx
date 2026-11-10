import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "../components/Layout";
import { TerminalPrompt } from "../components/TerminalPrompt";
import { profile } from "../data/profile";

export function About() {
  return (
    <Layout>
      <header className="page-heading">
        <p className="section-comment">// the person behind the prompt</p>
        <h1>Hi, I'm Abdallah.</h1>
        <p>Backend developer. Curious about how things work underneath.</p>
      </header>
      <TerminalPrompt>
        <span className="sql-keyword">SELECT</span> story{" "}
        <span className="sql-keyword">FROM</span> profile;
      </TerminalPrompt>
      <div className="about-prose prose">
        <p>
          I'm {profile.name}, also known as <a href={profile.github}>hrtsegv</a>
          . I’m a backend developer based in {profile.location}, working mostly
          with Go and exploring systems programming with C and Zig.
        </p>
        <p>
          I’m interested in distributed systems, performance, and the details
          that make software reliable. I also build small tools for the things I
          do every day: working with Git, watching files, making HTTP requests,
          and managing data.
        </p>
        <p>
          This site is my corner of the internet for those{" "}
          <Link to="/projects">projects</Link> and the occasional{" "}
          <Link to="/writing">note about what I’m learning</Link>. GopherLog is
          the notebook; it grows when I have something useful to share.
        </p>
        <p>
          You can also find me on{" "}
          <a href={profile.instagram} target="_blank" rel="noreferrer">
            Instagram (@a6h.aladdin)
          </a>
          .
        </p>
      </div>
      <section className="about-details" aria-labelledby="interests-heading">
        <h2 id="interests-heading">A few things I work with</h2>
        <dl className="details-list">
          <div>
            <dt>languages</dt>
            <dd>Go, C, Zig</dd>
          </div>
          <div>
            <dt>infrastructure</dt>
            <dd>Docker, Kubernetes, Terraform, AWS</dd>
          </div>
          <div>
            <dt>databases</dt>
            <dd>PostgreSQL, Redis, Cassandra, DynamoDB</dd>
          </div>
          <div>
            <dt>interests</dt>
            <dd>
              Distributed systems, networking, performance, internal tools
            </dd>
          </div>
        </dl>
      </section>
      <div className="contact-note">
        <p>Have an interesting problem in mind?</p>
        <a className="text-link" href={`mailto:${profile.email}`}>
          Let's talk <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </Layout>
  );
}

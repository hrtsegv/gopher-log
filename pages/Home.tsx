import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Layout } from "../components/Layout";
import { TerminalPrompt, RowsCount } from "../components/TerminalPrompt";
import { ProjectCard } from "../components/ProjectCard";
import { PostCard } from "../components/PostCard";
import { getSortedPosts } from "../lib/markdown";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

const featured = ["gitcs", "watcher", "incache"].flatMap((slug) =>
  projects.filter((project) => project.slug === slug),
);

export function Home() {
  const posts = getSortedPosts().slice(0, 3);
  return (
    <Layout>
      <section className="profile-terminal" aria-label="Profile">
        <div className="terminal-bar">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>profile.sql</span>
          <span className="terminal-session">psql / personal</span>
        </div>
        <div className="terminal-body">
          <TerminalPrompt>
            <span className="sql-keyword">SELECT</span> *{" "}
            <span className="sql-keyword">FROM</span> profile;
          </TerminalPrompt>
          <div className="record-label" aria-hidden="true">
            -[ RECORD 1 ]<span>──────────────────────</span>
          </div>
          <dl className="profile-record">
            <div>
              <dt>name</dt>
              <dd>
                <h1>{profile.name}</h1>
              </dd>
            </div>
            <div>
              <dt>role</dt>
              <dd>{profile.role}</dd>
            </div>
            <div>
              <dt>location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>interests</dt>
              <dd>Go, systems &amp; the details</dd>
            </div>
          </dl>
          <RowsCount count={1} />
          <p className="profile-intro">{profile.introduction}</p>
          <Link className="text-link profile-more" to="/about">
            A little more about me <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-section" aria-labelledby="projects-heading">
        <div className="section-heading">
          <div>
            <p className="section-comment">// things I've built</p>
            <h2 id="projects-heading">
              Selected projects
              <span className="heading-count">
                {String(featured.length).padStart(2, "0")}
              </span>
            </h2>
          </div>
          <Link className="text-link" to="/projects">
            all projects <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <TerminalPrompt>
          <span className="sql-keyword">SELECT</span> *{" "}
          <span className="sql-keyword">FROM</span> projects{" "}
          <span className="sql-keyword">WHERE</span> featured;
        </TerminalPrompt>
        <div className="result-table">
          <div className="table-heading" aria-hidden="true">
            <span>id</span>
            <span>project / description</span>
            <span>lang</span>
            <span />
          </div>
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <RowsCount count={featured.length} />
      </section>

      <section
        className="home-section writing-section"
        aria-labelledby="writing-heading"
      >
        <div className="section-heading">
          <div>
            <p className="section-comment">// notes from the workbench</p>
            <h2 id="writing-heading">
              GopherLog<span className="heading-tag">writing</span>
            </h2>
          </div>
          <Link className="text-link" to="/writing">
            all writing <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <p className="section-description">
          Occasional notes on Go, backend engineering, and things learned along
          the way.
        </p>
        <div className="post-list">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section
        className="home-section connect-section"
        aria-labelledby="connect-heading"
      >
        <div className="section-heading">
          <div>
            <p className="section-comment">// keep the conversation going</p>
            <h2 id="connect-heading">Elsewhere</h2>
          </div>
        </div>
        <div className="social-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={17} aria-hidden="true" />
            GitHub
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={17} aria-hidden="true" />
            LinkedIn
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`}>
            <Mail size={17} aria-hidden="true" />
            Email me
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <p className="connection-note">
          <span aria-hidden="true">↳</span> Always happy to talk about an
          interesting engineering problem.
        </p>
      </section>
    </Layout>
  );
}

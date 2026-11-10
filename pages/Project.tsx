import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Layout } from "../components/Layout";
import { TerminalPrompt } from "../components/TerminalPrompt";
import { projects } from "../data/projects";

export function Project() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === slug);
  if (!project)
    return (
      <Layout>
        <div className="empty-state">
          <p className="section-comment">// no matching record</p>
          <h1>Project not found.</h1>
          <Link className="text-link" to="/projects">
            Back to projects <ArrowLeft size={15} />
          </Link>
        </div>
      </Layout>
    );
  const githubUrl = new URL(project.githubUrl);
  githubUrl.pathname = githubUrl.pathname.replace(/\/{2,}/g, "/");

  return (
    <Layout>
      <Link className="back-link" to="/projects">
        <ArrowLeft size={15} aria-hidden="true" />
        all projects
      </Link>
      <TerminalPrompt>
        <span className="sql-keyword">SELECT</span> *{" "}
        <span className="sql-keyword">FROM</span> projects{" "}
        <span className="sql-keyword">WHERE</span> name ={" "}
        <span className="sql-string">'{project.name}'</span>;
      </TerminalPrompt>
      <header className="page-heading project-heading">
        <span className="language">
          <span aria-hidden="true" />
          {project.language}
        </span>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <a
          href={githubUrl.href}
          className="repository-link"
          target="_blank"
          rel="noreferrer"
        >
          View source on GitHub <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>
      <section className="project-features" aria-labelledby="features-heading">
        <p className="section-comment">// what it does</p>
        <h2 id="features-heading">Features</h2>
        <ul>
          {project.features.map((feature) => (
            <li key={feature}>
              <span aria-hidden="true">↳</span>
              {feature}
            </li>
          ))}
        </ul>
      </section>
      <div className="tag-list">
        {project.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
    </Layout>
  );
}

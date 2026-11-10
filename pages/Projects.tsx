import { Layout } from "../components/Layout";
import { ProjectCard } from "../components/ProjectCard";
import { RowsCount, TerminalPrompt } from "../components/TerminalPrompt";
import { projects } from "../data/projects";

export function Projects() {
  return (
    <Layout>
      <header className="page-heading">
        <p className="section-comment">// built to scratch an itch</p>
        <h1>Projects</h1>
        <p>
          Command-line tools, experiments, and small things that make work
          easier.
        </p>
      </header>
      <TerminalPrompt>
        <span className="sql-keyword">SELECT</span> *{" "}
        <span className="sql-keyword">FROM</span> projects;
      </TerminalPrompt>
      <div className="result-table">
        <div className="table-heading" aria-hidden="true">
          <span>id</span>
          <span>project / description</span>
          <span>lang</span>
          <span />
        </div>
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
      <RowsCount count={projects.length} />
    </Layout>
  );
}

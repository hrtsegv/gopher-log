import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link className="project-row" to={`/project/${project.slug}`}>
      <span className="row-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="project-summary">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <span className="language">
        <span aria-hidden="true" />
        {project.language}
      </span>
      <ArrowUpRight className="row-arrow" size={17} aria-hidden="true" />
    </Link>
  );
}

import { NavLink, Link, useLocation } from "react-router-dom";
import { Terminal } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { pathname } = useLocation();
  return (
    <header className="site-header">
      <Link to="/" className="wordmark" aria-label="hrtsegv home">
        <Terminal size={17} aria-hidden="true" />
        <span>
          hrtsegv<span className="wordmark-path"> / ~</span>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <NavLink
          to="/writing"
          className={({ isActive }) =>
            isActive || pathname.startsWith("/post/") ? "active" : undefined
          }
        >
          writing
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive || pathname.startsWith("/project/") ? "active" : undefined
          }
        >
          projects
        </NavLink>
        <NavLink to="/about">about</NavLink>
      </nav>
      <ThemeToggle />
    </header>
  );
}

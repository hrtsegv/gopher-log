import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <span>
        <span className="shell-dollar" aria-hidden="true">
          $
        </span>{" "}
        echo{" "}
        <span className="footer-quote">
          "© {new Date().getFullYear()} {profile.handle}"
        </span>
      </span>
      <nav className="footer-links" aria-label="Social links">
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <a href={profile.instagram} target="_blank" rel="noreferrer">
          Instagram <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </footer>
  );
}

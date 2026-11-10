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
      <a href={profile.github} target="_blank" rel="noreferrer">
        find me on GitHub <span aria-hidden="true">↗</span>
      </a>
    </footer>
  );
}

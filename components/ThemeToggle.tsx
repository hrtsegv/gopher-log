import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [light, setLight] = useState(
    () => document.documentElement.dataset.theme === "light",
  );
  const toggle = () => {
    const next = !light;
    document.documentElement.dataset.theme = next ? "light" : "dark";
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* The theme works without storage. */
    }
    setLight(next);
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${light ? "dark" : "light"} theme`}
      title={`Switch to ${light ? "dark" : "light"} theme`}
    >
      {light ? (
        <Moon size={16} aria-hidden="true" />
      ) : (
        <Sun size={16} aria-hidden="true" />
      )}
    </button>
  );
}

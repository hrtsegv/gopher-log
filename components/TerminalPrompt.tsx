import type { ReactNode } from "react";
import { profile } from "../data/profile";

export function TerminalPrompt({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`terminal-prompt ${className}`}>
      <span className="prompt-user" aria-hidden="true">
        {profile.handle}=#
      </span>
      <code>{children}</code>
    </div>
  );
}

export function RowsCount({
  count,
  label = "rows",
}: {
  count: number;
  label?: string;
}) {
  return (
    <p className="rows-count">
      ({count} {count === 1 && label === "rows" ? "row" : label})
    </p>
  );
}

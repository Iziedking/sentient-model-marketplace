"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const effective = theme === "system" ? systemTheme : theme;
  if (!mounted) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm">
      <span className="opacity-70">Theme:</span>
      <button
        onClick={() => setTheme("light")}
        className={`rounded px-2 py-1 ${effective === "light" ? "bg-background text-foreground border border-border" : "opacity-70"}`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`rounded px-2 py-1 ${effective === "dark" ? "bg-background text-foreground border border-border" : "opacity-70"}`}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`rounded px-2 py-1 ${theme === "system" ? "bg-background text-foreground border border-border" : "opacity-70"}`}
      >
        System
      </button>
    </div>
  );
}

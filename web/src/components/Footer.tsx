"use client";

import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  return (
    <footer className="mt-10 flex w-full justify-center border-t border-border bg-background/80 py-6 backdrop-blur">
      <div className="w-full max-w-6xl px-6 flex items-center justify-between">
        <p className="text-sm opacity-70">© {new Date().getFullYear()} sentient.market (sim)</p>
        <ThemeToggle />
      </div>
    </footer>
  );
}

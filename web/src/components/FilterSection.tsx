"use client";

import { useState } from "react";

export function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <section className="mb-3 rounded-xl border border-white/10 bg-black/30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-300"
      >
        <span>{title}</span>
        <span className="text-neutral-500">{open ? "▴" : "▾"}</span>
      </button>
      {open && <div className="px-3 pb-3">{children}</div>}
    </section>
  );
}

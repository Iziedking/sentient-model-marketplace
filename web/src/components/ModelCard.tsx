"use client";

import Link from "next/link";
import Image from "next/image";

export type ModelCardData = {
  id: string;
  slug: string;
  name: string;
  ownerName?: string | null;
  category: "LLM" | "Vision" | "Audio" | "Tooling" | string;
  tagsCsv?: string | null;
  pricePer1k: number;
  latencyMs: number;
  rating: number;
  short: string;
  totalPurchases: number;
  totalCalls: number;
  // logos
  logoUrl?: string | null;
};

function FallbackLogo({ name }: { name: string }) {
  const letter = (name || "?").trim().charAt(0).toUpperCase();
  return (
    <div className="h-9 w-9 rounded-md bg-gradient-to-br from-[var(--brand)] to-purple-600/80 grid place-items-center text-xs font-bold text-black/90">
      {letter}
    </div>
  );
}

function Stat({ label, value, title }: { label: string; value: string; title?: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-white/65" title={title}>
      <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
      <span className="tabular-nums">{value}</span>
      <span className="text-white/40">{label}</span>
    </span>
  );
}

export function ModelCard({ m }: { m: ModelCardData }) {
  const tags = (m.tagsCsv ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Link
      href={`/models/${m.slug}`}
      className="group relative block rounded-2xl border border-white/10 bg-white/5 p-5 transition
                 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                 focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70 focus-visible:outline-none"
    >
      {/* top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md overflow-hidden border border-white/10">
            {m.logoUrl ? (
              <Image
                src={m.logoUrl}
                alt={`${m.name} logo`}
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            ) : (
              <FallbackLogo name={m.name} />
            )}
          </div>
          <div>
            <div className="text-[12px] text-white/60">
              {m.ownerName ?? "—"} • {m.category}
            </div>
            <h3 className="mt-0.5 font-medium text-white">{m.name}</h3>
          </div>
        </div>

        {/* rating & price */}
        <div className="ml-3 text-right">
          <div className="text-[12px] text-white/70">{m.rating.toFixed(1)}★</div>
          <div className="mt-1 text-[11px] text-white/55">${m.pricePer1k.toFixed(4)}/1K</div>
        </div>
      </div>

      {/* short */}
      <p className="mt-3 text-[13px] leading-5 text-white/80 line-clamp-2">{m.short}</p>

      {/* tags */}
      {!!tags.length && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-black/30 border border-white/10 px-2 py-0.5 text-[11px] text-white/70"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* stats row */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Stat label="calls" value={m.totalCalls.toLocaleString()} title="Total calls" />
          <Stat label="purchases" value={m.totalPurchases.toLocaleString()} title="Total purchases" />
        </div>
        <span className="pointer-events-none rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[11px] text-white/70 opacity-0 transition group-hover:opacity-100">
          View
        </span>
      </div>
    </Link>
  );
}

export default ModelCard;

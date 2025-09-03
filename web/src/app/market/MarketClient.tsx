"use client";

import { useMemo, useState } from "react";
import { TagChip } from "@/components/TagChip";
import { FilterSection } from "@/components/FilterSection";
import ModelCard, { type ModelCardData } from "@/components/ModelCard";

type Props = { initial: ModelCardData[] };

const ALL_CATEGORIES = ["LLM", "Vision", "Audio", "Tooling"] as const;
type Category = (typeof ALL_CATEGORIES)[number];

const SORTS = [
  { key: "trending", label: "Trending" },
  { key: "purchases", label: "Most purchased" },
  { key: "calls", label: "Most used" },
  { key: "rating", label: "Top rated" },
  { key: "new", label: "New" },
] as const;
type SortKey = (typeof SORTS)[number]["key"];

function parseTags(all: ModelCardData[]) {
  const counts = new Map<string, number>();
  for (const m of all) {
    const tags = (m.tagsCsv ?? "")
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
    tags.forEach((t: string) => counts.set(t, (counts.get(t) ?? 0) + 1));
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 24)
    .map(([t]) => t);
}

export default function MarketClient({ initial }: Props) {
  const [q, setQ] = useState("");
  const [categories, setCategories] = useState<Set<Category>>(new Set());
  const [minRating, setMinRating] = useState<number>(0);
  const [priceBand, setPriceBand] =
    useState<"all" | "low" | "mid" | "high">("all");
  const [tagFilters, setTagFilters] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortKey>("trending");

  const topTags = useMemo(() => parseTags(initial), [initial]);

  const filtered = useMemo(() => {
    let items = initial.slice();

    if (q.trim()) {
      const needle = q.toLowerCase();
      items = items.filter((m) => {
        const hay = [m.name, m.ownerName ?? "", m.category, m.short, m.tagsCsv ?? ""]
          .join(" ")
          .toLowerCase();
        return hay.includes(needle);
      });
    }

    if (categories.size) {
      items = items.filter((m) => categories.has(m.category as Category));
    }

    if (minRating > 0) {
      items = items.filter((m) => m.rating >= minRating);
    }

    if (priceBand !== "all") {
      items = items.filter((m) => {
        const p = m.pricePer1k;
        if (priceBand === "low") return p < 0.001;
        if (priceBand === "mid") return p >= 0.001 && p <= 0.002;
        return p > 0.002;
      });
    }

    if (tagFilters.size) {
      items = items.filter((m) => {
        const tags = (m.tagsCsv ?? "").split(",").map((t) => t.trim());
        for (const t of tagFilters) if (!tags.includes(t)) return false;
        return true;
      });
    }

    if (sort === "purchases") items.sort((a, b) => b.totalPurchases - a.totalPurchases);
    else if (sort === "calls") items.sort((a, b) => b.totalCalls - a.totalCalls);
    else if (sort === "rating") items.sort((a, b) => b.rating - a.rating);
    else if (sort === "new") items.sort((a, b) => (a.id < b.id ? 1 : -1));
    else {
      // trending (simple composite)
      const score = (x: ModelCardData) => x.rating * 10 + x.totalPurchases * 2 + x.totalCalls;
      items.sort((a, b) => score(b) - score(a));
    }

    return items;
  }, [initial, q, categories, minRating, priceBand, tagFilters, sort]);

  const toggleCategory = (c: Category) =>
    setCategories((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });

  const toggleTag = (t: string) =>
    setTagFilters((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* top row */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 w-full md:w-[520px]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by name"
            className="w-full rounded-xl px-4 py-2.5 bg-black/40 border border-white/10 outline-none placeholder:text-neutral-400"
          />
          <span className="text-xs text-neutral-400 whitespace-nowrap">
            {filtered.length} {filtered.length === 1 ? "model" : "models"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {SORTS.map((s) => (
            <TagChip
              key={s.key}
              label={s.label}
              active={s.key === sort}
              onClick={() => setSort(s.key)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        {/* LEFT: filters */}
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 h-fit">
          <FilterSection title="Tasks / Category">
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map((c) => (
                <TagChip
                  key={c}
                  label={c}
                  active={categories.has(c)}
                  onClick={() => toggleCategory(c)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Rating">
            <div className="flex gap-2">
              {[0, 4, 4.5].map((r) => (
                <TagChip
                  key={r}
                  label={r === 0 ? "All" : `≥ ${r}★`}
                  active={minRating === r}
                  onClick={() => setMinRating(r)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Price / 1K tokens">
            <div className="flex flex-wrap gap-2">
              {[
                { k: "all", label: "All" },
                { k: "low", label: "< $0.001" },
                { k: "mid", label: "$0.001–$0.002" },
                { k: "high", label: "> $0.002" },
              ].map((p) => (
                <TagChip
                  key={p.k}
                  label={p.label}
                  active={priceBand === (p.k as "all" | "low" | "mid" | "high")}
                  onClick={() => setPriceBand(p.k as "all" | "low" | "mid" | "high")}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Tags">
            <div className="flex flex-wrap gap-2">
              {topTags.map((t) => (
                <TagChip
                  key={t}
                  label={t}
                  active={tagFilters.has(t)}
                  onClick={() => toggleTag(t)}
                />
              ))}
            </div>
          </FilterSection>
        </aside>

        {/* RIGHT: results grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <ModelCard key={m.id} m={m} />
          ))}
        </section>
      </div>
    </main>
  );
}

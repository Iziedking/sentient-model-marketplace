import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MODELS } from "@/data/models";
import { BuyButton, UseButton } from "@/components/ModelActions";

type ModelRow = {
  id: string;
  slug: string;
  name: string;
  ownerName: string | null;
  category: string;
  tagsCsv: string | null;
  pricePer1k: number;
  latencyMs: number;
  rating: number;
  short: string;
  totalPurchases: number;
  totalCalls: number;
  publicUrl: string | null;
};

function fromSeed(slug: string): ModelRow | null {
  const m = MODELS.find((x) => x.slug === slug);
  if (!m) return null;
  return {
    id: m.id,
    slug: m.slug,
    name: m.name,
    ownerName: m.owner ?? null,
    category: m.category,
    tagsCsv: m.tags.join(","),
    pricePer1k: m.pricePer1k,
    latencyMs: m.latencyMs,
    rating: m.rating,
    short: m.short,
    totalPurchases: Math.floor(Math.random() * 8000) + 100,
    totalCalls: Math.floor(Math.random() * 25000) + 500,
    publicUrl: null,
  };
}

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

export default async function ModelDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const db = await prisma.modelListing.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      ownerName: true,
      category: true,
      tagsCsv: true,
      pricePer1k: true,
      latencyMs: true,
      rating: true,
      short: true,
      totalPurchases: true,
      totalCalls: true,
      publicUrl: true,
    },
  });

  const model: ModelRow | null = db ?? fromSeed(slug);
  if (!model) return notFound();

  const tags =
    (model.tagsCsv ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean) || [];

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 text-white">
      <Link href="/market" className="text-sm text-neutral-300 hover:underline">
        ← Back to marketplace
      </Link>

      <header className="mt-4 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{model.name}</h1>
          <p className="mt-1 text-neutral-300">
            {model.ownerName ?? "—"} • {model.category}
          </p>
        </div>
        <div className="text-right text-sm text-neutral-300">
          <div>⭐ {model.rating.toFixed(1)}</div>
          <div>${model.pricePer1k.toFixed(4)} / 1K</div>
        </div>
      </header>

      <p className="mt-4 text-neutral-200">{model.short}</p>

      {!!tags.length && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-black/30 border border-white/10 px-2 py-0.5 text-xs text-neutral-300"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex gap-3">
          <BuyButton id={model.id} slug={model.slug} />
          <UseButton id={model.id} slug={model.slug} tokens={1000} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-neutral-300">
          <div>
            <div className="text-neutral-400">Total purchases</div>
            <div>{model.totalPurchases.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-neutral-400">Total calls</div>
            <div>{model.totalCalls.toLocaleString()}</div>
          </div>
        </div>

        {model.publicUrl && (
          <div className="mt-4">
            <a
              href={model.publicUrl}
              target="_blank"
              className="text-[var(--brand)] underline"
            >
              Model artifact
            </a>
          </div>
        )}
      </section>
    </main>
  );
}

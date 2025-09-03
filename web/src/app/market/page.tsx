import { prisma } from "@/lib/prisma";
import MarketClient from "./MarketClient";
import { MODELS } from "@/data/models";

export const dynamic = "force-dynamic";

export default async function Market() {

  const db = await prisma.modelListing.findMany({
    orderBy: { totalPurchases: "desc" },
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
    },
    take: 1000,
  });

 
  const map = new Map<string, any>();
  for (const m of db) map.set(m.slug, m);


  for (const s of MODELS) {
    if (map.has(s.slug)) continue;
    map.set(s.slug, {
      id: s.id,
      slug: s.slug,
      name: s.name,
      ownerName: s.owner ?? null,
      category: s.category,
      tagsCsv: s.tags.join(","),
      pricePer1k: s.pricePer1k,
      latencyMs: s.latencyMs,
      rating: s.rating,
      short: s.short,
     
      totalPurchases: Math.floor(Math.random() * 8000) + 100,
      totalCalls: Math.floor(Math.random() * 25000) + 500,
    });
  }


  const merged = [...map.values()].sort(
    (a, b) => (b.totalPurchases ?? 0) - (a.totalPurchases ?? 0)
  );

  return <MarketClient initial={merged} />;
}

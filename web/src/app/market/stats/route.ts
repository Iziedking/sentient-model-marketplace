import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
 
  const ratings = await prisma.rating.groupBy({
    by: ["modelId"],
    _avg: { stars: true },
    orderBy: { _avg: { stars: "desc" } },
    take: 8,
  });

 
  const topRated = await prisma.modelListing.findMany({
    where: { id: { in: ratings.map((r) => r.modelId) } },
  });

  const [trending, mostPurchased] = await Promise.all([
    prisma.modelListing.findMany({ orderBy: { totalCalls: "desc" }, take: 8 }),
    prisma.modelListing.findMany({ orderBy: { totalPurchases: "desc" }, take: 8 }),
  ]);

  return NextResponse.json({ trending, mostPurchased, topRated });
}

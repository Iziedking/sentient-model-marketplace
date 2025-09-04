import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = 'nodejs';

export async function GET() {
  const [mostPurchased, mostCalled, topRated] = await Promise.all([
    prisma.modelListing.findMany({ orderBy: { totalPurchases: "desc" }, take: 8 }),
    prisma.modelListing.findMany({ orderBy: { totalCalls: "desc" }, take: 8 }),
    prisma.modelListing.findMany({ orderBy: { rating: "desc" }, take: 8 }),
  ]);

  return NextResponse.json({ mostPurchased, mostCalled, topRated });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [trending, mostPurchased, topRated] = await Promise.all([
    prisma.modelListing.findMany({ orderBy: { totalCalls: "desc" }, take: 8 }),
    prisma.modelListing.findMany({ orderBy: { totalPurchases: "desc" }, take: 8 }),
    prisma.modelListing.findMany({ orderBy: { avgRating: "desc" }, take: 8 }),
  ]);

  return NextResponse.json({ trending, mostPurchased, topRated });
}

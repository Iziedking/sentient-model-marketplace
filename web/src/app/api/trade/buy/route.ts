import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MODELS } from "@/data/models";
import { auth } from "@/lib/auth";
import type { Prisma } from "@prisma/client";

const UNLOCK_PRICE_CENTS = 0;

type EnsureArgs = { modelId?: string; slug?: string; ownerId: string };
async function ensureModel(
  tx: Prisma.TransactionClient,
  { modelId, slug, ownerId }: EnsureArgs
) {

  if (modelId) {
    const found = await tx.modelListing.findUnique({ where: { id: modelId } });
    if (found) return found;
  }

 
  if (slug) {
    let found = await tx.modelListing.findUnique({ where: { slug } });
    if (found) return found;

    const seed = MODELS.find((m) => m.slug === slug);
    if (seed) {
      found = await tx.modelListing.create({
        data: {
          ownerId,
          slug: seed.slug,
          name: seed.name,
          ownerName: seed.owner ?? null,
          category: seed.category,
          tagsCsv: seed.tags.join(","),
          pricePer1k: seed.pricePer1k,
          latencyMs: seed.latencyMs,
          rating: seed.rating,
          short: seed.short,
          totalPurchases: Math.floor(Math.random() * 8000) + 100,
          totalCalls: Math.floor(Math.random() * 25000) + 500,
        },
      });
      return found;
    }
  }
  return null;
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { modelId, slug } = body ?? {};
  if (!modelId && !slug) {
    return NextResponse.json({ error: "model-missing" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return NextResponse.json({ error: "no-user" }, { status: 404 });

  if (UNLOCK_PRICE_CENTS > 0 && (user.creditsCents ?? 0) < UNLOCK_PRICE_CENTS) {
    return NextResponse.json(
      { error: "insufficient-credits" },
      { status: 402 }
    );
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const model = await ensureModel(tx, { modelId, slug, ownerId: user.id });
      if (!model) return { status: 404 as const };

      const existing = await tx.purchase.findFirst({
        where: { userId: user.id, modelId: model.id },
        select: { id: true },
      });
      if (existing) return { status: 200 as const, alreadyOwned: true };

      await tx.purchase.create({
        data: { userId: user.id, modelId: model.id, priceCents: UNLOCK_PRICE_CENTS },
      });

      if (UNLOCK_PRICE_CENTS > 0) {
        await tx.user.update({
          where: { id: user.id },
          data: { creditsCents: { decrement: UNLOCK_PRICE_CENTS } },
        });
      }

      await tx.modelListing.update({
        where: { id: model.id },
        data: { totalPurchases: { increment: 1 } },
      });

      return { status: 200 as const, alreadyOwned: false };
    });

    if (result.status === 404)
      return NextResponse.json({ error: "model-not-found" }, { status: 404 });

    return NextResponse.json({
      ok: true,
      alreadyOwned: result.alreadyOwned,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "buy-failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MODELS } from "@/data/models";
import { auth } from "@/lib/auth";
import type { Prisma } from "@prisma/client";

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
  const { modelId, slug, tokens = 1000 } = body ?? {};
  if (!modelId && !slug) {
    return NextResponse.json({ error: "model-missing" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return NextResponse.json({ error: "no-user" }, { status: 404 });

  try {
    const out = await prisma.$transaction(async (tx) => {
      const model = await ensureModel(tx, { modelId, slug, ownerId: user.id });
      if (!model) return { status: 404 as const };

      const costCents = Math.max(
        1,
        Math.round((tokens / 1000) * model.pricePer1k * 100)
      ); // min 1¢

      if ((user.creditsCents ?? 0) < costCents) return { status: 402 as const };

      await tx.usageCall.create({
        data: { userId: user.id, modelId: model.id, tokens, costCents },
      });

      await tx.user.update({
        where: { id: user.id },
        data: {
          creditsCents: { decrement: costCents },
          totalCalls: { increment: 1 },
          totalSpentCents: { increment: costCents },
        },
      });

      await tx.modelListing.update({
        where: { id: model.id },
        data: { totalCalls: { increment: 1 } },
      });

      return { status: 200 as const, costCents };
    });

    if (out.status === 404)
      return NextResponse.json({ error: "model-not-found" }, { status: 404 });
    if (out.status === 402)
      return NextResponse.json(
        { error: "insufficient-credits" },
        { status: 402 }
      );

    return NextResponse.json({ ok: true, costCents: out.costCents });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "call-failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true },
  });
  if (!user) {
    return NextResponse.json({ error: "no-user" }, { status: 404 });
  }

  
  const body = await req.json().catch(() => ({} as any));
  const {
    name,
    slug,
    category,
    tags,
    pricePer1k,
    short,
    latencyMs,
  } = body ?? {};

  if (!name || !slug || !category || pricePer1k == null || !short) {
    return NextResponse.json({ error: "missing-fields" }, { status: 400 });
  }


  const price = Number(pricePer1k);
  const latency = Number.isFinite(Number(latencyMs)) ? Number(latencyMs) : 500;
  const tagsCsv =
    Array.isArray(tags) ? tags.map((t: string) => `${t}`.trim()).filter(Boolean).join(",")
    : (typeof tags === "string" ? tags : "");

  try {
  
    const existing = await prisma.modelListing.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "slug-taken" }, { status: 409 });
    }

    const created = await prisma.modelListing.create({
      data: {
        ownerId: user.id,
        ownerName: user.name ?? null,
        name,
        slug,
        category,
        tagsCsv,
        pricePer1k: price,
        latencyMs: latency,
        rating: 4.2,
        short,
      },
      select: { id: true, slug: true },
    });

    return NextResponse.json({ ok: true, id: created.id, slug: created.slug });
  } catch (e: unknown) {
    // Prisma unique constraint, etc.
    return NextResponse.json(
      { error: "create-failed", detail: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}

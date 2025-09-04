import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "no-user" }, { status: 404 });

  const { name, slug, category, tags, pricePer1k, short } = await req.json();

  try {
    const created = await prisma.modelListing.create({
      data: {
        ownerId: user.id,
        name,
        slug,
        category,
        tagsCsv: Array.isArray(tags) ? tags.join(",") : String(tags ?? ""),
        pricePer1k: parseFloat(pricePer1k),
        latencyMs: 500,
        rating: 4.2,
        short,
        ownerName: user.name ?? null,
      },
      select: { id: true, slug: true },
    });
    return NextResponse.json({ ok: true, id: created.id, slug: created.slug });
  } catch (e: any) {
    return NextResponse.json({ error: "create-failed", detail: e?.message }, { status: 500 });
  }
}

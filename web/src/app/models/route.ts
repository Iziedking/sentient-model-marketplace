import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "no-user" }, { status: 400 });

  const body = await req.json();
  const {
    name, slug, ownerName, category, tags,
    pricePer1kCents, latencyMs, short,
    storagePath, publicUrl
  } = body;

  try {
    const created = await prisma.modelListing.create({
      data: {
        ownerId: user.id,
        name, slug, ownerName,
        category, tags,
        pricePer1k: pricePer1kCents,
        latencyMs, short,
        storagePath, publicUrl,
      },
    });
    return NextResponse.json({ ok: true, id: created.id });
  } catch (e) {
    return NextResponse.json({ error: "create-failed" }, { status: 500 });
  }
}

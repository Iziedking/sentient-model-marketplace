import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { modelId, stars } = await req.json();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "no-user" }, { status: 400 });

  await prisma.rating.upsert({
    where: { userId_modelId: { userId: user.id, modelId } },
    create: { userId: user.id, modelId, stars },
    update: { stars },
  });

  const agg = await prisma.rating.aggregate({
    where: { modelId },
    _avg: { stars: true },
  });

  await prisma.modelListing.update({
    where: { id: modelId },
    data: { avgRating: agg._avg.stars ?? 0 },
  });

  return NextResponse.json({ ok: true, avg: agg._avg.stars ?? 0 });
}

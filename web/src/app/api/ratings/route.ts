import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = 'nodejs';
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { modelId, stars } = await req.json().catch(() => ({}));
  if (!modelId || typeof stars !== "number" || stars < 1 || stars > 5) {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ error: "no-user" }, { status: 400 });

  await prisma.rating.upsert({
    where: { userId_modelId: { userId: user.id, modelId } },
    create: { userId: user.id, modelId, stars },
    update: { stars },
  });

  return NextResponse.json({ ok: true });
}

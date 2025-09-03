import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ creditsCents: 0, owned: [] });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, creditsCents: true, purchases: { select: { modelId: true } } }
  });

  return NextResponse.json({
    creditsCents: user?.creditsCents ?? 0,
    owned: (user?.purchases ?? []).map(p => p.modelId),
  });
}

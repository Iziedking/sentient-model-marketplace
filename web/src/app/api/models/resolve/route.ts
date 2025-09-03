import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MODELS } from "@/data/models";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "missing-slug" }, { status: 400 });
  }

 
  const found = await prisma.modelListing.findUnique({ where: { slug } });
  if (found) return NextResponse.json({ id: found.id });

  
  const m = MODELS.find((x) => x.slug === slug);
  if (!m) return NextResponse.json({ error: "not-found" }, { status: 404 });


  const systemEmail = "system@sentient.local";
  let system = await prisma.user.findUnique({ where: { email: systemEmail } });
  if (!system) {
    system = await prisma.user.create({
      data: {
        email: systemEmail,
        name: "Sentient System",
        creditsCents: 0,
      },
    });
  }

  const created = await prisma.modelListing.create({
    data: {
      ownerId: system.id,
      name: m.name,
      slug: m.slug,
      ownerName: "Sentient System",
      category: m.category,
      tagsCsv: m.tags.join(","),
      pricePer1k: m.pricePer1k,
      latencyMs: m.latencyMs,
      rating: m.rating,
      short: m.short,
      storagePath: null,
      publicUrl: null,
    },
  });

  return NextResponse.json({ id: created.id });
}

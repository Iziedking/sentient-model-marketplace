import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { presignPut, publicUrlFor } from "@/lib/s3";

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauth" }, { status: 401 });

  const { slug, contentType } = await req.json() as { slug: string; contentType: string };

 
  const ok = ["application/zip", "application/x-zip-compressed", "application/octet-stream", "application/json", "text/plain", "application/gzip", "application/x-tar"];
  if (!ok.includes(contentType)) {
    return NextResponse.json({ error: "bad-content-type" }, { status: 400 });
  }

  const key = `models/${slug}/${Date.now()}`;
  const url = await presignPut(key, contentType);
  const publicUrl = publicUrlFor(key);

  return NextResponse.json({ url, key, publicUrl });
}

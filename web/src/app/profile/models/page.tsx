import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import ModelCard, { ModelCardData } from "@/components/ModelCard";

export const dynamic = "force-dynamic";

export default async function MyModels() {
  const session = await auth();
  if (!session?.user?.email) return notFound();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return notFound();

  const purchases = await prisma.purchase.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      model: {
        select: {
          id: true,
          slug: true,
          name: true,
          ownerName: true,
          category: true,
          tagsCsv: true,
          pricePer1k: true,
          latencyMs: true,
          rating: true,
          short: true,
          totalPurchases: true,
          totalCalls: true,
        },
      },
    },
  });

  const models: ModelCardData[] = purchases
    .map((p) => p.model)
    .filter(Boolean) as any;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 text-white">
      <h1 className="text-2xl font-semibold mb-6">My models</h1>

      {models.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-neutral-300">
          You don’t own any models yet. Go to the{" "}
          <a className="text-[var(--brand)] underline" href="/market">marketplace</a>{" "}
          to unlock one.
        </div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((m) => (
            <ModelCard key={m.id} m={m} />
          ))}
        </section>
      )}
    </main>
  );
}

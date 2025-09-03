import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // your getServerSession wrapper
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/auth/signin");

  const data = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: {
      name: true,
      email: true,
      image: true,
      creditsCents: true,
      totalCalls: true,
      totalSpentCents: true,
      purchases: {
        include: {
          model: {
            select: {
              id: true,
              slug: true,
              name: true,
              ownerName: true,
              category: true,
              tagsCsv: true,
              pricePer1k: true,
              rating: true,
              totalCalls: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 200,
      },
      usageCalls: {
        include: {
          model: { select: { slug: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  if (!data) redirect("/auth/signin");

  const credits = (data.creditsCents ?? 0) / 100;
  const spent = (data.totalSpentCents ?? 0) / 100;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 text-white">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-white/70">{data.name ?? data.email}</p>
        </div>
        <Link
          href="/market"
          className="rounded-xl px-3 py-2 border border-white/15 hover:bg-white/10"
        >
          ← Back to marketplace
        </Link>
      </header>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-white/70">Credits</div>
          <div className="mt-1 text-2xl font-semibold">${credits.toFixed(2)}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-white/70">Total calls</div>
          <div className="mt-1 text-2xl font-semibold">{data.totalCalls}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-white/70">Total spent</div>
          <div className="mt-1 text-2xl font-semibold">${spent.toFixed(2)}</div>
        </div>
      </section>

      {/* Owned models */}
      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-medium">Owned models</h2>
          <Link href="/market" className="text-sm text-[var(--brand)] underline">
            Browse more →
          </Link>
        </div>

        {data.purchases.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-white/80">
            You haven’t purchased any models yet. Visit the{" "}
            <Link className="underline text-[var(--brand)]" href="/market">
              marketplace
            </Link>{" "}
            to unlock one.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.purchases.map((p) => {
              const m = p.model;
              const tags = (m.tagsCsv ?? "")
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .slice(0, 3);
              return (
                <Link
                  key={m.id}
                  href={`/models/${m.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-white/20 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm text-white/60">
                        {m.ownerName ?? "—"} • {m.category}
                      </div>
                      <div className="mt-0.5 font-medium">{m.name}</div>
                    </div>
                    <div className="text-xs text-white/70">{m.rating.toFixed(1)}★</div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-black/30 border border-white/10 px-2 py-0.5 text-xs text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-xs text-white/60">
                    ${m.pricePer1k.toFixed(4)} / 1K • Calls: {m.totalCalls}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Recent usage */}
      <section className="mt-10">
        <h2 className="mb-3 text-lg font-medium">Recent usage</h2>
        {data.usageCalls.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-white/80">
            No usage yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
            <table className="w-full text-sm">
              <thead className="text-white/70">
                <tr className="border-b border-white/10">
                  <th className="px-3 py-2 text-left">Model</th>
                  <th className="px-3 py-2 text-left">Tokens</th>
                  <th className="px-3 py-2 text-left">Cost</th>
                  <th className="px-3 py-2 text-left">When</th>
                </tr>
              </thead>
              <tbody>
                {data.usageCalls.map((u) => (
                  <tr key={u.id} className="border-t border-white/10">
                    <td className="px-3 py-2">
                      <Link className="underline" href={`/models/${u.model.slug}`}>
                        {u.model.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2">{u.tokens.toLocaleString()}</td>
                    <td className="px-3 py-2">${(u.costCents / 100).toFixed(4)}</td>
                    <td className="px-3 py-2">
                      {new Date(u.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

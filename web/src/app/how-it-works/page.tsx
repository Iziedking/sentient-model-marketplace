"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 text-white">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">How it works</h1>
        <p className="mt-2 max-w-3xl text-white/75">
          <span className="font-medium">sentient.market</span> is a simulation of a model marketplace:
          browse models, “buy” (unlock) them with demo credits, and simulate usage calls that deduct
          credits no real billing involved.
        </p>
      </header>

      <div className="grid gap-4">
        {SECTIONS.map((s, i) => (
          <motion.section
            key={s.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="font-medium text-white">{i + 1}) {s.title}</h2>
            <div className="mt-2 space-y-2 text-sm text-white/80">
              {s.points.map((p) => (
                <div key={p} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/40" />
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </main>
  );
}

const SECTIONS = [
  {
    title: "Authentication",
    points: [
      "Sign in with Google or email magic link.",
      "We create a demo profile with $25.00 credits so you can unlock and run models.",
    ],
  },
  {
    title: "Marketplace",
    points: [
      "Use facets (Category, Rating, Price band, Tags) to filter.",
      "Sort by Trending, Most purchased, Most used, Top rated, or New.",
      "Cards show owner, tags, rating, price/1K tokens, and usage stats.",
    ],
  },
  {
    title: "Model detail",
    points: [
      "Each model page lets you Buy / Unlock (free in this sim) and Use (1,000 tokens).",
      "“Use” creates a simulated usage record and deducts credits based on price per 1K tokens.",
      "You’ll see modern toasts confirming success or explaining problems (e.g. insufficient credits).",
    ],
  },
  {
    title: "Profile & My models",
    points: [
      "Profile shows credits, total calls/spend, recent usage, and your owned models.",
      "My models is a filtered view of only the models you’ve unlocked.",
    ],
  },
  {
    title: "Credits",
    points: [
      "Credits are demo currency. Unlocks are free; usage calls decrease credits.",
      "If credits run out, actions are blocked with a clear warning.",
    ],
  },
] as const;

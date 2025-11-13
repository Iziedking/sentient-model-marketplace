"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function Simulate() {
  const [pricePer1k, setPricePer1k] = useState(0.0020);
  const [tokens, setTokens] = useState(2000);
  const [credits, setCredits] = useState(25.0);

  const cost = useMemo(() => Math.max(0.01, (tokens / 1000) * pricePer1k), [tokens, pricePer1k]);
  const remaining = Math.max(0, credits - cost);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-white">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">Revenue Simulator</h1>
        <p className="mt-2 max-w-3xl text-white/75">
          Model your pricing strategy for open-source AGI models. Understand how token-based pricing,
          usage patterns, and sustainable monetization work in a transparent marketplace.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {/* controls */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <h2 className="font-medium">Inputs</h2>

          <div className="mt-4 space-y-4 text-sm">
            <div>
              <label className="mb-1 block text-white/70">Price / 1K tokens</label>
              <input
                type="range"
                min={0.0005}
                max={0.005}
                step={0.0001}
                value={pricePer1k}
                onChange={(e) => setPricePer1k(parseFloat(e.target.value))}
                className="w-full accent-[var(--brand)]"
              />
              <div className="mt-1 text-white/70">${pricePer1k.toFixed(4)} / 1K</div>
            </div>

            <div>
              <label className="mb-1 block text-white/70">Tokens to use</label>
              <input
                type="range"
                min={500}
                max={32000}
                step={500}
                value={tokens}
                onChange={(e) => setTokens(parseInt(e.target.value))}
                className="w-full accent-[var(--brand)]"
              />
              <div className="mt-1 text-white/70">{tokens.toLocaleString()} tokens</div>
            </div>

            <div>
              <label className="mb-1 block text-white/70">Your demo credits</label>
              <input
                type="range"
                min={0}
                max={50}
                step={0.5}
                value={credits}
                onChange={(e) => setCredits(parseFloat(e.target.value))}
                className="w-full accent-[var(--brand)]"
              />
              <div className="mt-1 text-white/70">${credits.toFixed(2)}</div>
            </div>
          </div>
        </motion.section>

        {/* preview */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <h2 className="font-medium">Preview</h2>

          <div className="mt-4 grid gap-3">
            <Row label="Call cost" value={`$${cost.toFixed(4)}`} />
            <Row label="Credits after call" value={`$${remaining.toFixed(2)}`} />
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-[12px] text-white/65">
                <span>Credits</span>
                <span>${remaining.toFixed(2)} / ${credits.toFixed(2)}</span>
              </div>
              <div className="h-2 overflow-hidden rounded bg-black/30">
                <div
                  className="h-full bg-[var(--brand)]"
                  style={{ width: `${Math.max(0, (remaining / Math.max(0.01, credits)) * 100)}%` }}
                />
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white/75">
              💡 Tip: This demonstrates transparent pricing where every API call is billed fairly based on
              tokens consumed—no hidden fees, no opaque algorithms. Fair monetization for open AGI.
            </div>
          </div>
        </motion.section>
      </div>

      {/* concept cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {SIM_SECTIONS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h3 className="font-medium">{s.title}</h3>
            <p className="mt-2 text-sm text-white/80">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2">
      <span className="text-white/70 text-[13px]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

const SIM_SECTIONS = [
  {
    title: "Transparent Pricing",
    body:
      "All models use clear, token-based pricing. No hidden costs or surprise bills—just fair, predictable economics that sustain open-source development.",
  },
  {
    title: "Model Access",
    body:
      "Unlock models with one-time access (free in demo mode). All unlocked models appear in your dashboard with full usage analytics and transparency.",
  },
  {
    title: "Fair Revenue Sharing",
    body:
      "Every API call generates revenue for model builders based on transparent pricing. Your credits decrease, their earnings increase—simple and accountable.",
  },
  {
    title: "For AGI Builders",
    body:
      "Upload your open-source models, set fair pricing, and earn sustainable revenue. Building the future of decentralized AGI development together.",
  },
] as const;

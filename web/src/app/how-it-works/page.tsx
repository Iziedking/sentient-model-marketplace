"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 text-white">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">How It Works</h1>
        <p className="mt-2 max-w-3xl text-white/75">
          The <span className="font-medium">Open AGI Model Marketplace</span> demonstrates how open-source
          AGI models can be distributed transparently in a decentralized ecosystem. Explore models,
          test functionality with demo credits, and understand fair monetization—all without real billing.
        </p>
      </header>

      <div className="mb-8 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
        <h2 className="mb-3 text-xl font-semibold text-white">Our Mission</h2>
        <p className="text-white/80 leading-relaxed">
          Innovation in AGI must be <strong>open and accessible to everyone</strong>. This marketplace
          aligns with the Sentient Foundation's vision to support open-source AGI pioneers and move
          away from closed systems dominated by private companies. We demonstrate how transparent pricing,
          community governance, and fair revenue sharing can sustain the open AGI ecosystem.
        </p>
      </div>

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
            <h2 className="font-medium text-white">{i + 1}. {s.title}</h2>
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

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-3 text-xl font-semibold text-white">Why Open-Source AGI Matters</h2>
        <div className="space-y-3 text-sm text-white/80">
          <p>
            <strong className="text-white">Transparency:</strong> All models feature clear pricing,
            performance metrics, and licensing terms—no hidden costs or opaque algorithms.
          </p>
          <p>
            <strong className="text-white">Decentralization:</strong> Moving control away from centralized
            corporations ensures AGI development serves humanity, not just shareholders.
          </p>
          <p>
            <strong className="text-white">Fair Monetization:</strong> Builders earn sustainable revenue
            while keeping models accessible, creating a viable path for open-source development.
          </p>
          <p>
            <strong className="text-white">Community Governance:</strong> Ratings, reviews, and transparent
            metrics empower the community to guide model quality and ethical standards.
          </p>
        </div>
      </div>
    </main>
  );
}

const SECTIONS = [
  {
    title: "Authentication & Onboarding",
    points: [
      "Sign in with Google OAuth or email magic link—no complex wallet setup required.",
      "Receive $25.00 in demo credits automatically to start exploring models immediately.",
      "Your profile tracks credits, usage history, and owned models for complete transparency.",
    ],
  },
  {
    title: "Discover Open-Source Models",
    points: [
      "Browse curated AGI models across categories: LLM, Vision, Audio, and Tooling.",
      "Filter by Category, Rating, Price, and Tags to find models matching your needs.",
      "Sort by Trending, Most Used, Top Rated, or Newest to discover high-quality models.",
      "View detailed performance metrics: pricing per 1K tokens, latency, usage stats, and community ratings.",
    ],
  },
  {
    title: "Unlock & Test Models",
    points: [
      "Unlock any model with one-time access (free in simulation mode).",
      "Run test API calls simulating 1,000 tokens to evaluate model performance.",
      "Credits are deducted based on transparent pricing: (tokens / 1,000) × price per 1K.",
      "Rate models (1-5 stars) to help the community make informed decisions.",
    ],
  },
  {
    title: "Track Usage & Analytics",
    points: [
      "Your dashboard displays current credit balance, total spending, and call history.",
      "View all models you've unlocked in the 'My Models' section.",
      "Access detailed usage records showing tokens consumed, costs, and timestamps.",
      "Monitor your activity to understand AGI model economics and optimize spending.",
    ],
  },
  {
    title: "Revenue Simulation Tool",
    points: [
      "Model builders can use the simulator to test pricing strategies before listing models.",
      "Adjust price per 1K tokens, token usage per call, and demo credits to see real-time impact.",
      "Preview call costs, remaining credits, and estimated revenue for sustainable monetization.",
      "Understand the economics of open-source AGI without financial risk.",
    ],
  },
  {
    title: "Community & Governance",
    points: [
      "Rate and review models to guide quality standards and build builder reputation.",
      "Leaderboards showcase top-performing models based on community validation.",
      "Transparent metrics ensure accountability and trust in the ecosystem.",
      "Future roadmap includes token-based governance for community decision-making.",
    ],
  },
] as const;

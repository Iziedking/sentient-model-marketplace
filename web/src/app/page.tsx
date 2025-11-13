'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  const signedIn = status === 'authenticated' && !!session?.user;

  return (
    <main className="relative min-h-screen">
     
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="pointer-events-none h-full w-full object-cover opacity-30"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* HERO */}
        <section className="mt-24 md:mt-32 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl leading-[1.05]"
          >
            Open-Source AGI
            <br className="hidden md:block" />
            <span className="block mt-2">For Everyone</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-5 max-w-3xl text-neutral-200"
          >
            A transparent, decentralized marketplace where AGI pioneers list open-source models
            and earn sustainable revenue. Building the future of accessible artificial general intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-10 flex justify-center gap-3"
          >
            <Link
              href="/market"
              className="rounded-xl px-5 py-3 bg-[var(--brand)] text-black font-medium hover:opacity-90 transition"
            >
              Explore Models
            </Link>

            <Link
              href="/how-it-works"
              className="rounded-xl px-5 py-3 border border-white/20 hover:bg-white/10 transition"
            >
              Learn More
            </Link>
          </motion.div>
        </section>

        {/* Quick links */}
        <section className="mx-auto mt-28 max-w-5xl grid gap-6 md:grid-cols-3">
          
          {signedIn ? (
            <Link
              href="/profile"
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/20 hover:bg-white/10 transition"
            >
              <h3 className="mb-2 font-semibold text-white">My Dashboard</h3>
              <p className="text-sm text-neutral-200">
                Track your credits, owned models, and usage analytics.
              </p>
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/20 hover:bg-white/10 transition"
            >
              <h3 className="mb-2 font-semibold text-white">Get Started</h3>
              <p className="text-sm text-neutral-200">
                Start with $25 demo credits. No wallet or signup fees required.
              </p>
            </Link>
          )}

          {/* Card 2 */}
          <Link
            href="/market"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/20 hover:bg-white/10 transition"
          >
            <h3 className="mb-2 font-semibold text-white">Discover AGI Models</h3>
            <p className="text-sm text-neutral-200">
              Browse open-source models with transparent pricing and performance metrics.
            </p>
          </Link>

          {/* Card 3 */}
          <Link
            href="/simulate"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/20 hover:bg-white/10 transition"
          >
            <h3 className="mb-2 font-semibold text-white">Revenue Simulator</h3>
            <p className="text-sm text-neutral-200">
              Model your pricing strategy and estimate sustainable earnings.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}

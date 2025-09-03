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
            Open AGI
            <br className="hidden md:block" />
            <span className="block mt-2">Aligned to Humanity</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-5 max-w-3xl text-neutral-200"
          >
            A simulation marketplace where builders list models and earn from usage.
            Transparent, local-friendly access with flexible monetization.
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
              Enter Marketplace
            </Link>

            <Link
              href="/how-it-works"
              className="rounded-xl px-5 py-3 border border-white/20 hover:bg-white/10 transition"
            >
              How it works
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
              <h3 className="mb-2 font-semibold text-white">My profile</h3>
              <p className="text-sm text-neutral-200">
                View credits, owned models, and recent usage.
              </p>
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/20 hover:bg-white/10 transition"
            >
              <h3 className="mb-2 font-semibold text-white">Sign in</h3>
              <p className="text-sm text-neutral-200">
                Use Google or email magic link. No wallet needed for testing.
              </p>
            </Link>
          )}

          {/* Card 2 */}
          <Link
            href="/market"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/20 hover:bg-white/10 transition"
          >
            <h3 className="mb-2 font-semibold text-white">Browse models</h3>
            <p className="text-sm text-neutral-200">
              Discover community models with transparent terms.
            </p>
          </Link>

          {/* Card 3 */}
          <Link
            href="/simulate"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/20 hover:bg-white/10 transition"
          >
            <h3 className="mb-2 font-semibold text-white">Simulate monetization</h3>
            <p className="text-sm text-neutral-200">
              Track calls, see revenue splits, control permissions.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}

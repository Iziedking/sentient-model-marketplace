"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const { data: me } = useSWR(session ? "/api/me" : null, fetcher);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // not signed in
  if (status !== "authenticated")
    return (
      <button
        onClick={() => signIn("google")}
        className="rounded-xl px-3 py-1.5 border border-white/20 hover:bg-white/10 transition"
      >
        Sign in
      </button>
    );

  const user = session.user!;

  return (
    <div className="flex items-center gap-3">
      {/* credits pill */}
      <span className="rounded-full bg-black/40 border border-white/10 px-3 py-1 text-sm text-white/90">
        Credits: ${((me?.creditsCents ?? 0) / 100).toFixed(2)}
      </span>

      {/* avatar dropdown */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="h-8 w-8 rounded-full overflow-hidden border border-white/15"
          title={user.name ?? user.email ?? "Profile"}
        >
          {user.image ? (
            <Image src={user.image} alt="avatar" width={32} height={32} />
          ) : (
            <div className="grid h-full w-full place-items-center text-sm">🙂</div>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-black/80 backdrop-blur shadow-lg">
            <div className="px-3 py-2 border-b border-white/10">
              <div className="text-sm font-medium text-white line-clamp-1">
                {user.name ?? "User"}
              </div>
              <div className="text-xs text-white/70 line-clamp-1">
                {user.email ?? ""}
              </div>
            </div>
            <div className="p-1">
              <a
                href="/profile"
                className="block rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Profile
              </a>
              <a
                href="/profile/models"
                className="block rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                My models
              </a>
              <button
                onClick={() => signOut()}
                className="mt-1 block w-full rounded-md px-3 py-2 text-left text-sm text-red-300 hover:bg-white/10"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

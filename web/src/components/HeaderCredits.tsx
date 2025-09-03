"use client";
import useSWR from "swr";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function HeaderCredits() {
  const { data } = useSWR("/api/me", fetcher);
  const cents = data?.creditsCents ?? 0;
  const dollars = (cents / 100).toFixed(2);
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
      <span className="opacity-80">Credits:</span> ${dollars}
    </span>
  );
}

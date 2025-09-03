import Link from "next/link";
import AuthButtons from "@/components/AuthButtons";

export default function Header() {
  return (
    <header className="relative z-20 mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
      <Link href="/" className="inline-flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm bg-[var(--brand)]" />
        <span className="font-semibold">sentient.market</span>
      </Link>

      <AuthButtons />
    </header>
  );
}

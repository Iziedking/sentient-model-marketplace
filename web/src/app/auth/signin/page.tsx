'use client';

import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | string>(null);

  const isValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    [email]
  );

  const origin =
    typeof window !== "undefined" ? window.location.origin : process.env.NEXTAUTH_URL || "";

  const handleSend = async () => {
    if (!isValid || sending) return;
    setSending(true);
    setSent(null);

    const res = await signIn("email", {
      email,
      redirect: true,
      callbackUrl: `${origin}/`,
    });

    setSending(false);

    if (!res || (res as any)?.error) {
      setSent("We couldn't send the link. Please try again.");
    } else {
      setSent(`Verification link sent to ${email}. Check your inbox.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-[420px] rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
        <h2 className="mb-4 text-xl font-semibold">Sign in</h2>

        <button
          onClick={() =>
            signIn("google", { callbackUrl: `${origin}/`, redirect: true })
          }
          className="w-full flex items-center justify-center gap-3 rounded-xl px-4 py-3 bg-[var(--brand)]"
        >
         
          <span>Continue with Google</span>
        </button>

        <div className="my-4 h-px bg-white/10" />

        <label className="block text-sm mb-2">Email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@domain.com"
          className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 outline-none"
        />

        <button
          onClick={handleSend}
          disabled={!isValid || sending}
          className={`mt-3 w-full rounded-xl px-4 py-3 border border-white/10
            ${isValid ? "bg-[var(--brand)]" : "bg-white/10 cursor-not-allowed"}`}
        >
          {sending ? "Sending..." : "Send verification link"}
        </button>

        {sent && <p className="mt-3 text-sm text-neutral-200">{sent}</p>}
      </div>
    </div>
  );
}

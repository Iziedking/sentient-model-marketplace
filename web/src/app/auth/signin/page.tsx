'use client';

import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | string>(null);

  // very light email validation for button state
  const isValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    [email]
  );

  const handleSend = async () => {
    if (!isValid || sending) return;
    setSending(true);
    setSent(null);

    const res = await signIn("email", {
      email,
      redirect: false,
      callbackUrl: "/",
    });

    setSending(false);

    if (res?.ok) {
      setSent(`Verification link sent to ${email}. Check your inbox.`);
    } else {
      setSent("We couldn't send the link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-[420px] rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
        <h2 className="mb-4 text-xl font-semibold">Sign in</h2>

        
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 rounded-xl px-4 py-3 bg-[var(--brand)]"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C36.09 2.49 30.41 0 24 0 14.82 0 6.72 5.48 2.7 13.44l7.98 6.19C12.42 13.21 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.1 24.5c0-1.64-.15-3.22-.42-4.75H24v9.05h12.55c-.54 2.89-2.18 5.34-4.63 6.99l7.44 5.78c4.34-4 6.84-9.91 6.84-16.07z"
            />
            <path
              fill="#FBBC05"
              d="M10.68 28.82c-.48-1.44-.75-2.97-.75-4.57s.27-3.13.75-4.57l-7.98-6.19C.94 16.9 0 20.35 0 24c0 3.65.94 7.1 2.7 10.51l7.98-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.41 0 11.79-2.12 15.71-5.77l-7.44-5.78c-2.07 1.39-4.74 2.2-8.27 2.2-6.26 0-11.58-3.71-13.32-8.93l-7.98 6.19C6.72 42.52 14.82 48 24 48z"
            />
          </svg>
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
            ${isValid ? "bg-[var(--brand)]" : "bg-white/10 cursor-not-allowed"}
          `}
        >
          {sending ? "Sending..." : "Send verification link"}
        </button>

        {sent && (
          <p className="mt-3 text-sm text-neutral-200">{sent}</p>
        )}
      </div>
    </div>
  );
}

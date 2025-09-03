"use client";

import { createContext, use, useCallback, useEffect, useRef, useState } from "react";

type ToastKind = "ok" | "err" | "warn";
type Toast = { id: string; kind: ToastKind; msg: string };

const Ctx = createContext<{ push: (t: Omit<Toast, "id">) => void } | null>(null);

export function useToast() {
  const ctx = use(Ctx);
  if (!ctx) throw new Error("ToastProvider missing");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = `${++idRef.current}`;
    setItems((all) => [...all, { ...t, id }]);
    // auto-dismiss
    setTimeout(() => setItems((all) => all.filter((x) => x.id !== id)), 3500);
  }, []);

  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[70] flex w-[360px] max-w-[92vw] flex-col gap-2">
        {items.map((t) => (
          <ToastItem key={t.id} kind={t.kind} msg={t.msg} />
        ))}
      </div>
    </Ctx.Provider>
  );
}

function ToastItem({ kind, msg }: { kind: ToastKind; msg: string }) {
  const palette =
    kind === "ok"
      ? "bg-emerald-600/90 border-emerald-500"
      : kind === "warn"
      ? "bg-amber-600/90 border-amber-500"
      : "bg-rose-600/90 border-rose-500";

  const Icon = kind === "ok" ? CheckIcon : kind === "warn" ? WarnIcon : XIcon;

  return (
    <div
      className={`pointer-events-auto grid grid-cols-[20px_1fr_18px] items-center gap-3 rounded-xl border px-3 py-2 text-white shadow-lg backdrop-blur
                  animate-[toastIn_.24s_ease-out] ${palette}`}
      style={{
        // keyframes for a subtle slide-in
        animationFillMode: "both",
      }}
    >
      <Icon />
      <div className="text-sm leading-5">{msg}</div>
      <div className="h-4 w-4 opacity-50">{/* space for close if you want later */}</div>
      <style jsx global>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90">
      <path fill="currentColor" d="M9.2 16.2L4.9 11.9l-1.4 1.4l5.7 5.7L20.5 7.7l-1.4-1.4z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90">
      <path fill="currentColor" d="M18.3 5.7L12 12l6.3 6.3l-1.4 1.4L10.6 13.4L4.3 19.7L2.9 18.3L9.2 12L2.9 5.7L4.3 4.3l6.3 6.3l6.3-6.3z" />
    </svg>
  );
}
function WarnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90">
      <path fill="currentColor" d="M1 21h22L12 2L1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  );
}

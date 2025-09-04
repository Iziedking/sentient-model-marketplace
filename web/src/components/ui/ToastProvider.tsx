"use client";

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";


type Variant = "success" | "error" | "warn" | "info";


type LegacyToastInput =
  | { kind: "ok"; msg: string; title?: string }
  | { kind: "err"; msg: string; title?: string }
  | { kind: "warn"; msg: string; title?: string };


type ModernToastInput = {
  type: Variant;
  msg: string;
  title?: string;
};

type ToastInput = LegacyToastInput | ModernToastInput;

type Toast = { id: string; variant: Variant; title?: string; msg: string };

const Ctx = createContext<{ push: (t: ToastInput) => void } | null>(null);

export function useToast() {
  const ctx = use(Ctx);
  if (!ctx) throw new Error("ToastProvider missing");
  return ctx;
}


function normalize(input: ToastInput): Omit<Toast, "id"> {
  if ("type" in input) {
    return { variant: input.type, title: input.title, msg: input.msg };
  }

  const variant: Variant =
    input.kind === "ok" ? "success" : input.kind === "err" ? "error" : "warn";
  return { variant, title: input.title, msg: input.msg };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const push = useCallback((t: ToastInput) => {
    const data = normalize(t);
    const id = `${++idRef.current}`;
    setItems((all) => [...all, { ...data, id }]);
   
    setTimeout(
      () => setItems((all) => all.filter((x) => x.id !== id)),
      3500
    );
  }, []);

  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[70] flex w-[360px] max-w-[92vw] flex-col gap-2">
        {items.map((t) => (
          <ToastItem key={t.id} variant={t.variant} title={t.title} msg={t.msg} />
        ))}
      </div>
    </Ctx.Provider>
  );
}

function ToastItem({
  variant,
  title,
  msg,
}: {
  variant: Variant;
  title?: string;
  msg: string;
}) {
  const palette =
    variant === "success"
      ? "bg-emerald-600/90 border-emerald-500"
      : variant === "warn"
      ? "bg-amber-600/90 border-amber-500"
      : variant === "info"
      ? "bg-sky-600/90 border-sky-500"
      : "bg-rose-600/90 border-rose-500";

  const Icon =
    variant === "success"
      ? CheckIcon
      : variant === "warn"
      ? WarnIcon
      : variant === "info"
      ? InfoIcon
      : XIcon;

  return (
    <div
      className={`pointer-events-auto grid grid-cols-[20px_1fr_18px] items-center gap-3 rounded-xl border px-3 py-2 text-white shadow-lg backdrop-blur
                  animate-[toastIn_.24s_ease-out] ${palette}`}
      style={{ animationFillMode: "both" }}
      role="status"
      aria-live="polite"
    >
      <Icon />
      <div className="min-w-0">
        {title && <div className="text-sm font-semibold leading-5">{title}</div>}
        <div className="text-sm leading-5 opacity-95">{msg}</div>
      </div>
      <div className="h-4 w-4 opacity-50" />
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

/* Icons */
function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90">
      <path
        fill="currentColor"
        d="M9.2 16.2L4.9 11.9l-1.4 1.4l5.7 5.7L20.5 7.7l-1.4-1.4z"
      />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90">
      <path
        fill="currentColor"
        d="M18.3 5.7L12 12l6.3 6.3l-1.4 1.4L10.6 13.4L4.3 19.7L2.9 18.3L9.2 12L2.9 5.7L4.3 4.3l6.3 6.3l6.3-6.3z"
      />
    </svg>
  );
}
function WarnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90">
      <path
        fill="currentColor"
        d="M1 21h22L12 2L1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
      />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20m1 15h-2v-6h2zm0-8h-2V7h2z"
      />
    </svg>
  );
}

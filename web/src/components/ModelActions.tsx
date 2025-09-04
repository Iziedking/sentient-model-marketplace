"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export function BuyButton({ id, slug }: { id?: string; slug?: string }) {
  const [busy, setBusy] = useState(false);
  const { push } = useToast();

  async function onBuy() {
    setBusy(true);
    try {
      const r = await fetch("/api/trade/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelId: id, slug }),
      });
      const j = await r.json().catch(() => ({} as any));

      if (!r.ok) {
        if (j?.error === "insufficient-credits") {
          push({
            type: "warn",
            title: "Not enough credits",
            msg: "Please top up to unlock this model.",
          });
        } else if (j?.error === "model-not-found") {
          push({
            type: "error",
            title: "Model not found",
            msg: "This model isn’t available.",
          });
        } else {
          push({
            type: "error",
            title: "Purchase failed",
            msg: "Something went wrong. Try again.",
          });
        }
        return;
      }

      if (j?.alreadyOwned) {
        push({
          type: "info",
          title: "Already unlocked",
          msg: "You already own access to this model.",
        });
      } else {
        push({
          type: "success",
          title: "Unlocked!",
          msg: "You can run calls immediately.",
        });
      }
    } catch {
      push({
        type: "error",
        title: "Network error",
        msg: "Couldn’t reach server.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={onBuy}
      disabled={busy}
      className={`rounded-xl px-4 py-2 font-medium ${
        busy ? "bg-white/10" : "bg-[var(--brand)] text-black hover:opacity-90"
      } transition`}
    >
      {busy ? "Processing…" : "Buy / Unlock"}
    </button>
  );
}

export function UseButton({
  id,
  slug,
  tokens = 1000,
}: {
  id?: string;
  slug?: string;
  tokens?: number;
}) {
  const [busy, setBusy] = useState(false);
  const { push } = useToast();

  async function onUse() {
    setBusy(true);
    try {
      const r = await fetch("/api/usage/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelId: id, slug, tokens }),
      });
      const j = await r.json().catch(() => ({} as any));

      if (!r.ok) {
        if (j?.error === "insufficient-credits") {
          push({
            type: "warn",
            title: "Insufficient credits",
            msg: "Add credits to run this call.",
          });
        } else if (j?.error === "model-not-found") {
          push({
            type: "error",
            title: "Model not found",
            msg: "This model isn’t available.",
          });
        } else {
          push({
            type: "error",
            title: "Call failed",
            msg: "Try again in a moment.",
          });
        }
        return;
      }

      const cost =
        typeof j?.costCents === "number"
          ? (j.costCents / 100).toFixed(2)
          : "—";
      push({
        type: "success",
        title: "Call complete",
        msg: `Charged $${cost} (${tokens.toLocaleString()} tokens)`,
      });
    } catch {
      push({
        type: "error",
        title: "Network error",
        msg: "Couldn’t reach server.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={onUse}
      disabled={busy}
      className={`rounded-xl px-4 py-2 border border-white/20 text-white/90 ${
        busy ? "opacity-70" : "hover:bg-white/10"
      } transition`}
    >
      {busy ? "Running…" : `Use (${tokens.toLocaleString()} tokens)`}
    </button>
  );
}

"use client";

async function buy(modelId: string) {
  const r = await fetch("/api/trade/buy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modelId }),
  });
  const j = await r.json().catch(()=> ({}));
  if (!r.ok) alert(`Purchase failed: ${j.error ?? r.status}`);
  else alert("Unlocked! 🎉  (Check your credits and 'Owned' badge)");
}

async function callModel(modelId: string, tokens = 1000) {
  const r = await fetch("/api/usage/call", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modelId, tokens }),
  });
  const j = await r.json();
  if (!r.ok) alert(`Call failed: ${j.error ?? r.status}`);
  else alert(`Charged $${(j.costCents / 100).toFixed(2)} for this call`);
}

export default function ModelActions({ id }: { id: string }) {
  return (
    <div className="flex gap-3">
      <button onClick={() => buy(id)} className="rounded-xl px-4 py-2 bg-brand text-white">Buy / Unlock</button>
      <button onClick={() => callModel(id, 1000)} className="rounded-xl px-4 py-2 border border-border">Use (1k tokens)</button>
    </div>
  );
}

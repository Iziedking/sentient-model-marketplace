'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitModelPage() {
  const r = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", slug: "", category: "LLM", tags: "", pricePer1k: "0.0010", short: ""
  });
  const on = (k: string, v: string) => setForm(s => ({ ...s, [k]: v }));

  async function uploadIfAny() {
    if (!file) return { storagePath: null, publicUrl: null };
    const res = await fetch("/api/models/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: form.slug, contentType: file.type })
    });
    if (!res.ok) {
      alert("Failed to create upload URL");
      return { storagePath: null, publicUrl: null };
    }
    const { url, key, publicUrl } = await res.json();

    const put = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file
    });
    if (!put.ok) {
      alert("Upload failed");
      return { storagePath: null, publicUrl: null };
    }
    return { storagePath: key, publicUrl };
  }

  async function save() {
    setSaving(true);
    const { storagePath, publicUrl } = await uploadIfAny();
    const resp = await fetch("/api/models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, storagePath, publicUrl })
    });
    setSaving(false);
    if (resp.ok) r.push(`/model/${form.slug}`);
    else alert("Unable to create model");
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-10 text-white">
      <h1 className="text-2xl font-semibold">List a model</h1>
      <div className="mt-6 grid gap-4">
        <input className="rounded-xl px-4 py-3 bg-black/40 border border-white/10"
          placeholder="Name" value={form.name} onChange={e=>on("name", e.target.value)} />
        <input className="rounded-xl px-4 py-3 bg-black/40 border border-white/10"
          placeholder="Slug (unique)" value={form.slug} onChange={e=>on("slug", e.target.value)} />
        <select className="rounded-xl px-4 py-3 bg-black/40 border border-white/10"
          value={form.category} onChange={e=>on("category", e.target.value)}>
          <option>LLM</option><option>Vision</option><option>Audio</option><option>Tooling</option>
        </select>
        <input className="rounded-xl px-4 py-3 bg-black/40 border border-white/10"
          placeholder="tags (comma separated)" value={form.tags} onChange={e=>on("tags", e.target.value)} />
        <input className="rounded-xl px-4 py-3 bg-black/40 border border-white/10"
          placeholder="pricePer1k (e.g., 0.0010)" value={form.pricePer1k} onChange={e=>on("pricePer1k", e.target.value)} />
        <textarea rows={4} className="rounded-xl px-4 py-3 bg-black/40 border border-white/10"
          placeholder="Short description" value={form.short} onChange={e=>on("short", e.target.value)} />
        <input type="file" onChange={e=>setFile(e.target.files?.[0] ?? null)}
          className="rounded-xl px-4 py-3 bg-black/40 border border-white/10" />
        <button disabled={saving} onClick={save} className="rounded-xl px-4 py-3 bg-[var(--brand)]">
          {saving ? "Saving..." : "Create"}
        </button>
      </div>
    </main>
  );
}

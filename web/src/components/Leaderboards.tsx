"use client";
import useSWR from "swr";

const fetcher = (u:string)=>fetch(u).then(r=>r.json());

export default function Leaderboards() {
  const { data } = useSWR("/api/market/stats", fetcher);
  if (!data) return null;

  const Section = ({title, list}:{title:string; list:any[]}) => (
    <section>
      <h3 className="mb-3 text-white font-semibold">{title}</h3>
      <div className="grid md:grid-cols-4 gap-4">
        {list.map((m)=>(
          <div key={m.id} className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
            <div className="text-sm opacity-80">{m.ownerName}</div>
            <div className="font-semibold">{m.name}</div>
            <div className="text-xs mt-1">
              ${ (m.pricePer1k/100).toFixed(2) } / 1k • {m.totalCalls} calls • ⭐ {m.avgRating.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-10">
      <Section title="Trending (by calls)" list={data.trending}/>
      <Section title="Most purchased" list={data.mostPurchased}/>
      <Section title="Top rated" list={data.topRated}/>
    </div>
  )
}

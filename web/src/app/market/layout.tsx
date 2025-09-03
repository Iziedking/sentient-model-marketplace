import HeaderCredits from "@/components/HeaderCredits";

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Marketplace</h1>
        <HeaderCredits />
      </div>
      {children}
    </div>
  );
}

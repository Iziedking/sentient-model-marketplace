"use client";

type Props = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};
export function TagChip({ label, active, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1 text-xs transition-colors",
        active
          ? "bg-white/20 border-white/20 text-white"
          : "bg-black/30 border-white/10 text-neutral-300 hover:border-white/20",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

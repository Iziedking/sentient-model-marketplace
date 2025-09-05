'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

type Mode = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
  
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-neutral-300">
        <span className="opacity-70">Theme</span>
      </div>
    );
  }

  const current: Mode =
    (theme as Mode) ?? (systemTheme as Mode) ?? 'system';

  const Item = ({
    value,
    label,
  }: {
    value: Mode;
    label: string;
  }) => {
    const active = current === value;
    return (
      <button
        type="button"
        aria-pressed={active}
        onClick={() => setTheme(value)}
        className={[
          'rounded-full px-2.5 py-1 text-[11px] md:text-xs transition',
          active
            ? 'bg-white/10 text-white'
            : 'text-neutral-300 hover:text-white',
        ].join(' ')}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className="
        inline-flex items-center gap-1 rounded-full border border-white/10
        bg-white/5 px-1.5 py-1 shadow-sm backdrop-blur
      "
      role="group"
      aria-label="Theme"
    >
      <span className="hidden md:inline text-[11px] text-neutral-400 pl-1 pr-1.5">
        Theme:
      </span>
      <Item value="light" label="Light" />
      <Item value="dark" label="Dark" />
      <Item value="system" label="System" />
    </div>
  );
}

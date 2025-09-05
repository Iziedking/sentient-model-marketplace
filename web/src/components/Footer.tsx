'use client';

import ThemeToggle from './ThemeToggle';

function XIcon({ className = 'h-4 w-4' }: { className?: string }) {

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.9 3H15.8L11.7 8.3 7.4 3H3.5l6.4 8.4L3 21h3.1l4.5-6 4.6 6h3.9l-6.9-9.1L18.9 3Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div
        className="
          mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-6
          text-sm text-neutral-400 md:flex-row md:justify-between
        "
      >
       
        <div className="order-2 md:order-1 text-center md:text-left">
          © {new Date().getFullYear()} <span className="text-neutral-300">sentient.market</span>
          <span className="opacity-60"> (sim)</span>
        </div>

       
        <div className="order-3 md:order-2 flex items-center gap-3">
          <a
            href="https://x.com/Iziedking"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on X (Twitter)"
            className="
              inline-flex items-center gap-2 rounded-full border border-white/10
              bg-white/5 px-3 py-1.5 text-neutral-300 hover:text-white
              hover:border-white/20 hover:bg-white/10 transition
            "
          >
            <XIcon />
            <span className="text-[13px] hidden sm:inline">Support on X</span>
          </a>
        </div>


        <div className="order-1 md:order-3">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

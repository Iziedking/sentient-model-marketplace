/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        bg: "var(--background)",
        fg: "var(--foreground)",
        panel: "var(--panel)",
        panel2: "var(--panel-2)",
        muted: "var(--muted)",
        border: "var(--border)",
        dim: "var(--text-dim)",
      },
      borderRadius: {
        xl2: "14px",
      },
    },
  },
  plugins: [],
};

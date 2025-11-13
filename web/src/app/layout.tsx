import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Open AGI Model Marketplace",
  description: "Transparent, decentralized marketplace for open-source AGI models. Discover, test, and monetize AGI models aligned with the Sentient Foundation's mission for accessible artificial general intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

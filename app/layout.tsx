import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import { PageShell } from "../components/PageShell";

export const metadata: Metadata = {
  title: "Timeless Trends | Luxury Hair & Cosmetics",
  description: "Luxury hair and cosmetics storefront built with Next.js 16.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <PageShell>{children}</PageShell>
        </AppProvider>
      </body>
    </html>
  );
}

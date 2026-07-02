import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Industrial Synthesis | Enterprise AI Consulting",
  description: "Eliminating industrial cost leakage with deterministic AI automation workflows and unified telemetry layers across ASEAN operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
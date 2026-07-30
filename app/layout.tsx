import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteName = "FitForge";
const description = "Track strength, master nutrition, and build your best body with FitForge.";
const metadataBase = new URL(process.env.NEXTAUTH_URL?.trim() || "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  keywords: ["fitness tracker", "workout tracker", "nutrition tracker", "macro tracker", "exercise library"],
  openGraph: {
    title: siteName,
    description,
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteName,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

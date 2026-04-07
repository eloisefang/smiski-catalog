import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteNav } from "@/src/components/SiteNav";
import { createClient } from "@/src/lib/supabase/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Smiski Catalog",
    template: "%s · Smiski Catalog",
  },
  description:
    "Browse Smiski blind boxes and keychains—search, filter, and open each figure’s detail page.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#faf8f3] font-sans text-[#3d3a36] antialiased">
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[url('/bg.svg')] bg-repeat bg-[length:200px_200px]"
          aria-hidden
        />
        <SiteNav initialUser={user} />
        <main className="relative flex-1">{children}</main>
      </body>
    </html>
  );
}

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
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[url('/bg.svg')] bg-repeat bg-[length:200px_200px]" />
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-smiski-light/40 blur-3xl" />
          <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-smiski-light/55 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-stone-100/80 blur-3xl" />
        </div>
        <SiteNav initialUser={user} />
        <main className="relative flex-1">{children}</main>
      </body>
    </html>
  );
}

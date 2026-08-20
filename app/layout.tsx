import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "kindsites.ru";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "KIND SITES — сайты с характером",
    description: "Небольшая digital-студия Дарьи Март. Красивые и понятные сайты для небольшого бизнеса.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "KIND SITES — сайты с характером",
      description: "Выразительные сайты для небольшого бизнеса, экспертов и брендов.",
      images: [{ url: "/og.png", width: 1728, height: 906, alt: "KIND SITES — сайты с характером" }],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

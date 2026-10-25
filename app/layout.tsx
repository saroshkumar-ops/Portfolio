import type { Metadata, Viewport } from "next";
import ScrollProvider from "@/components/ScrollProvider";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./luke.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sarosh Kumar — AI Systems & Backend Engineer",
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Portfolio of Sarosh Kumar — Computer Science undergraduate at KLE Tech specializing in deep learning, audio AI, and low-latency streaming inference pipelines.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Sarosh Kumar — AI Systems & Backend Engineer",
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [{ url: "/sarosh.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}

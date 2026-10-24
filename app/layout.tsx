import type { Metadata, Viewport } from "next";
import { inter, jetbrainsMono } from "@/lib/fonts";
import ScrollProvider from "@/components/ScrollProvider";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Software Engineer & AI Systems Architect`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Portfolio of Sarosh Kumar — Software engineer specializing in AI systems, autonomous control planes, high-performance backends, and creative interactive experiences.",
  keywords: [
    "Sarosh Kumar",
    "Software Engineer",
    "AI Systems",
    "System Architecture",
    "Autonomous Agents",
    "FastAPI",
    "Next.js",
    "Full-Stack Development",
    "Computer Vision",
    "Creative Developer",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${SITE_NAME} — Software Engineer & AI Systems Architect`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [{ url: "/sarosh.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Software Engineer & AI Systems Architect`,
    description: SITE_DESCRIPTION,
    images: ["/sarosh.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper font-sans selection:bg-accent-mint selection:text-black">
        <GrainOverlay />
        <CustomCursor />
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}

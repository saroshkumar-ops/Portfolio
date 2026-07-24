import type { Metadata } from "next";
import { archivo, instrumentSerif } from "@/lib/fonts";
import ScrollProvider from "@/components/ScrollProvider";
import GrainOverlay from "@/components/GrainOverlay";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Creative portfolio site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper font-sans">
        <GrainOverlay />
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}

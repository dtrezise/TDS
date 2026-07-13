import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dtrezise.github.io/TDS/"),
  title: "TDS — The Evidence Archive",
  description: "An evidence-first, explicitly critical archive of Donald Trump’s record, the movement around him, and the contradiction between Trumpism and Christian teaching.",
  openGraph: {
    title: "TDS — The Evidence Archive",
    description: "The derangement is denying the record.",
    type: "website",
    images: [
      {
        url: "https://dtrezise.github.io/TDS/og.png",
        width: 1734,
        height: 907,
        alt: "TDS — The Evidence Archive. The derangement is denying the record.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TDS — The Evidence Archive",
    description: "The derangement is denying the record.",
    images: ["https://dtrezise.github.io/TDS/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

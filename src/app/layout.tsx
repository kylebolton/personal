import type { Metadata } from "next";
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kyle Bolton | UI Engineer",
  description:
    "Kyle Bolton, UI engineer, fintech enthusiast, and crypto advocate based in London, UK.",
  keywords: [
    "Kyle Bolton",
    "UI Engineer",
    "Fintech",
    "Crypto",
    "London",
    "Developer",
    "Frontend",
  ],
  authors: [{ name: "Kyle Bolton" }],
  creator: "Kyle Bolton",
  publisher: "Kyle Bolton",
  robots: "index, follow",
  metadataBase: new URL("https://kylebolton.me"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://kylebolton.me",
    title: "Kyle Bolton | UI Engineer",
    description:
      "Kyle Bolton, UI engineer, fintech enthusiast, and crypto advocate based in London, UK.",
    siteName: "Kyle Bolton",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kyle Bolton - UI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyle Bolton | UI Engineer",
    description:
      "Personal website of Kyle Bolton, UI engineer, fintech enthusiast, and crypto advocate based in London, UK.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}

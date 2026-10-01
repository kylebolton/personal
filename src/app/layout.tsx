import type { Metadata, Viewport } from "next";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const description =
  "Kyle Bolton, senior engineer in credit and lending at Handelsbanken. Over 10 years in finance, fintech and startups. Building liquyn.com. Based in London, UK.";

export const metadata: Metadata = {
  title: {
    default: "Kyle Bolton | Senior Engineer, Credit & Lending",
    template: "%s | Kyle Bolton",
  },
  description,
  keywords: [
    "Kyle Bolton",
    "Senior Engineer",
    "Credit",
    "Lending",
    "Handelsbanken",
    "Fintech",
    "Liquyn",
    "London",
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
    title: "Kyle Bolton | Senior Engineer, Credit & Lending",
    description,
    siteName: "Kyle Bolton",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kyle Bolton",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyle Bolton | Senior Engineer, Credit & Lending",
    description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

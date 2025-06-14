import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/session-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kenya BnB - Book Amazing Places",
    template: "%s | Kenya BnB",
  },
  description:
    "Discover and book unique accommodations across Kenya. From safari lodges to beach houses, find your perfect stay.",
  keywords: [
    "Kenya",
    "accommodation",
    "booking",
    "BnB",
    "vacation rental",
    "safari",
    "beach house",
  ],
  authors: [{ name: "Kenya BnB Team" }],
  creator: "Kenya BnB",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://kenya-bnb.com",
    title: "Kenya BnB - Book Amazing Places",
    description: "Discover and book unique accommodations across Kenya",
    siteName: "Kenya BnB",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kenya BnB - Beautiful accommodations across Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenya BnB - Book Amazing Places",
    description: "Discover and book unique accommodations across Kenya",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

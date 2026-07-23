import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.krishnainfosys.com"),
  title: {
    default: "Krishna Infosys | ELV Turnkey Solutions",
    template: "%s | Krishna Infosys",
  },
  description:
    "Krishna Infosys delivers end-to-end ELV turnkey solutions across security, communication, networking, audio visual, automation and safety systems.",
  applicationName: "Krishna Infosys",
  keywords: [
    "Krishna Infosys",
    "ELV Solutions",
    "ELV Turnkey Solutions",
    "CCTV Solutions",
    "Access Control",
    "Fire Alarm",
    "Structured Cabling",
    "Networking Solutions",
    "Building Automation",
    "Ahmedabad",
    "Gujarat",
  ],
  authors: [{ name: "Krishna Infosys" }],
  creator: "Krishna Infosys",
  publisher: "Krishna Infosys",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Krishna Infosys",
    title: "Krishna Infosys | ELV Turnkey Solutions",
    description:
      "End-to-end ELV turnkey solutions engineered for security, communication, networking, automation and safety.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Infosys | ELV Turnkey Solutions",
    description:
      "End-to-end ELV turnkey solutions engineered for security, communication, networking, automation and safety.",
  },
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

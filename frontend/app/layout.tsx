import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import ChatWidget from "./components/chat-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.restlessmoonstudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Restless Moon Studio | Apps, SaaS & Software Development",

  description:
    "Restless Moon Studio builds apps, SaaS products, and custom software solutions with thoughtful design, scalable engineering, and AI-powered capabilities.",

  applicationName: "Restless Moon Studio",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Restless Moon Studio",
    title: "Restless Moon Studio | Apps, SaaS & Software Development",
    description:
      "We build thoughtful software that solves real problems. Explore our apps, SaaS products, and custom web, mobile, and AI-powered solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Restless Moon Studio — Turning Ideas Into Real Products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Restless Moon Studio | Software & AI Solutions",
    description:
      "From idea to launch. Explore our apps and SaaS products, or work with us to create custom software and AI-powered solutions.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const apiHost = process.env.API_HOST || "";
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <ChatWidget url={apiHost} />
        <Footer />
      </body>
    </html>
  );
}

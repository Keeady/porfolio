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

export const metadata: Metadata = {
  title: "Restless Moon Studio | Apps, SaaS & Custom Software Development",
  description:
    "Restless Moon Studio builds apps, SaaS products, and custom software solutions with thoughtful design, scalable engineering, and AI-powered capabilities.",
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

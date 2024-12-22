import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anony - Anonymous Chat & Social App",
  description: "Anony: A secure and anonymous platform for chatting, sharing ideas, and connecting with like-minded people. Join the Anony community today!",
  keywords: ["Anony", "Anonymous Chat", "Secure Messaging", "Private Social Network", "Anonymous Platform"],
  openGraph: {
    title: "Anony - Anonymous Chat & Social App",
    description: "Connect anonymously and securely on Anony. Share your thoughts and ideas without revealing your identity.",
    url: process.env.VERCEL_URL,
    siteName: "Anony",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anony - Anonymous Chat & Social App",
    description: "Connect anonymously and securely on Anony. Share your thoughts and ideas without revealing your identity.",
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F3F4F6]`} 
      >
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

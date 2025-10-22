import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

const robototSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robototMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food AI Assistent",
  description: "Get help to create your mouthly food plans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-bt">
        <body
          className={`${robototSans.variable} ${robototMono.variable} antialiased bg-white text-slate-800 font-mono`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

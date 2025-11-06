import Navbar from "@/components/navbar";
import QueryProvider from "@/components/react-query-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

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
    <ClerkProvider localization={ptBR}>
      <QueryProvider>
        <html lang="pt-bt">
          <body
            className={`${robototSans.variable} ${robototMono.variable} antialiased bg-white text-slate-950 font-mono`}
          >
            <Navbar />
            <Toaster richColors />
            <div className="max-w-7xl mx-auto">{children}</div>
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}

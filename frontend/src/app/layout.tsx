import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Flow",
  description: "Seu gerenciador de pedidos perfeito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
    >
      <body
        suppressHydrationWarning  /* configuração para evitar o erro de hydration pelo uso do ColorZilla no navegador */
        className="min-h-full flex flex-col  bg-app-background **:text-white"
      >
        {children}
      </body>
    </html>
  );
}

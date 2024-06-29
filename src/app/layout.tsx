import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plánovač směn",
  description: "Automatické předvídání nadefinovaného vzoru směnových dnů v kalendáři.",
};

export const viewport: Viewport = {
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    width: "device-width",
    userScalable: false
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

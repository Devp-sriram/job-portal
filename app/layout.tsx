import type { Metadata } from "next";
import localFont from 'next/font/local';


import "./globals.css";

export const satoshi = localFont({
  src: '../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  weight: '100 900', // variable font range
  display: 'swap',
});

export const metadata: Metadata = {
  title: "job portal",
  description: "porat for searching jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

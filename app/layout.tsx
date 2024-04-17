import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Carrot Market",
    default: "Carrot Market clone",
  },
  description: "Sell and buy all the things!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full max-w-lg mx-auto">{children}</div>
      </body>
    </html>
  );
}

//<div className="w-full max-w-lg mx-auto">

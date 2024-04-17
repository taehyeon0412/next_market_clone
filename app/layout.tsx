import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Carrot Market",
    default: "carrot Market_clone",
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

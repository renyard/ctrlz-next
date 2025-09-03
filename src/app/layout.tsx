import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import "./globals.css";
import styles from "./layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CTRL Z",
  description: "CTRL Z",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.background}>
          <div className={styles.container}>
            <Navigation />
            {children}
            <Footer />
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
        <img src="https://tracker.metricool.com/c3po.jpg?hash=64558f68a7c64f247a50df807958a690"/>
      </body>
    </html>
  );
}

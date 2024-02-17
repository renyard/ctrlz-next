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
      </body>
    </html>
  );
}

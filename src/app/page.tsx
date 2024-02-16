import Hero from "@/components/hero";
import NewsletterForm from "@/components/newsletter-form";

import styles from "./page.module.css";
import NewsletterTiles from "@/components/newsletter-tiles";
import MoreLink from "@/components/more-link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTRL Z - Modern Acid House",
  description: "",
};

export default async function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <NewsletterForm />
      <NewsletterTiles />
      <MoreLink />
    </main>
  );
}

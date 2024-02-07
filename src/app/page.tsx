import Hero from "@/components/hero";
import NewsletterForm from "@/components/newsletter-form";

import styles from "./page.module.css";
import NewsletterTiles from "@/components/newsletter-tiles";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <NewsletterTiles />
      {/* <NewsletterForm /> */}
    </main>
  );
}

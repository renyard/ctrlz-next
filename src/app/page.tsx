import { Metadata } from "next"

import Hero from "@/components/hero"
import MoreLink from "@/components/more-link"
import NewsletterForm from "@/components/newsletter-form"
import NewsletterTiles from "@/components/newsletter-tiles"

import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "CTRL Z - Modern Acid House",
  description: "",
}

export default async function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <NewsletterForm />
      <NewsletterTiles />
      <MoreLink />
    </main>
  )
}

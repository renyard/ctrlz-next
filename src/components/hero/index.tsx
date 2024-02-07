import Link from "next/link";
import Image from "next/image";

import styles from "./hero.module.scss";
import { getNewsletter } from "@/lib/beehiiv";

export default async function Hero() {
  const newsletters = await getNewsletter();
  const newsletter = newsletters[0];

  return (
    <div className={styles.hero}>
      <Link href={`/newsletter/${newsletter.slug}`}>
        <Image
          src={newsletter.thumbnail_url}
          alt=""
          className={styles["hero-image"]}
          fill={true}
        />
        <h2 className={styles.heading}>
          <span>Latest Newsletter</span>
          <span>{newsletter.title}</span>
        </h2>
      </Link>
    </div>
  );
}

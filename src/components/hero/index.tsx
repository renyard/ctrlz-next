import Image from "next/image";
import Link from "next/link";

import { getNewsletter } from "@/lib/beehiiv";

import styles from "./hero.module.scss";

export default async function Hero() {
  const newsletters = await getNewsletter();
  const newsletter = newsletters[0];

  return (
    <div className={styles.hero}>
      <Link href={`/newsletter/${newsletter.slug}`} className={styles.link}>
        <Image
          src={newsletter.thumbnail_url}
          alt=""
          className={styles["hero-image"]}
          fill={true}
          sizes="(min-width: 900px) 900px, (min-width: 700px) 700px, (min-width: 600px) 600px, 300px"
          loading="eager"
        />
        <h2 className={styles.heading}>
          <span className={styles["primary-heading"]}>
            <span>Latest Newsletter</span>
          </span>
          <span className={styles["secondary-heading"]}>
            <span>{newsletter.title}</span>
          </span>
        </h2>
      </Link>
    </div>
  );
}

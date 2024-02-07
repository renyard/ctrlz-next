import { getNewsletter } from "@/lib/beehiiv";
import Tile from "../tile";

import styles from "./newsletter-tiles.module.scss";

export default async function NewsletterTiles() {
  const newsletters = await getNewsletter();

  return (
    <ul className={styles.tiles}>
      {newsletters.slice(1, 13).map((newsletter) => (
        <Tile
          key={newsletter.slug}
          title={newsletter.title}
          image={newsletter.thumbnail_url}
          link={`/newsletter/${newsletter.slug}`}
        />
      ))}
    </ul>
  );
}

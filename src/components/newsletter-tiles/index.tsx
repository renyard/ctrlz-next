import { getNewsletter } from "@/lib/beehiiv";
import Tile from "../tile";

import styles from "./newsletter-tiles.module.scss";

export default async function NewsletterTiles({
  start = 1,
  end = 13,
}: {
  start?: number;
  end?: number;
}) {
  const newsletters = await getNewsletter();

  return (
    <ul className={styles.tiles}>
      {newsletters.slice(start, end).map((newsletter) => (
        <Tile
          key={newsletter.id}
          title={newsletter.title}
          image={newsletter.thumbnail_url}
          link={`/newsletter/${newsletter.slug}`}
        />
      ))}
    </ul>
  );
}

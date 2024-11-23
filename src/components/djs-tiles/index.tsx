import Tile from "@/components/tile";
import image from "@/images/turntable.jpg";
import { getDJs } from "@/lib/djs";

import styles from "./djs-tiles.module.scss";

export default async function DjsTiles({}) {
  const djs = await getDJs();

  return (
    <ul className={styles.tiles}>
      {djs.map(async (dj) => {
        const image = await import(`@/images/djs/${dj.item.data.slug}.jpg`);

        return (
          <Tile
            key={dj.item.data.slug}
            title={dj.item.data.name}
            image={image}
            link={`/djs/${dj.item.data.slug}`}
          />
        );
      })}
    </ul>
  );
}

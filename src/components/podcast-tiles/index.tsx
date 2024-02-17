import { getPodcast } from "@/lib/podcast";

import Tile from "../tile";

import styles from "./podcast-tiles.module.scss";

export default async function PodcastTiles({
  start = 1,
  end = 19,
}: {
  start?: number;
  end?: number;
}) {
  const podcast = await getPodcast();

  return (
    <ul className={styles.tiles}>
      {podcast.slice(start, end).map((episode) => (
        <Tile
          key={Math.random()}
          title={episode.title}
          image={episode.image}
          link={`/podcast/${episode.slug}`}
        />
      ))}
    </ul>
  );
}

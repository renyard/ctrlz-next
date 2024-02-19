import { getPodcast } from "@/lib/podcast";

import Tile from "../tile";

import styles from "./podcast-tiles.module.scss";

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
      {podcast.slice(start, end).map((episode) => {
        shuffle(episode.featuredArtists);
        const featuredArtists = episode.featuredArtists.slice(0, 3);

        return (
          <Tile
            key={Math.random()}
            title={episode.title}
            subtitle={`Featuring ${featuredArtists.join(", ")} and more.`}
            image={episode.image}
            link={`/podcast/${episode.slug}`}
          />
        );
      })}
    </ul>
  );
}

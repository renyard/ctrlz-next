import fs from "fs";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import Parser from "rss-parser";

export type episode = {
  title: string;
  description: string;
  featuredArtists: string[];
  episode: string;
  image: StaticImageData;
  enclosure: string;
  slug: string;
};

// Load all images into an array from the @/images/podcast directory
const images: StaticImageData[] = [];
fs.readdirSync(`src/images/podcast`)
  .filter((file) => /\.jpg$/.test(file))
  .forEach(async (file) => {
    const { default: image } = await import(`@/images/podcast/${file}`);
    images.push(image);
  });

export const getPodcast: () => Promise<episode[]> = async () => {
  const parser = new Parser();
  // console.log("[podcast] Fetching podcast feed...");
  const res = await fetch("https://podcast.ctrlz.club/rss.xml");
  const feed = await parser.parseString(await res.text());

  const items = feed.items.map((item) => {
    const date = new Date(item.pubDate as string);
    const [year, month, day] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ].map((value) => `${value}`.padStart(2, "0"));

    const { episode } = item.itunes;
    const featuring = item.content?.matchAll(/^\d+\. (.*) -/gm);

    const featuredArtists = [];
    let result = featuring?.next();
    while (!result?.done) {
      const match = result?.value[1];
      if (match) {
        featuredArtists.push(match);
      }
      result = featuring?.next();
    }

    return {
      title: item.title as string,
      description: item["content:encoded"] as string,
      featuredArtists,
      episode,
      image: images[episode % 34],
      enclosure: item.enclosure?.url || "",
      slug: `${year}-${month}-${day}`,
    };
  });

  return items;
};

export const getPodcastEpisode = async (id: string) => {
  const items = await getPodcast();
  const episode = items.find((item) => item.slug === id);

  if (!episode) {
    throw new Error(`No episode found for id: ${id}`);
  }

  return episode;
};

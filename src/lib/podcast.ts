import Parser from "rss-parser";

export type episode = {
  title: string;
  description: string;
  episode: string;
  image: string;
  enclosure: string;
  slug: string;
};

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

    return {
      title: item.title as string,
      description: item["content:encoded"] as string,
      episode: item.itunes.episode as string,
      image: item.itunes.image as string,
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

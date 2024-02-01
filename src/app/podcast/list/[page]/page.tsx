import { getPodcast } from "@/lib/podcast";
import { Metadata } from "next";

const PAGE_SIZE = 18;

export async function generateStaticParams() {
  const { length } = await getPodcast();
  const numOfPages = Math.ceil(length / PAGE_SIZE);

  const params = Array.from({ length: numOfPages }).map((_, i) => ({
    page: `${i + 1}`,
  }));

  return params;
}

export const metadata: Metadata = {
  title: "Podcast",
  description: "Podcast",
};

export default async function Podcast({ params: { page = 1 } }) {
  const items = await getPodcast();
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const episodes = items.slice(start, end);

  return (
    <ul>
      {episodes.map((episode) => (
        <li key={episode.episode}>{episode.title}</li>
      ))}
    </ul>
  );
}

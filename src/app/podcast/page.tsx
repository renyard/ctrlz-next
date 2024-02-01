import { Metadata } from "next";

import { getPodcast } from "@/lib/podcast";
import PodcastResults from "./podcastResults";

export async function generateStaticParams() {
  const items = await getPodcast();
}

export const metadata: Metadata = {
  title: "Podcast",
  description: "Podcast",
};

export default async function Podcast() {
  const items = await getPodcast();

  return <PodcastResults items={items} />;
}

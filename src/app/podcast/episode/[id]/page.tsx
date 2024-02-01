import { getPodcast, getPodcastEpisode } from "@/lib/podcast";

export async function generateStaticParams() {
  const items = await getPodcast();

  return items.map((item) => ({
    id: item.slug,
  }));
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  const episode = await getPodcastEpisode(id);

  return {
    title: episode.title,
    description: episode.description,
  };
}

export default async function Podcast({
  params: { id },
}: {
  params: { id: string };
}) {
  const episode = await getPodcastEpisode(id);

  return <>{JSON.stringify(episode, null, 2)}</>;
}

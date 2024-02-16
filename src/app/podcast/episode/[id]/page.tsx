import Title from "@/components/title";
import AudioPlayer from "@/components/audio-player";
import { getPodcast, getPodcastEpisode } from "@/lib/podcast";
import NewsletterForm from "@/components/newsletter-form";

import styles from "./episode.module.scss";

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
    title: `${episode.title} | CTRL Z`,
    description: episode.description,
  };
}

export default async function Podcast({
  params: { id },
}: {
  params: { id: string };
}) {
  const episode = await getPodcastEpisode(id);

  return (
    <>
      <Title title={episode.title} image={episode.image} />
      <NewsletterForm />
      <div className={styles.container}>
        <AudioPlayer src={episode.enclosure} />
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </div>
    </>
  );
}

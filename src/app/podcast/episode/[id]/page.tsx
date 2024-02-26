import Link from "next/link";

import AudioPlayer from "@/components/audio-player";
import NewsletterForm from "@/components/newsletter-form";
import Title from "@/components/title";
import { getPodcast, getPodcastEpisode } from "@/lib/podcast";

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
      <AudioPlayer src={episode.enclosure} className={styles.player} />
      <div className={styles.container}>
        <p>
          The CTRL Z radio show is broadcast weekly on{" "}
          <Link href="https://datatransmission.co" target="_blank">
            Data Transmission Radio
          </Link>
          ,{" "}
          <Link href="https://undergroundkollektiv.co.uk">
            Underground Kollektiv
          </Link>
          , Radio Roadhouse and on the{" "}
          <Link href="https://podcast.ctrlz.club">podcast</Link>. It also goes
          out monthly on{" "}
          <Link href="https://ibizaclubnews.net">Ibiza Club News Radio</Link>.
        </p>

        <ul className={styles.list}>
          <li>Wednesday 5pm GMT/BST - Underground Kollektiv</li>
          <li>Thursday 2pm GMT/BST - Data Transmission Radio</li>
          <li>
            Friday -{" "}
            <Link href="https://podcast.ctrlz.club" target="_blank">
              CTRL Z Podcast
            </Link>
          </li>
          <li>Saturday 11pm GMT/BST - Radio Roadhouse</li>
          <li>Monthly - Ibiza Club News Radio</li>
        </ul>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </div>
    </>
  );
}

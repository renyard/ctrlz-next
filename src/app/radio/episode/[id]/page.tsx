import Link from "next/link"

import AudioPlayer from "@/components/audio-player"
import NewsletterForm from "@/components/newsletter-form"
import Title from "@/components/title"
import { getPodcast, getPodcastEpisode } from "@/lib/podcast"

import styles from "./episode.module.scss"

export const dynamicParams = false

export async function generateStaticParams() {
  const items = await getPodcast()

  return items.map((item) => ({
    id: item.slug,
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params

  const { id } = params

  const episode = await getPodcastEpisode(id)

  return {
    title: `${episode.title} | CTRL Z`,
    description: episode.description,
    openGraph: {
      images: [episode.image?.src],
    },
  }
}

// Split each tracklist item ("Artist - Title") into a bold artist and a title
const boldArtists = (html: string) =>
  html.replace(
    /<li>(.+?) - (.+?)<\/li>/g,
    "<li><strong>$1</strong><span>$2</span></li>",
  )

export default async function Podcast(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params

  const { id } = params

  const episode = await getPodcastEpisode(id)

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
          and on the <Link href="https://podcast.ctrlz.club">podcast</Link>. It
          also goes out monthly on{" "}
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
          <li>Monthly - Ibiza Club News Radio</li>
        </ul>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: boldArtists(episode.description) }}
        />
      </div>
    </>
  )
}

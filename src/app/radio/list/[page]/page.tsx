import { Metadata } from "next"
import { GetStaticPropsContext } from "next"
import Link from "next/link"

// import LiveStream from "@/components/live-stream";
import Pagination from "@/components/pagination"
import PodcastTiles from "@/components/podcast-tiles"
import Title from "@/components/title"
import mixerImg from "@/images/mixer.jpg"
import { getPodcast } from "@/lib/podcast"
import { getLatestYouTubeVideo } from "@/lib/youtube"

export const dynamicParams = false

const PAGE_SIZE = 18

const getNumberOfPages = async () => {
  const { length } = await getPodcast()
  return Math.ceil(length / PAGE_SIZE)
}

export async function generateStaticParams() {
  const numberOfPages = await getNumberOfPages()

  const params = Array.from({ length: numberOfPages }).map((_, i) => ({
    page: `${i + 1}`,
  }))

  return params
}

export const metadata: Metadata = {
  title: "Radio Show | CTRL Z",
  description: "Your weekly fix of Modern Acid House & Techno.",
}

interface PodcastProps {
  params: Promise<{
    page: string
  }>
}

export default async function Podcast(props: PodcastProps) {
  const params = await props.params

  const { page: pageStr = "1" } = params

  const page = parseInt(pageStr, 10)
  const numberOfPages = await getNumberOfPages()
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const video = await getLatestYouTubeVideo()

  return (
    <>
      <Title
        title="CTRL Z Radio"
        subtitle={
          <>
            Listen on the{" "}
            <Link href="https://podcast.ctrlz.club" target="_blank">
              podcast
            </Link>{" "}
            or on{" "}
            <Link href="https://datatransmission.co" target="_blank">
              Data Transmission
            </Link>{" "}
            or{" "}
            <Link href="https://undergroundkollektiv.co.uk" target="_blank">
              Underground Kollektiv
            </Link>{" "}
            <br />
            <br />
            Subscribe on{" "}
            <Link href="https://www.youtube.com/@ctrlzclub" target="_blank">
              YouTube
            </Link>{" "}
            for the latest video mixes
          </>
        }
        image={mixerImg}
      />
      <iframe
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder={0}
        style={{ display: "block", width: "100%", aspectRatio: "16/9" }}
      ></iframe>
      <PodcastTiles start={start} end={end} />
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={page}
        href="/radio/list/[page]"
        asPattern="/radio/[page]"
      />
    </>
  )
}

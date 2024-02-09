import Pagination from "@/components/pagination";
import PodcastTiles from "@/components/podcast-tiles";
import { getPodcast } from "@/lib/podcast";
import { Metadata } from "next";
import Link from "next/link";

import mixerImg from "@/images/mixer.jpg";
import Title from "@/components/title";

const PAGE_SIZE = 18;

const getNumberOfPages = async () => {
  const { length } = await getPodcast();
  return Math.ceil(length / PAGE_SIZE);
};

export async function generateStaticParams() {
  const numberOfPages = await getNumberOfPages();

  const params = Array.from({ length: numberOfPages }).map((_, i) => ({
    page: `${i + 1}`,
  }));

  return params;
}

export const metadata: Metadata = {
  title: "Podcast",
  description: "Podcast",
};

export default async function Podcast({ params: { page = 1 } }) {
  const numberOfPages = await getNumberOfPages();
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return (
    <>
      <Title
        title="Radio Show"
        subtitle={
          <>
            Listen on the{" "}
            <Link href="https://podcast.ctrlz.club" target="_blank">
              podcast
            </Link>{" "}
            or on{" "}
            <Link href="https://datatransmission.co" target="_blank">
              Data Transmission
            </Link>
            ,{" "}
            <Link href="https://undergroundkollektiv.co.uk" target="_blank">
              Underground Kollektiv
            </Link>{" "}
            or{" "}
            <Link href="https://ibizaclubnews.net" target="_blank">
              Ibiza Club Radio
            </Link>
          </>
        }
        image={mixerImg}
      />
      <PodcastTiles start={start} end={end} />
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={page}
        href="/podcast/list/[page]"
        asPattern="/podcast/[page]"
      />
    </>
  );
}

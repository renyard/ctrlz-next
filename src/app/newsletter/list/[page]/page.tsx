import { Metadata } from "next";

import { getNewsletter } from "@/lib/beehiiv";
import Title from "@/components/title";

import newspaperImg from "@/images/newspaper-bundle.jpg";
import NewsletterTiles from "@/components/newsletter-tiles";
import Pagination from "@/components/pagination";

const PAGE_SIZE = 18;

const getNumberOfPages = async () => {
  const { length } = await getNewsletter();
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
  title: "Newsletter",
  description: "Newsletter",
};

export default async function Newsletter({ params: { page: pageStr = "1" } }) {
  const page = parseInt(pageStr, 10);
  const numberOfPages = await getNumberOfPages();

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  return (
    <>
      <Title title="Newsletter" image={newspaperImg} />
      <NewsletterTiles start={start} end={end} />
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={page}
        href="/newsletter/list/[page]"
        asPattern="/newsletter/[page]"
      />
    </>
  );
}

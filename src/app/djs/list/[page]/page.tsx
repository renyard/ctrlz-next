import { Metadata } from "next";
import { GetStaticPropsContext } from "next";

import DjsTiles from "@/components/djs-tiles";
import Title from "@/components/title";
import turntableImg from "@/images/turntable.jpg";
import { getDJs } from "@/lib/djs";

export const dynamicParams = false;

const PAGE_SIZE = 50;

const getNumberOfPages = async () => {
  const { length } = await getDJs();
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
  title: "DJs | CTRL Z",
  description: "The DJs of CTRL Z",
};

interface DJsProps {
  params: Promise<{
    page: string;
  }>;
}

export default async function DJs(props: DJsProps) {
  const { params } = props;

  const { page: pageStr = "1" } = await params;

  return (
    <>
      <Title
        title="DJs"
        subtitle="CTRL Z's radio and event artists"
        image={turntableImg}
      />
      <DjsTiles />
    </>
  );
}

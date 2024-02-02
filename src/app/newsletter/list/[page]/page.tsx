import { getNewsletter } from "@/lib/beehiiv";
import { Metadata } from "next";

const PAGE_SIZE = 18;

export async function generateStaticParams() {
  const { length } = await getNewsletter();
  const numOfPages = Math.ceil(length / PAGE_SIZE);

  const params = Array.from({ length: numOfPages }).map((_, i) => ({
    page: `${i + 1}`,
  }));

  return params;
}

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Newsletter",
};

export default async function Newsletter({ params: { page = 1 } }) {
  const items = await getNewsletter();

  return <>{JSON.stringify(items, null, 2)}</>;
}

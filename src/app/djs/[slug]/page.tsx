import Image from "next/image";

import Title from "@/components/title";
import mixerImg from "@/images/mixer.jpg";
import { getDJ, getDJs } from "@/lib/djs";

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const djs = await getDJs();

  const params = djs.map((dj) => ({
    slug: dj.item.data.slug,
  }));

  return params;
};

export const generateMetadata = async (
  props: {
    params: Promise<{ slug: string }>;
  }
) => {
  const params = await props.params;

  const {
    slug
  } = params;

  const { item } = getDJ(slug);

  return {
    title: `${item.data.name} | CTRL Z`,
    description: item.data.bio,
  };
};

export default async function DJPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  const dj = await getDJ(slug);
  const image = await import(`@/images/djs/${dj.item.data.slug}.jpg`);

  return (
    <>
      <Title
        title={dj.item.data.name}
        subtitle={dj.item.data.genres}
        image={mixerImg}
      />
      <Image src={image} alt={dj.item.data.name} width={300} height={300} />
      <h1>{dj.item.data.name}</h1>
      <p>Slug: {slug}</p>
      {dj.item.content}
    </>
  );
}

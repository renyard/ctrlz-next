import { getNewsletter, getNewsletterPost } from "@/lib/beehiiv";

export async function generateStaticParams() {
  const items = await getNewsletter();

  return items.map((item) => ({
    slug: item.slug,
  }));
}

export const metadata = {
  title: "Newsletter",
  description: "Newsletter",
};

export default async function NewsletterPost({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getNewsletterPost(slug);

  return <>{JSON.stringify(post, null, 2)}</>;
}

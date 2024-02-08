import { getNewsletter, getNewsletterPost } from "@/lib/beehiiv";
import styles from "./post.module.scss";

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

  return (
    <>
      {/* Tailwind styles used by beehiiv */}
      <style>
        {`
          .container img {
            display: block;
          }
          .container .mx-auto {
            margin: 0 auto;
          }
          .container .relative {
            position: relative;
          }
          .container .relative iframe {
            position: absolute;
          }
        `}
      </style>
      <div
        className="container"
        dangerouslySetInnerHTML={{ __html: post.content.free.web }}
      />
    </>
  );
}

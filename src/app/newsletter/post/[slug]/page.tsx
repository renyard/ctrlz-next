import Title from "@/components/title";
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
      <Title
        title={post.title}
        subtitle={post.subtitle}
        image={post.thumbnail_url}
      />

      <style>
        {`
          .container #web-header h1,
          .container #web-header h3 {
            display: none;
          }
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
          .container .bh__byline_wrapper img {
            border-radius: 0 !important;
          }
          .container h2 {
            text-transform: uppercase;
            font-weight: 900 !important;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          }
          .container * {
            border-radius: 0 !important;
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

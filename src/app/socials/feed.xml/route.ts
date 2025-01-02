import RSS from "rss";

import { getPodcast } from "@/lib/podcast";

export async function GET() {
  const site_url = "https://www.ctrlz.club";
  const allPosts = await getPodcast(); // Fetch your posts data

  const feed = new RSS({
    title: "CTRL Z",
    description: "",
    site_url: site_url,
    feed_url: `${site_url}/feed.xml`,
    language: "en",
    pubDate: new Date().toUTCString(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  allPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: `Check out this week's CTRL Z radio show, featuring ${post.featuredArtists.join(", ")} and more. Comment "podcast" for the link.`,
      url: `${site_url}/radio/${post.slug}`,
      date: new Date(post.date),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

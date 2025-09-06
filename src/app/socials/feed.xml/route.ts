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

  const post = allPosts[0];

  feed.item({
    title: post.title,
    description: `On the CTRL Z Radio Show this week we have tunes from ${post.featuredArtists.slice(0, 3).join(", ")} and more. Listen on the podcast, link in bio.`,
    url: `${site_url}/radio/${post.slug}`,
    date: new Date(post.date),
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

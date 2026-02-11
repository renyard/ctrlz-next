import { getPodcast } from "@/lib/podcast"

export async function GET() {
  const allPosts = await getPodcast()

  const items: { title: string; featuredArtists: string[]; image: string; slug: string; date: Date }[] = []

  allPosts.forEach((post) => {
    items.push({
      title: post.title,
      featuredArtists: post.featuredArtists,
      image: post.image.src,
      slug: post.slug,
      date: new Date(post.date),
    })
  })

  return new Response(JSON.stringify(items), {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
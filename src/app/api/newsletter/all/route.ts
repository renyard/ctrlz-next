import { getNewsletter } from "@/lib/beehiiv"

export const dynamic = "force-static"

export async function GET() {
  const allPosts = await getNewsletter()

  const items: { title: string; slug: string; date: Date; thumbnail_url: string, content: string }[] = []

  allPosts.forEach((post) => {
    items.push({
      title: post.title,
      slug: post.slug,
      date: new Date(post.publish_date * 1000),
      thumbnail_url: post.thumbnail_url,
      content: post.content.free.web,
    })
  })

  return new Response(JSON.stringify(items), {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
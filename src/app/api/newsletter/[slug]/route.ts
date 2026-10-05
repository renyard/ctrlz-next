import { getNewsletter, getNewsletterPost } from "@/lib/beehiiv"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  const items = await getNewsletter()
  return items.map((item) => ({ slug: item.slug }))
}

export async function GET(_request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const { slug } = params

  const post = await getNewsletterPost(slug)

  return new Response(JSON.stringify({
    title: post.title,
    subtitle: post.subtitle,
    thumbnail_url: post.thumbnail_url,
    content: post.content.free.web,
  }), {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
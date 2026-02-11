import { getPodcastEpisode } from "@/lib/podcast"

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ error: "No id provided" }), {
      status: 400,
    })
  }

  const episode = await getPodcastEpisode(id)

  return new Response(JSON.stringify({
    title: episode.title,
    description: episode.description,
    featuredArtists: episode.featuredArtists,
    episode: episode.episode,
    image: episode.image.src,
    enclosure: episode.enclosure,
    slug: episode.slug,
    date: episode.date,
  }), {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
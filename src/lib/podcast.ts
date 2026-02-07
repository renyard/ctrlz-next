import fs from "fs"
import { StaticImageData } from "next/dist/shared/lib/get-img-props"
import path from "path"
import Parser from "rss-parser"

export type episode = {
  title: string
  description: string
  featuredArtists: string[]
  episode: string
  image: StaticImageData
  enclosure: string
  slug: string
  date: string
}

// Load all images into an array from the @/images/podcast directory
const images: StaticImageData[] = []
fs.readdirSync(path.join(process.cwd(), "src/images/podcast"))
  .filter((file) => /\.jpg$/.test(file))
  .forEach(async (file) => {
    const { default: image } = await import(`@/images/podcast/${file}`)
    images.push(image)
  })

const getPodcastImpl = async (): Promise<episode[]> => {
  const parser = new Parser()
  // console.log("[podcast] Fetching podcast feed...");
  const res = await fetch("https://podcast.ctrlz.club/rss.xml", {
    cache: "force-cache",
  })
  const feed = await parser.parseString(await res.text())

  const items = feed.items.map((item) => {
    const date = new Date(item.pubDate as string)
    const [year, month, day] = [
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
    ].map((value) => `${value}`.padStart(2, "0"))

    const { episode } = item.itunes
    const featuring = item.content?.matchAll(/^\d+\. (.*) -/gm)

    const featuredArtists = []
    let result = featuring?.next()
    while (!result?.done) {
      const match = result?.value[1]
      if (match) {
        featuredArtists.push(match)
      }
      result = featuring?.next()
    }

    return {
      title: item.title as string,
      description: item["content:encoded"] as string,
      featuredArtists,
      episode,
      image: images[episode % 34],
      enclosure: item.enclosure?.url || "",
      slug: `${year}-${month}-${day}`,
      date: item.pubDate!,
    }
  })

  return items
}

// Cache for the duration of the build so generateStaticParams and getPodcastEpisode see the same list
let podcastCache: Promise<episode[]> | null = null

export const getPodcast = (): Promise<episode[]> => {
  if (!podcastCache) podcastCache = getPodcastImpl()
  return podcastCache
}

export const getPodcastEpisode = async (id: string) => {
  const items = await getPodcast()
  const episode = items.find((item) => item.slug === id)

  if (!episode) {
    throw new Error(`No episode found for id: ${id}`)
  }

  return episode
}

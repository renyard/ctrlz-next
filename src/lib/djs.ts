import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { fileURLToPath } from "url"

export const getDJs = () => {
  const dir = path.dirname(fileURLToPath(import.meta.url))

  const djsContentDir = `${dir}/../../content/djs/`
  const files = fs
    .readdirSync(djsContentDir)
    .filter((file) => file.match(/\.md$/))

  const djs = files.map((file) => {
    const dj = fs.readFileSync(`${djsContentDir}${file}`, "utf8")
    const slug = path.basename(file, ".md")

    const item = matter(dj)

    return { item, slug }
  })

  return djs
}

export const getDJ = (slug: string) => {
  const djs = getDJs()

  const dj = djs.find((dj) => dj.item.data.slug === slug)

  if (!dj) {
    throw new Error(`DJ not found: ${slug}`)
  }
  return dj
}

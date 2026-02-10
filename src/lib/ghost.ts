export const getPosts = async () => {
  const apiKey = process.env.GHOST_CONTENT_API_KEY
  const baseUrl = "https://ghost.ctrlz.club/ghost/api/v3/content/posts"

  if (!apiKey) {
    throw new Error("GHOST_CONTENT_API_KEY environment variable is not set")
  }

  let page = 1
  const posts = []

  while (true) {
    const res = await fetch(
      `${baseUrl}?key=${apiKey}&limit=15&page=${page}&fields=id,title,slug,html,feature_image,published_at,excerpt,updated_at&filter=status:published`,
      {
        cache: "force-cache",
      },
    )

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }

    const data = await res.json()

    if (!data.posts || data.posts.length === 0) {
      break
    }

    posts.push(...data.posts)

    // Ghost API pagination: if we got fewer posts than the limit, we're on the last page
    if (data.posts.length < 15) {
      break
    }

    // Check if there's a next page using meta.pagination
    if (data.meta?.pagination) {
      const { page: currentPage, pages } = data.meta.pagination
      if (currentPage >= pages) {
        break
      }
    }

    page++
  }

  // Sort by published date (newest first)
  posts.sort((a, b) => {
    return (
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
  })

  return posts
}

export const getPost = async (slug: string) => {
  const posts = await getPosts()
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    throw new Error(`No post found for slug: ${slug}`)
  }

  return post
}





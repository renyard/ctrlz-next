export const getNewsletter = async () => {
  const auth = ["Bearer", process.env.BEEHIIV_API_KEY].join(" ");

  let page = 1;
  const posts = [];

  while (true) {
    // console.log(`[beehiiv] Fetching page ${page} of posts...`);
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUB_ID}/posts?expand%5B%5D=free_web_content&stats&limit=10&page=${page}&status=confirmed`,
      {
        headers: {
          Authorization: auth,
        },
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const { data = [], total_pages = page } = await res.json();

    posts.push(...data);

    if (page === total_pages) {
      break;
    }
    page++;
  }

  posts.sort((a, b) => {
    return (
      new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
    );
  });

  return posts.filter((post) => {
    return (
      post.status === "confirmed" &&
      post.publish_date <= Math.floor(new Date().getTime() / 1000)
    );
  });
};

export const getNewsletterPost = async (slug: string) => {
  const posts = await getNewsletter();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    throw new Error(`No post found for slug: ${slug}`);
  }

  return post;
};

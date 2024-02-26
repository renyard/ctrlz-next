/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  rewrites: async () => [
    {
      source: "/podcast",
      destination: "/podcast/list/1",
    },
    {
      source: "/podcast/:page(\\d{1,})",
      destination: "/podcast/list/:page",
    },
    {
      source: "/podcast/:episode(\\d{4,4}-\\d{2,2}-\\d{2,2})",
      destination: "/podcast/episode/:episode",
    },
    {
      source: "/newsletter",
      destination: "/newsletter/list/1",
    },
    {
      source: "/newsletter/:page(\\d{1,})",
      destination: "/newsletter/list/:page",
    },
    {
      source: "/newsletter/:slug",
      destination: "/newsletter/post/:slug",
    },
  ],
  redirects: async () => [
    {
      source: "/:episode(\\d{4,4}-\\d{2,2}-\\d{2,2})",
      destination: "/podcast/:episode",
      permanent: true,
    },
    {
      source: "/rss.xml",
      destination: "https://podcast.ctrlz.club/rss.xml",
      permanent: true,
    },
    {
      source: "/links",
      destination: "https://linktr.ee/ctrlzclub",
      permanent: false,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beehiiv-images-production.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

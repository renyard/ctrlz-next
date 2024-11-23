/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/radio",
      destination: "/radio/list/1",
    },
    {
      source: "/radio/:page(\\d{1,})",
      destination: "/radio/list/:page",
    },
    {
      source: "/radio/:episode(\\d{4,4}-\\d{2,2}-\\d{2,2})",
      destination: "/radio/episode/:episode",
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
    {
      source: "/djs",
      destination: "/djs/list/1",
    },
    {
      source: "/djs/:page(\\d{1,})",
      destination: "/djs/list/:page",
    },
  ],
  redirects: async () => [
    {
      source: "/podcast",
      destination: "/radio",
      permanent: true,
    },
    {
      source: "/:episode(\\d{4,4}-\\d{2,2}-\\d{2,2})",
      destination: "/radio/:episode",
      permanent: true,
    },
    {
      source: "/podcast/:episode(\\d{4,4}-\\d{2,2}-\\d{2,2})",
      destination: "/radio/:episode",
      permanent: true,
    },
    {
      source: "/radio-station",
      destination: "/radio",
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
      {
        protocol: "https",
        hostname: "media.radio.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

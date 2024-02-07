/** @type {import('next').NextConfig} */
const nextConfig = {
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

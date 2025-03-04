/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: [
      "placekitten.com",
      "source.unsplash.com",
      "images.unsplash.com",
      "i.pravatar.cc",
      "img10.naventcdn.com",
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

module.exports = nextConfig;

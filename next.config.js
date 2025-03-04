/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    domains: [
      "placekitten.com",
      "source.unsplash.com",
      "images.unsplash.com",
      "i.pravatar.cc",
      "img10.naventcdn.com",
      "res.cloudinary.com",
      "storage.googleapis.com",
      "s3.amazonaws.com",
      "img.naventcdn.com",
      "img.staticmb.com",
      "images.ctfassets.net",
      "images.contentful.com",
      "cdn.sanity.io",
      "cdn.staticaly.com",
      "media.istockphoto.com",
      "img.freepik.com",
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

module.exports = nextConfig;

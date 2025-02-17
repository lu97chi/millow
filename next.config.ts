import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "placekitten.com",
      "source.unsplash.com",
      "images.unsplash.com",
      "i.pravatar.cc",
      "img10.naventcdn.com",
      "tuhogar.mx"
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

export default nextConfig;

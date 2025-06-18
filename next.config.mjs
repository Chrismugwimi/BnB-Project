import nextPwa from "next-pwa";

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,

  images: {
    domains: ["localhost", "images.unsplash.com", "res.cloudinary.com"],
    unoptimized: true,
  },

  experimental: {
    // You can enable experimental features if needed
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

const nextConfig = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
})(baseConfig);

export default nextConfig;

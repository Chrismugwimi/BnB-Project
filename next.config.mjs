/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;

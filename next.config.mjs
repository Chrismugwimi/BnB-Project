/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["localhost", "images.unsplash.com", "res.cloudinary.com"],
    unoptimized: true,
  },

  // Let Next.js handle Turbopack automatically
  experimental: {
    // Add any experimental features you need
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

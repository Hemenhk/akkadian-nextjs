/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"]
  }
};

module.exports = nextConfig;

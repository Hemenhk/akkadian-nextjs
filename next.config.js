/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com", "res.cloudinary.com"],
    formats: ["image/webp"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  env: {
    SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    MONGODB_DATABASE: process.env.MONGODB_DATABASE,
    CLOUDINARY_NAME:  process.env.CLOUDINARY_NAME,
    CLOUDINARY_PRESET:  process.env.CLOUDINARY_PRESET,
  },
};

module.exports = nextConfig;

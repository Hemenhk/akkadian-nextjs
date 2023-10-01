/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  env: {
    SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;

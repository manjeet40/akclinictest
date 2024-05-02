/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ["admin.akclinics.com", "akstaging.thor.work"],
  },
};

module.exports = nextConfig;

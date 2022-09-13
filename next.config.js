/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      allowFutureImage: true
    }
  },
  output: "standalone"
}

module.exports = nextConfig

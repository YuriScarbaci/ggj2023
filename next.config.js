/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*', // this is a fall-back, if the page doesn't exist, we display the `/` page
        destination: '/',
      },
    ]
  },
}

module.exports = nextConfig

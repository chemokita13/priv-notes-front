/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API: process.env.API || 'http://localhost:4000',
  }
}

module.exports = nextConfig

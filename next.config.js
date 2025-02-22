/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.yml$/,
      use: 'yaml-loader'
    })
    return config
  }
}

module.exports = nextConfig 
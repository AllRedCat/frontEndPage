const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  distDir: process.env.NODE_ENV === 'production' ? '../app' : '.next',
  env: {
    API_URL: process.env.API_URL,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    return config
  },
}

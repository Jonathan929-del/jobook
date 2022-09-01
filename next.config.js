/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:[
      'api.cloudinary.com',
      'res.cloudinary.com'
    ]
  }
}

module.exports = nextConfig

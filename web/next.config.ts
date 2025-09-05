/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", 
      "avatars.githubusercontent.com",
      "pbs.twimg.com",
      "huggingface.co",            
      "cdn-icons-png.flaticon.com"
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ["*"] }
    
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = nextConfig;

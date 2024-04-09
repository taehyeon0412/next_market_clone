/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "k.kakaocdn.net",
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "storage.googleapis.com", //GCP
      "carrotmarketbucket.s3.ap-northeast-2.amazonaws.com", //AWS
    ],
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "k.kakaocdn.net",
      },
      {
        hostname: "carrotmarketbucket.s3.ap-northeast-2.amazonaws.com", // 추가된 패턴
      },
    ],
  },
};

module.exports = nextConfig;

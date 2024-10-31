/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "ssenbi-bucket.s3.ap-northeast-2.amazonaws.com", // 추가한 도메인
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // .svg 파일에 대해
      use: ["@svgr/webpack"], // svgr을 사용
    });

    return config;
  },
};

export default nextConfig;

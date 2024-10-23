/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com"], // 이미지를 가져올 도메인을 추가
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

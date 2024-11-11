/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "ssenbi-bucket.s3.ap-northeast-2.amazonaws.com",
      },
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

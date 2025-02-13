import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: [
          "**/.next/**", // Next.js 빌드 캐시 폴더 무시
          "**/node_modules/**", // node_modules 폴더 무시
        ],
        aggregateTimeout: 200,
        poll: 1000, // 1초마다 변경 사항 확인
      };
    }
    return config;
  },

	pageExtensions: ["ts", "tsx"], // 확장자 인식 추가
};

export default nextConfig;

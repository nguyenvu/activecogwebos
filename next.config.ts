import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  async headers() {
    return [
      {
        // Áp dụng cho tất cả các route API
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Cho phép tất cả các domain
          { key: 'Access-Control-Allow-Methods', value: 'GET,HEAD' }, // Chỉ cho phép GET và HEAD
        ],
      },
    ];
  },
};

export default nextConfig;

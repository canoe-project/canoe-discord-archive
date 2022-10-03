/** @type {import('next').NextConfig} */
/* eslint-disable import/no-extraneous-dependencies */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {},
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    HOSTNAME: process.env.HOSTNAME,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;

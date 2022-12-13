/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  env: {
    NAVER_API_ID: process.env.NAVER_API_ID,
    NAVER_API_SECRET: process.env.NAVER_API_SECRET,
  },
});

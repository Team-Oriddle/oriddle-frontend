/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "test-oriddle-bucket.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;

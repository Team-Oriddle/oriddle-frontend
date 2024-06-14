/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "test-oriddle-bucket.s3.ap-northeast-2.amazonaws.com",
      'orridle.s3.ap-northeast-2.amazonaws.com',
      'www.youtube.com'
    ],
  },
  compiler:{
    styledComponents:true
  },
};

module.exports = nextConfig;

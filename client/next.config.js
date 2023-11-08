/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    NEXT_PUBLIC_ZEGO_APP_ID:293416460,
    NEXT_PUBLIC_ZEGO_SERVER_ID:"b5181de51b35e32999a6d8ed5ea8bf40"
  },
  images:{
    domains:["localhost"],
  }
};

module.exports = nextConfig;

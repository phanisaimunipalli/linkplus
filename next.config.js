/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/phanisaimunipalli/linkplus",
        permanent: false,
      },
    ];
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
  },
  webpack: (config) => {
    config.snapshot = {
      ...(config.snapshot || {}),
      managedPaths: [/^(.+?[\\/]node_modules[\\/])((?!next).)*$/],
    };
    return config;
  },
};

export default nextConfig;

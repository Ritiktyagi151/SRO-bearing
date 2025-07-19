/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.snapshot = {
      ...(config.snapshot || {}),
      // Add more extensions here if needed
      managedPaths: [/^(.+?[\\/]node_modules[\\/])((?!next).)*$/],
    };
    return config;
  },
};

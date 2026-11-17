/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  assetPrefix: '/Hariz-Harisun.github.io',
  turbopack: {
    plugins: {
      '@tailwindcss/turbopack': {
        content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './data/**/*.{js,jsx,ts,tsx}', './lib/**/*.{js,jsx,ts,tsx}'],
      },
    },
  },
};

export default nextConfig;

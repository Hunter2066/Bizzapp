/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // GitHub Pages doesn't support Next.js Image Optimization
};

export default nextConfig;



const nextConfig = {
  // output: 'export',
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  images: {
    unoptimized: true // needed if you use next/image with static export
  }
};

export default nextConfig;

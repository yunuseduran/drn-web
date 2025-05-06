/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Allow larger static assets and increase timeout
  staticPageGenerationTimeout: 180,
  
  // Configure assets handling
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Increase the maximum size for static assets
  experimental: {
    largePageDataBytes: 128 * 1024 * 1024, // 128MB
  },
  
  // Custom webpack config to handle large media files
  webpack: (config) => {
    // Add file-loader for video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },
};

export default nextConfig;

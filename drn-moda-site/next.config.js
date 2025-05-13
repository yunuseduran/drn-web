/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Allow larger static assets and increase timeout
  staticPageGenerationTimeout: 180,
  
  // Configure assets handling
  images: {
    domains: [
      'localhost', 
      '127.0.0.1',
      'strapi.io',
      'placehold.it',
      'picsum.photos',
      'source.unsplash.com',
      'images.unsplash.com',
      'cloudinary.com',
      'res.cloudinary.com'
    ],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  
  // URL yönlendirmeleri
  async redirects() {
    return [
      {
        source: '/urunlerimiz/page',
        destination: '/urunlerimiz',
        permanent: true,
      },
      {
        source: '/page',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Increase the maximum size for static assets
  experimental: {
    appDir: true,
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

module.exports = nextConfig;

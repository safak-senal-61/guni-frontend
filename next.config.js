/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cross-origin requests configuration
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
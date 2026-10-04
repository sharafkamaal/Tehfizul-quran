import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async headers() {
    // Static media never changes under the same name – let browsers and the CDN keep it
    const media = (source, maxAge) => ({
      source,
      headers: [{ key: 'Cache-Control', value: `public, max-age=${maxAge}, stale-while-revalidate=86400` }],
    });
    return [media('/images/:path*', 604800), media('/video/:path*', 2592000)];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
  },
};

export default withNextIntl(nextConfig);

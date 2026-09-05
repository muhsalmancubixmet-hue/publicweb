/** @type {import('next').NextConfig} */
const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://cubelogs-dashboard.vercel.app';

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/login',
        destination: `${dashboardUrl}/login`,
        permanent: false,
      },
      {
        source: '/login/:path*',
        destination: `${dashboardUrl}/login/:path*`,
        permanent: false,
      },
      {
        source: '/dashboard',
        destination: `${dashboardUrl}/dashboard`,
        permanent: false,
      },
      {
        source: '/dashboard/:path*',
        destination: `${dashboardUrl}/dashboard/:path*`,
        permanent: false,
      },
      {
        source: '/admin',
        destination: `${dashboardUrl}/admin`,
        permanent: false,
      },
      {
        source: '/admin/:path*',
        destination: `${dashboardUrl}/admin/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/generate/:path*',
                destination: process.env.STABILITY_HOST + '/v2beta/stable-image/generate/:path*', // The :path parameter isn't used here so will be automatically passed in the query
            },
        ]
    },
};

export default nextConfig;
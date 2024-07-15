/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        proxyTimeout: 120000
    },
    async rewrites() {
        return [
            {
                source: '/api/control/:path*',
                destination: process.env.STABILITY_HOST + '/v2beta/stable-image/control/:path*', // The :path parameter isn't used here so will be automatically passed in the query
            },
            {
                source: '/api/edit/:path*',
                destination: process.env.STABILITY_HOST + '/v2beta/stable-image/edit/:path*', // The :path parameter isn't used here so will be automatically passed in the query
            },
            {
                source: '/api/generate/:path*',
                destination: process.env.STABILITY_HOST + '/v2beta/stable-image/generate/:path*', // The :path parameter isn't used here so will be automatically passed in the query
            },
            {
                source: '/api/upscale/:path*',
                destination: process.env.STABILITY_HOST + '/v2beta/stable-image/upscale/:path*', // The :path parameter isn't used here so will be automatically passed in the query
            },
        ]
    },
};

export default nextConfig;
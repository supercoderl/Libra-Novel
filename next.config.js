/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io']
    },
    reactStrictMode: false,

};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = nextConfig;
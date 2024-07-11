/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
    images: {
        domains: ['utfs.io']
    },
    reactStrictMode: false,
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = withNextIntl({ nextConfig });
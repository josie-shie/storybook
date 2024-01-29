/**
 * @type {import('next').NextConfig}
 */

const path = require('node:path');

module.exports = {
    images: {
        domains: [
            'zq.titan007.com',
            'stickershop.line-scdn.net',
            'twtest8.s3.ap-northeast-1.amazonaws.com',
            'twtest8.s3.amazonaws.com',
            'fastly.picsum.photos',
            'cdn.sportnanoapi.com',
            'cdn.pixabay.com'
        ]
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack']
        });

        return config;
    },
    reactStrictMode: true,
    transpilePackages: ['ui', 'lib'],
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    typescript: {
        ignoreBuildErrors: true // TODO: for test
    },
    eslint: {
        ignoreDuringBuilds: true // TODO: for test
    }
};

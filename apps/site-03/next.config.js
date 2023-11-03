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
            'fastly.picsum.photos'
        ]
    },
    reactStrictMode: true,
    transpilePackages: ['ui', 'lib'],
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
};

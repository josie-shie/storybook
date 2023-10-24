/**
 * @type {import('next').NextConfig}
 */

const path = require('node:path');

module.exports = {
    reactStrictMode: true,
    transpilePackages: ['ui', 'lib'],
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js'
                }
            }
        }
    }
};

const path = require('node:path');

module.exports = {
    reactStrictMode: true,
    transpilePackages: ['ui', 'lib'],
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack']
        });

        return config;
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

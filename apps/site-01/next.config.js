const path = require('node:path');

module.exports = {
    reactStrictMode: true,
    transpilePackages: ['ui'],
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
};

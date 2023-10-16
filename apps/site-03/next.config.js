const path = require('node:path');

module.exports = {
    reactStrictMode: true,
    transpilePackages: ['ui', 'lib'],
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
};

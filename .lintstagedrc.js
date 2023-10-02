const path = require('path');

module.exports = {
    '*.{css,scss,ts,tsx,module.css,module.scss}': 'prettier --check --ignore-unknown',
    '*.{ts,tsx}': 'bash -c "pnpm lint"'
};

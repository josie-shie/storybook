const path = require('node:path');

const buildEslintCommand = filenames =>
    `next lint --fix --file ${filenames
        .map(f => path.relative(process.cwd(), f))
        .join(' --file ')}`;

module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
    '*.{module.css,css,scss,module.scss}': 'stylelint',
    '*.{css,scss,ts,tsx,module.css,module.scss}': 'prettier --check --ignore-unknown',
    '*.{ts,tsx}': 'bash -c "npm run typecheck"'
};

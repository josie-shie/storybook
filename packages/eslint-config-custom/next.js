const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
    extends: [
        '@vercel/style-guide/eslint/node',
        '@vercel/style-guide/eslint/browser',
        '@vercel/style-guide/eslint/typescript',
        '@vercel/style-guide/eslint/react',
        '@vercel/style-guide/eslint/next',
        'eslint-config-turbo'
    ].map(require.resolve),
    parserOptions: {
        project
    },
    globals: {
        React: true,
        JSX: true
    },
    settings: {
        'import/resolver': {
            typescript: {
                project
            }
        },
        react: {
            version: 'detect'
        }
    },
    ignorePatterns: ['node_modules/', 'dist/'],
    rules: {
        'import/no-default-export': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/react-in-jsx-scope': 'off',
        'prefer-const': 'error',
        'prefer-template': 'error',
        'react/jsx-uses-vars': 'error',
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
        '@typescript-eslint/no-explicit-any': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'import/no-extraneous-dependencies': 'off',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'unicorn/filename-case': [
            'error',
            {
                cases: {
                    camelCase: true
                }
            }
        ],
        'import/no-mutable-exports': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@next/next/no-html-link-for-pages': 'off'
    }
};

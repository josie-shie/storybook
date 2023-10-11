import type { Preview } from '@storybook/react';

if (typeof process === 'undefined') {
    global.process = {
        env: {
            NODE_ENV: 'development'
        }
    } as any;
}

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    }
};

export default preview;

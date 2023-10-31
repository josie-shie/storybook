import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
    title: 'Example/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Normal: Story = {
    args: {
        name: ['test', 'testest']
    }
};

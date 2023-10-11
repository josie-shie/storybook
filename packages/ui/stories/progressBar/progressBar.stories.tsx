import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './progressBar';

const meta: Meta<typeof ProgressBar> = {
    title: 'Example/ProgressBar',
    component: ProgressBar,
    tags: ['autodocs'],

    argTypes: {
        value: { control: { type: 'range', min: 0, max: 100 } },
        fill: { control: 'color' },
        background: { control: 'color' }
    }
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Normal: Story = {
    args: { value: 20 }
};

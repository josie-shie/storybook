import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './progressBar';

const meta: Meta<typeof ProgressBar> = {
    title: 'Example/ProgressBar',
    component: ProgressBar,
    tags: ['autodocs'],

    argTypes: {
        value: { control: { type: 'range', min: 0, max: 100 } },
        height: { control: { type: 'range', min: 1, max: 50 } },
        fill: { control: 'color' },
        background: { control: 'color' },
        gapSize: { control: 'radio', options: ['small', 'medium', 'large'] }
    }
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Sample1: Story = {
    args: {
        value: 50,
        height: 10,
        radius: true,
        skewGap: true,
        gapSize: 'large',
        fill: '#a0e3b8',
        background: '#75c9ef'
    }
};

export const Default: Story = {
    args: { value: 50, height: 20, radius: false, skewGap: false }
};

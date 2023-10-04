import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './drawer';
// import { useState } from 'react';

const meta: Meta<typeof Drawer> = {
    title: 'Example/Drawer',
    component: Drawer,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        coverBackground: { control: 'color' }
    }
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Normal: Story = {
    args: {
        isOpen: true,
        position: 'right',
        coverBackground: '#000',
        children: <h3>Demo</h3>
    }
};

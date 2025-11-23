import type { Meta, StoryObj } from '@storybook/react';
import { CustomSelect } from './select';

const meta: Meta<typeof CustomSelect> = {
    title: 'Example/Select',
    component: CustomSelect,
    tags: ['autodocs'],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof CustomSelect>;

export const Normal: Story = {
    args: {
        title: 'Set notification tone',
        options: [
            { label: 'Whistle', value: 'whistle' },
            { label: 'Drum', value: 'drum' },
            { label: 'Horn', value: 'horn' }
        ],
        value: null,
        showDragBar: false,
        showCloseButton: true,
        placeholder: 'Set notification sound'
    }
};

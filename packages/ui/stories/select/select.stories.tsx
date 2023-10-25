import type { Meta, StoryObj } from '@storybook/react';
import Select from './select';

const meta: Meta<typeof Select> = {
    title: 'Example/Select',
    component: Select,
    tags: ['autodocs'],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Normal: Story = {
    args: {
        title: '主队进球声音',
        options: [
            { label: '哨子声', value: 'whistle' },
            { label: '鼓声', value: 'drum' },
            { label: '号角声', value: 'horn' }
        ],
        value: null,
        showDragBar: false,
        showCloseButton: true,
        placeholder: '請選擇...'
    }
};

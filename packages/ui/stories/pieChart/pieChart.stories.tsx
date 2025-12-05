import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './pieChart';

const meta: Meta<typeof PieChart> = {
    title: 'Example/PieChart',
    component: PieChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        // coverBackground: { control: 'color' }
    }
};

export default meta;

type Story = StoryObj<typeof PieChart>;

const demoData = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' }
];

export const Normal: Story = {
    args: {
        data: demoData,
        title: 'Pie Chart',
        subTitle: 'From ExcelHome'
        // sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
    }
};

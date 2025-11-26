import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './lineChart';

const meta: Meta<typeof LineChart> = {
    title: 'Example/LineChart',
    component: LineChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        // coverBackground: { control: 'color' }
    }
};

export default meta;

type Story = StoryObj<typeof LineChart>;

const demoData = [
    {
        name: 'Mail income',
        type: 'line',
        stack: 'total',
        data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
        name: 'Group income',
        type: 'line',
        stack: 'total',
        data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
        name: 'Audio income',
        type: 'line',
        stack: 'total',
        data: [150, 232, 201, 154, 190, 330, 410]
    }
];

export const Normal: Story = {
    args: {
        title: 'AD line bar',
        subtext: 'From ExcelHome',
        sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5',
        trigger: 'axis',
        triggerType: 'shadow',
        legend: ['Mail income', 'Group income', 'Audio income'],
        xAxisData: ['Mon', 'Tue', 'Wen', 'Tur', 'Fir', 'Sat', 'Sun'],
        series: demoData
    }
};

import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './barChart';
// import { useState } from 'react';

const meta: Meta<typeof BarChart> = {
    title: 'Example/BarChart',
    component: BarChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        // coverBackground: { control: 'color' }
    }
};

export default meta;

type Story = StoryObj<typeof BarChart>;

const demoData = [
    {
        name: 'Auxiliary',
        type: 'bar',
        stack: 'total',
        itemStyle: {
            borderColor: 'rgba(146, 23, 23, 0)',
            color: 'rgba(11, 169, 187, 0)'
        },
        emphasis: {
            borderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
        },
        data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
    },
    {
        name: 'spend',
        type: 'bar',
        stack: 'total',
        label: {
            normal: {
                show: true,
                position: 'top'
            }
        },
        data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
    },
    {
        name: 'income',
        type: 'bar',
        stack: 'total',
        label: {
            normal: {
                show: true,
                position: 'bottom'
            }
        },
        data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
    }
];

export const Normal: Story = {
    args: {
        title: 'spend chart bar',
        subtext: 'From ExcelHome',
        sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5',
        trigger: 'axis',
        triggerType: 'shadow',
        legend: ['income', 'spend'],
        xAxisData: [
            '11/1',
            '11/2',
            '11/3',
            '11/4',
            '11/5',
            '11/6',
            '11/7',
            '11/8',
            '11/9',
            '11/10',
            '11/11'
        ],
        series: demoData
    }
};

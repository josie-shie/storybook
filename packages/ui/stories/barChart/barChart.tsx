import ReactECharts from 'echarts-for-react';

interface SeriesData {
    name: string;
    type: string;
    data: (string | number)[];
    stack?: string;
    label?: {
        normal?: {
            show?: boolean;
            position?: string;
        };
    };
    itemStyle?: {
        borderColor?: string;
        color?: string;
    };
    emphasis?: {
        color: string;
        borderColor: string;
    };
}

interface BarChartProps {
    /**
     * title of chart
     */
    title: string;
    /**
     * subtitle of chart
     */
    subtext?: string;
    /**
     * subtitle link
     */
    sublink?: string;
    /**
     * how to trigger the detailes
     */
    trigger: 'none' | 'item' | 'axis';
    /**
     * How is detailes showing
     */
    triggerType?: 'line' | 'shadow';
    /**
     * The types of data
     */
    legend: string[];
    /**
     * Drawer content padding
     */
    series: SeriesData[];
    /**
     * Cover background color
     */
    xAxisData: string[];
    /**
     *  Toggle Theme
     */
    toggleTheme?: () => void;
    /**
     *  Toggle ClassName
     */
    toggleClassName?: () => void;
}

function BarChart({
    title,
    subtext,
    sublink,
    legend,
    trigger = 'none',
    triggerType,
    xAxisData,
    series
}: BarChartProps) {
    const option = {
        title: {
            text: title,
            ...(subtext && { subtext: subtext }),
            ...(sublink && { sublink: sublink })
        },
        tooltip: {
            trigger: trigger,
            axisPointer: {
                type: triggerType
            }
        },
        legend: {
            data: legend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            splitLine: { show: false },
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: series
    };

    return <ReactECharts option={option} style={{ height: 400 }} />;
}

export { BarChart };

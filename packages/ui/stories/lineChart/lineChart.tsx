import ReactECharts from 'echarts-for-react';

interface LineChartSeriesData {
    name: string;
    type: string;
    data: (string | number)[];
    stack?: string;
    areaStyle?: { opacity: number };
}

interface LineChartProps {
    title: string;
    legend: string[];
    xAxisData: string[];
    subtext?: string;
    sublink?: string;
    trigger?: 'none' | 'item' | 'axis';
    triggerType?: 'line' | 'shadow';
    coverBackground?: boolean;
    series: LineChartSeriesData[];
}

function LineChart({
    title,
    subtext,
    sublink,
    legend,
    trigger = 'none',
    triggerType,
    xAxisData,
    coverBackground = false,
    series
}: LineChartProps) {
    const newSeries = coverBackground
        ? series
        : series.map(item => ({ ...item, areaStyle: { opacity: 0.4 } }));

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
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xAxisData
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: newSeries
    };

    return <ReactECharts option={option} style={{ height: 400 }} />;
}

export { LineChart };

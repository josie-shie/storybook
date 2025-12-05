import ReactECharts from 'echarts-for-react';

interface PieChartProps {
    fill?: boolean;
    data: { name: string; value: number }[];
    title: string;
    subTitle?: string;
}

function PieChart({ fill = true, title, data, subTitle }: PieChartProps) {
    const option = {
        title: {
            text: title,
            subtext: subTitle,
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        emphasis: {
            scale: false
        },
        series: [
            {
                name: title,
                type: 'pie',
                radius: fill ? '70%' : ['40%', '70%'],
                avoidLabelOverlap: false,
                labelLine: {
                    show: true
                },
                data
            }
        ]
    };

    return (
        <>
            {/* <h2>{title}</h2>
            <p>{subTitle}</p> */}
            <ReactECharts option={option} style={{ height: 400 }} />
        </>
    );
}

export { PieChart };

import ReactEcharts from 'echarts-for-react';
import style from './goalRangeChart.module.scss';

interface ChartType {
    class: string;
    label: string;
    value: number[];
    color: string;
}

function GoalRangeChart({ chartList }: { chartList: ChartType[] }) {
    const seriesList = chartList.map(item => ({
        value: item.value.length,
        name: item.label,
        itemStyle: { borderWidth: 2, borderColor: '#fff', color: item.color }
    }));

    const options = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: false,
            left: 'left'
        },
        series: [
            {
                name: '進球數區間',
                type: 'pie',
                radius: ['35%', '65%'],
                data: seriesList,
                label: {
                    distanceToLabelLine: -10
                },
                labelLine: {
                    show: false
                }
            }
        ]
    };
    return (
        <div className={style.goalRangeChart}>
            <div className={style.chartContainer}>
                <ReactEcharts option={options} style={{ width: '100%', height: '200px' }} />
            </div>
        </div>
    );
}

export default GoalRangeChart;

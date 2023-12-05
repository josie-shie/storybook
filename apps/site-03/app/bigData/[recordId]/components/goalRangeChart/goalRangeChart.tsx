import ReactEcharts from 'echarts-for-react';
import style from './goalRangeChart.module.scss';

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
            data: [
                {
                    value: 248,
                    name: '7以上',
                    itemStyle: { borderWidth: 2, borderColor: '#fff', color: '#FBB03B' }
                },
                {
                    value: 835,
                    name: '4-6',
                    itemStyle: { borderWidth: 2, borderColor: '#fff', color: '#4489FF' }
                },
                {
                    value: 780,
                    name: '2-3',
                    itemStyle: { borderWidth: 2, borderColor: '#fff', color: '#33AD1F' }
                },
                {
                    value: 1084,
                    name: '0-1',
                    itemStyle: { borderWidth: 2, borderColor: '#fff', color: '#6357F0' }
                }
            ],
            label: {
                distanceToLabelLine: -10
            },
            labelLine: {
                show: false
            }
        }
    ]
};

function GoalRangeChart() {
    return (
        <div className={style.goalRangeChart}>
            <div className={style.chartContainer}>
                <ReactEcharts option={options} style={{ width: '100%', height: '200px' }} />
            </div>
        </div>
    );
}

export default GoalRangeChart;

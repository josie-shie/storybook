import ReactEcharts from 'echarts-for-react';
import style from './fifteenMinutesChart.module.scss';

interface GoalType {
    goalsOver: number[];
    goalsUnder: number[];
}

const chartPosition = [
    ['20%', '20%'],
    ['50%', '20%'],
    ['80%', '20%'],
    ['20%', '70%'],
    ['50%', '70%'],
    ['80%', '70%']
];

const titlePosition = [
    { left: '20%', top: '30%' },
    { left: '50%', top: '30%' },
    { left: '80%', top: '30%' },
    { left: '20%', top: '80%' },
    { left: '50%', top: '80%' },
    { left: '80%', top: '80%' }
];

function FifteenMinutesChart({
    headers,
    minsGoalList = []
}: {
    headers: string[];
    minsGoalList: GoalType[];
}) {
    const upperList = minsGoalList.map(item => item.goalsOver.length);
    const lowerList = minsGoalList.map(item => item.goalsUnder.length);

    // 判断对应的pie是否有最小angle需要显示
    const thresholdPercentage = 1;
    const seriesList = headers.map((header, index) => {
        const total = upperList[index] + lowerList[index];
        const upperPercentage = (upperList[index] / total) * 100;
        const lowerPercentage = (lowerList[index] / total) * 100;

        const minAngle =
            (upperPercentage <= thresholdPercentage || lowerPercentage <= thresholdPercentage) &&
            upperPercentage > 0 &&
            lowerPercentage > 0
                ? 10
                : 0;

        return {
            type: 'pie',
            radius: '30%',
            center: chartPosition[index],
            encode: { itemName: '進球', value: header },
            label: { show: false },
            itemStyle: { borderWidth: 2, borderColor: '#FFF' },
            color: ['#00AC6E', '#FBB03B'],
            minAngle
        };
    });
    const titleList = headers.map((header, index) => ({
        subtext: header,
        left: titlePosition[index].left,
        top: titlePosition[index].top,
        textAlign: 'center'
    }));

    const options = {
        legend: {
            show: false
        },
        dataset: {
            source: [
                ['進球', ...headers],
                ['大', ...upperList],
                ['小', ...lowerList]
            ]
        },
        series: seriesList,
        title: titleList,
        tooltip: {
            trigger: 'item',
            triggerOn: 'click',
            showDelay: 500
        }
    };

    return (
        <div className={style.fifteenMinutesChart}>
            <div className={style.chartContainer}>
                <ReactEcharts option={options} style={{ width: '100%', height: '200px' }} />
            </div>
        </div>
    );
}

export default FifteenMinutesChart;

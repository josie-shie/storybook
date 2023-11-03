import ReactEcharts from 'echarts-for-react';
import style from './fifteenMinutesChart.module.scss';

const options = {
    legend: {
        show: false
    },
    tooltip: {},
    dataset: {
        source: [
            ['進球', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['大', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['小', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7]
        ]
    },
    series: [
        {
            type: 'pie',
            radius: '30%',
            center: ['20%', '20%'],
            encode: { itemName: '進球', value: '2012' },
            label: { show: false },
            itemStyle: { borderWidth: 2, borderColor: '#FFF' },
            color: ['#00AC6E', '#FBB03B']
        },
        {
            type: 'pie',
            radius: '30%',
            center: ['50%', '20%'],
            encode: { itemName: '進球', value: '2013' },
            label: { show: false },
            itemStyle: { borderWidth: 2, borderColor: '#FFF' }
        },
        {
            type: 'pie',
            radius: '30%',
            center: ['80%', '20%'],
            encode: { itemName: '進球', value: '2014' },
            label: { show: false },
            itemStyle: { borderWidth: 2, borderColor: '#FFF' }
        },
        {
            type: 'pie',
            radius: '30%',
            center: ['20%', '70%'],
            encode: { itemName: '進球', value: '2015' },
            label: { show: false },
            itemStyle: { borderWidth: 2, borderColor: '#FFF' }
        },
        {
            type: 'pie',
            radius: '30%',
            center: ['50%', '70%'],
            encode: { itemName: '進球', value: '2016' },
            label: { show: false },
            itemStyle: { borderWidth: 2, borderColor: '#FFF' }
        },
        {
            type: 'pie',
            radius: '30%',
            center: ['80%', '70%'],
            encode: { itemName: '進球', value: '2017' },
            label: { show: false },
            itemStyle: { borderWidth: 2, borderColor: '#FFF' }
        }
    ],
    title: [
        {
            subtext: '開場-14:59',
            left: '20%',
            top: '30%',
            textAlign: 'center'
        },
        {
            subtext: '15:00-29:59',
            left: '50%',
            top: '30%',
            textAlign: 'center'
        },
        {
            subtext: '30:00-半場',
            left: '80%',
            top: '30%',
            textAlign: 'center'
        },
        {
            subtext: '下半場-59:59',
            left: '20%',
            top: '80%',
            textAlign: 'center'
        },
        {
            subtext: '60:00-74:59',
            left: '50%',
            top: '80%',
            textAlign: 'center'
        },
        {
            subtext: '75:00-全場',
            left: '80%',
            top: '80%',
            textAlign: 'center'
        }
    ]
};

function FifteenMinutesChart() {
    return (
        <div className={style.fifteenMinutesChart}>
            <div className={style.chartContainer}>
                <ReactEcharts option={options} style={{ width: '100%', height: '200px' }} />
            </div>
            <div className={style.labelContainer}>
                <span>大</span>
                <span className={style.labelSmall}>小</span>
            </div>
        </div>
    );
}

export default FifteenMinutesChart;

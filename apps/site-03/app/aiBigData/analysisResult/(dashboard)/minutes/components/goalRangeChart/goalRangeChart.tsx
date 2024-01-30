import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useRef, useState } from 'react';
import style from './goalRangeChart.module.scss';
import 'chart.js/auto';

interface ChartType {
    legend: string;
    label: string;
    value: number[];
    color: string;
}

interface TooltipParams {
    seriesName: string;
    name: string;
    value: number;
    dataIndex: number;
    seriesIndex: number;
    color: string;
}

interface OptionType {
    tooltip: {
        show: boolean;
        trigger: string;
        triggerOn: string;
        backgroundColor: string;
        textStyle: {
            color: string;
            fontSize: number;
        };
        borderColor: string;
        borderWidth: number;
        padding: number;
        formatter: (params: TooltipParams) => string;
    };
    legend: {
        show: boolean;
        left: string;
    };
    series: {
        name: string;
        type: string;
        radius: string[];
        data: {
            value: number;
            name: string;
            itemStyle: {
                borderWidth: number;
                borderColor: string;
                color: string;
            };
        }[];
        label: {
            distanceToLabelLine: number;
        };
        labelLine: {
            show: boolean;
        };
        minAngle: number;
    }[];
}

function ActivedTooltip({ label }: { label: string }) {
    return `<div style="border-radius: 3px;display: flex;align-items: center;background-color: #FFF;">
            <strong style="color: #fff;background-color: #FF4343;padding: 6px 6px;">推</strong>
            <strong style="font-size: 12px;font-weight: 500;padding: 0 4px;">${label}</strong>
        </div>`;
}

function GoalRangeChart({ chartList }: { chartList: ChartType[] }) {
    const echartsRef: React.RefObject<ReactEcharts> = useRef(null);
    const [options, setOptions] = useState<OptionType>({} as OptionType);

    useEffect(() => {
        const seriesList = chartList
            .filter(item => item.value.length > 0)
            .map(item => {
                return {
                    value: item.value.length,
                    name: item.label,
                    itemStyle: { borderWidth: 2, borderColor: '#fff', color: item.color }
                };
            });

        const newOption: OptionType = {
            tooltip: {
                show: true,
                trigger: 'item',
                triggerOn: 'click',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                textStyle: {
                    color: '#000',
                    fontSize: 14
                },
                borderColor: '#FF4343',
                borderWidth: 1,
                padding: 0,
                formatter: function (params: TooltipParams) {
                    return ActivedTooltip({
                        label: params.name
                    });
                }
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
                    },
                    minAngle: 5
                }
            ]
        };

        setOptions(newOption);
    }, [chartList]);

    useEffect(() => {
        if (echartsRef.current) {
            const chartInstance = echartsRef.current.getEchartsInstance();
            chartInstance.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: 1
            });
        }
    }, [options, echartsRef]);

    return (
        <div className={style.goalRangeChart}>
            <div className={style.chartContainer}>
                <ReactEcharts
                    ref={echartsRef}
                    option={options}
                    style={{ width: '100%', height: '200px' }}
                />
            </div>
        </div>
    );
}

export default GoalRangeChart;

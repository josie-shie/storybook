import React, { useCallback, useEffect, useRef, useState } from 'react';
import type {
    ChartEvent,
    ActiveElement,
    ChartDataset,
    ChartData,
    Point,
    BubbleDataPoint,
    InteractionItem,
    ScriptableAndArray,
    Color,
    ScriptableContext
} from 'chart.js';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Switch } from 'ui/stories/switch/switch';
import dayjs from 'dayjs';
import type { Statistics, TimePeriod } from '@/app/aiBigData/analysisResult/analysisResultStore';
import { useAnalyticsResultStore } from '@/app/aiBigData/analysisResult/analysisResultStore';
import { useQueryFormStore } from '@/app/aiBigData/queryFormStore';
import style from './mixedLineChart.module.scss';
import RightArrowIcon from './img/rightArrow.svg';
import LeftArrowIcon from './img/leftArrow.svg';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

type TimeValue = 'day' | 'week';
type TabType = 'handicap' | 'overUnder';
type ChartDataType = (number | [number, number] | Point | BubbleDataPoint | null)[];

type CurrentDataType = Record<number, Statistics>;

interface BarColorConfig {
    borderColor: ScriptableAndArray<Color, ScriptableContext<'bar'>>;
    backgroundColor: ScriptableAndArray<Color, ScriptableContext<'bar'>>;
}
const transparentColor = 'rgba(0, 0, 0, 0)';
const highlightedBorderColor = 'rgba(217, 217, 217, 1)';

function useDetectScrollEnds({ node }: { node: React.RefObject<HTMLElement> }) {
    const [isAtTop, setIsAtTop] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const setTabSlideScroll = useAnalyticsResultStore.use.setTabSlideScroll();

    const handleScroll = useCallback(() => {
        if (node.current) {
            const { scrollLeft, scrollWidth, clientWidth } = node.current;
            const atRight = Math.abs(scrollLeft + clientWidth - scrollWidth) < 1;
            const atLeft = scrollLeft === 0;
            setIsAtTop(atLeft);
            setIsAtBottom(atRight);
        }
    }, [node]);

    const handleTouchStart = useCallback(
        (event: TouchEvent) => {
            if (node.current && node.current.contains(event.target as Node)) {
                setTabSlideScroll(false);
            }
        },
        [node, setTabSlideScroll]
    );

    const handleTouchEnd = useCallback(() => {
        if (node.current) {
            setTabSlideScroll(true);
        }
    }, [node, setTabSlideScroll]);

    useEffect(() => {
        const current = node.current;
        if (current) {
            current.addEventListener('scroll', handleScroll);
            current.addEventListener('touchstart', handleTouchStart);
            current.addEventListener('touchend', handleTouchEnd);

            return () => {
                current.removeEventListener('scroll', handleScroll);
                current.removeEventListener('touchstart', handleTouchStart);
                current.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [handleScroll, handleTouchEnd, handleTouchStart, node]);

    return { isAtTop, isAtBottom };
}

function MixedLineChart({
    chartData,
    tabType,
    setMatchIds,
    lengendLabels
}: {
    chartData: TimePeriod;
    tabType: TabType;
    setMatchIds: (val: number[]) => void;
    lengendLabels: { label: string; color: string }[];
}) {
    const node = useRef<HTMLDivElement>(null);
    // 偵測圖表是否滑動到最2边，如果是的話會把blur的效果移除/添加
    const { isAtTop, isAtBottom } = useDetectScrollEnds({ node });
    const [labels, setLabels] = useState<string[][]>([]);
    const [upperLineData, setUpperLineData] = useState<number[]>([]);
    const [lowerLineData, setLowerLineData] = useState<number[]>([]);
    const [barColorConfig, setBarColorConfig] = useState<BarColorConfig>({
        borderColor: new Array(0).fill(transparentColor),
        backgroundColor: new Array(0).fill(transparentColor)
    });
    const chartConfigData: ChartData = {
        labels,
        datasets: [
            {
                type: 'line' as const,
                label: lengendLabels[0].label,
                borderWidth: 2,
                borderColor: lengendLabels[0].color,
                tension: 0.4,
                data: [...upperLineData]
            },
            {
                type: 'line' as const,
                label: lengendLabels[1].label,
                backgroundColor: lengendLabels[1].color,
                tension: 0.4,
                pointRadius: 0,
                data: [...lowerLineData],
                borderWidth: 2
            },
            {
                type: 'bar' as const,
                label: '',
                data: new Array(lowerLineData.length).fill(110) as ChartDataType,
                borderWidth: 1,
                borderRadius: 4,
                barThickness: 64,
                categoryPercentage: 0.1,
                barPercentage: 0.1,
                ...barColorConfig
            }
        ]
    };

    const [clickedLabel, setClickedLabel] = useState(0);
    const [periodSwitch, setPeriodSwitch] = useState<TimeValue>('week');
    const [totalMatch, setTotalMatch] = useState(0);
    const startDate = useQueryFormStore.use.startDate();
    const endDate = useQueryFormStore.use.endDate();

    const handleClick = (event: ChartEvent, elements: ActiveElement[], chart: ChartJS) => {
        if (elements[2].index < 0) return;

        const firstElement: InteractionItem = elements[2];

        const dataIndex = firstElement.index;

        // 仅更改 pointRadius
        chart.config.data.datasets.forEach(dataset => {
            if (dataset.type === 'line') {
                (dataset as ChartDataset<'line'>).pointRadius = 0;
                (dataset as ChartDataset<'line'>).pointHoverRadius = 0;
            }
        });

        // 特定逻辑，例如高亮特定的条形图
        if (chart.data.datasets[firstElement.datasetIndex].type === 'bar') {
            const dataset = chart.data.datasets[firstElement.datasetIndex];

            if (Array.isArray(dataset.borderColor)) {
                dataset.borderColor.fill(transparentColor);
                dataset.borderColor[dataIndex] = highlightedBorderColor;
            }
        }

        setClickedLabel(dataIndex);
        chart.update();

        const data = chartData[periodSwitch][tabType][
            Object.keys(chartData[periodSwitch][tabType])[dataIndex]
        ] as Statistics;

        const matchList = Array.from(
            new Set([...(data.lowerMatchIds || []), ...(data.upperMatchIds || [])])
        );

        setMatchIds(matchList);
    };

    const options = {
        onClick: handleClick,
        elements: {
            point: {
                radius: 0
            },
            line: {
                fill: false
            }
        },
        layout: {
            padding: {
                top: 20
            }
        },
        responsive: false,
        interaction: {
            mode: 'index' as const,
            intersect: false
        },
        stacked: false,
        plugins: {
            title: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: false,
                position: 'left' as const,
                min: -10,
                max: 110,
                ticks: {
                    stepSize: 50,
                    callback(value: number) {
                        if (value > 100) {
                            return '100%';
                        }
                        if (value < 0) {
                            return '0%';
                        }
                        return `${value}%`;
                    }
                }
            },
            x: {
                display: true,
                ticks: {
                    color({ index }: { index: number }) {
                        if (index === clickedLabel) {
                            return 'red';
                        }
                        return 'black';
                    },
                    backgroundColor({ index }: { index: number }) {
                        if (index === clickedLabel) {
                            return 'red';
                        }
                        return 'black';
                    }
                },
                grid: {
                    display: false
                }
            }
        }
    };

    useEffect(() => {
        const newUpperLineData: number[] = [];
        const newLowerLineData: number[] = [];
        const arr: string[][] = [];

        let index = 1;
        let totalMatchCount = 0;

        for (const key in chartData[periodSwitch][tabType]) {
            if (Object.prototype.hasOwnProperty.call(chartData[periodSwitch][tabType], key)) {
                const dateItem = chartData[periodSwitch][tabType][key];

                const matchList = Array.from(
                    new Set([...(dateItem.upperMatchIds || []), ...(dateItem.lowerMatchIds || [])])
                );

                totalMatchCount += matchList.length;

                if (periodSwitch === 'week') {
                    arr.push([`W${index}`, `${dateItem.totalMatchIds?.length || 0}场`]);
                } else {
                    arr.push([dayjs(parseInt(key) * 1000).format('M/D'), `${matchList.length}场`]);
                }
                newUpperLineData.push(dateItem.upperPercentage);
                newLowerLineData.push(dateItem.lowerPercentage);
                index++;
            }
        }

        // 重置 borderColor 和 backgroundColor 为透明颜色的数组
        const cloneBarColorConfig = {
            borderColor: new Array(arr.length).fill(transparentColor),
            backgroundColor: new Array(arr.length).fill(transparentColor)
        };

        // 设置第一个 bar 的高亮颜色
        cloneBarColorConfig.backgroundColor[0] = transparentColor;
        cloneBarColorConfig.borderColor[0] = highlightedBorderColor;

        if (periodSwitch === 'week' && arr.length <= 3) {
            setPeriodSwitch('day');
        }

        setTotalMatch(totalMatchCount);
        setLabels(arr);
        setUpperLineData(newUpperLineData);
        setLowerLineData(newLowerLineData);
        setBarColorConfig(cloneBarColorConfig);
    }, [chartData, periodSwitch, tabType]);

    // 切換日/周、更新數據來源、大小或讓分等會重新取得第一個bar的matchIds
    useEffect(() => {
        if (labels.length) {
            const currentData: CurrentDataType = chartData[periodSwitch][tabType];
            const currentPeriodKeys = Object.keys(currentData);
            if (currentPeriodKeys.length > 0) {
                const currentPeriod = currentPeriodKeys[0] as unknown as keyof CurrentDataType;
                const firstBarData: Statistics = currentData[currentPeriod];
                const matchList = Array.from(
                    new Set([
                        ...(firstBarData.lowerMatchIds || []),
                        ...(firstBarData.upperMatchIds || [])
                    ])
                );
                setMatchIds(matchList);
            }
        }
    }, [labels, periodSwitch, tabType, chartData]);

    return (
        <div className={style.lineChart}>
            <div className={style.chartDetail}>
                <div className={style.dateRange}>
                    {startDate} ~ {endDate}, 总{totalMatch}场
                </div>
                {Object.keys(chartData.week[tabType]).length <= 3 ? null : (
                    <Switch
                        onChange={(value: TimeValue) => {
                            setPeriodSwitch(value);
                        }}
                        options={[
                            { label: '日', value: 'day' },
                            { label: '周', value: 'week' }
                        ]}
                        value={periodSwitch}
                    />
                )}
            </div>
            <div className={style.legend}>
                {lengendLabels.map((leagend, index) => (
                    <div
                        className={style.label}
                        key={`chart_${index.toString()}`}
                        style={{ color: leagend.color }}
                    >
                        <div className={style.circle} style={{ backgroundColor: leagend.color }} />
                        {leagend.label}
                    </div>
                ))}
            </div>
            <div
                className={style.blurCoverTop}
                style={{
                    display: !isAtTop ? 'flex' : 'none'
                }}
            >
                <LeftArrowIcon />
            </div>
            <div
                className={style.blurCoverBottom}
                style={{
                    display: !isAtBottom ? 'flex' : 'none'
                }}
            >
                <RightArrowIcon />
            </div>
            <div className={style.chartContainer}>
                <div className={style.yAsix}>
                    <div className={`${style.label} ${style.redLabel}`}>100%</div>
                    <div className={`${style.label} ${style.greyLabel}`}>50%</div>
                </div>
                <div className={style.chart} ref={node}>
                    <div className={style.chartScroll}>
                        <Chart
                            data={chartConfigData}
                            options={options}
                            style={{ height: '184px' }}
                            type="bar"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MixedLineChart;

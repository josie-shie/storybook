import { useEffect, useState } from 'react';
import type {
    StatisticsCategories,
    Statistics
} from '@/app/aiBigData/analysisResult/analysisResultStore';
import style from './barChart.module.scss';

const calculateHeight = (data: Record<string, Statistics>) => {
    let upper = 0;
    let lower = 0;
    let draw = 0;

    Object.keys(data).forEach(date => {
        const item = data[date];
        upper += item.upper;
        lower += item.lower;
        draw += item.draw;
    });

    const total = upper + draw + lower;
    let upperHeight = Math.floor((upper / total) * 100);
    let drawHeight = Math.floor((draw / total) * 100);
    let lowerHeight = Math.floor((lower / total) * 100);

    const heights = [upperHeight, drawHeight, lowerHeight];
    const minHeightIndex = heights.findIndex(h => h < 1 && h > 0);
    if (minHeightIndex !== -1) {
        const adjustment = 2 - heights[minHeightIndex];
        heights[minHeightIndex] = 2; // 将小于1%的部分调整至2%，让画面有最小高度显示

        const maxIndex = heights.indexOf(Math.max(...heights));
        heights[maxIndex] -= adjustment; // 从最大的数值中扣，维持整体100%
    }

    // 处理由于向下取整造成的误差
    const totalHeight = upperHeight + drawHeight + lowerHeight;
    const error = 100 - totalHeight;

    // 分配剩余的百分比，优先分配给大于 0 的最小值
    if (error > 0) {
        const checkHeights = [upperHeight, drawHeight, lowerHeight];
        const minIndex = checkHeights.reduce(
            (minIdx, current, idx, arr) => {
                return current > 0 && current < arr[minIdx] ? idx : minIdx;
            },
            checkHeights.findIndex(h => h > 0)
        );

        // 根据找到的索引分配 error
        if (minIndex === 0) upperHeight += error;
        else if (minIndex === 1) drawHeight += error;
        else if (minIndex === 2) lowerHeight += error;
    }

    // 确保没有一个值是负数
    upperHeight = Math.max(0, upperHeight);
    drawHeight = Math.max(0, drawHeight);
    lowerHeight = Math.max(0, lowerHeight);

    return { upperHeight, drawHeight, lowerHeight };
};

function BarChart({ chartData }: { chartData: StatisticsCategories }) {
    const [handicap, setHandicap] = useState({ upper: 0, lower: 0 });
    const [overUnder, setOverUnder] = useState({ over: 0, under: 0 });
    const [moneyLine, setMoneyLine] = useState({ home: 0, away: 0, draw: 0 });

    useEffect(() => {
        const newHandicap = calculateHeight(chartData.handicap);
        const newOverUnder = calculateHeight(chartData.overUnder);
        const newMoneyLine = calculateHeight(chartData.moneyLine);

        setHandicap({ upper: newHandicap.upperHeight, lower: newHandicap.lowerHeight });
        setOverUnder({ over: newOverUnder.upperHeight, under: newOverUnder.lowerHeight });
        setMoneyLine({
            home: newMoneyLine.upperHeight,
            away: newMoneyLine.lowerHeight,
            draw: newMoneyLine.drawHeight
        });
    }, [chartData]);

    return (
        <div className={style.eChat}>
            <ul>
                <li>
                    <div className={style.title}>全场让分</div>
                    <div className={style.bar}>
                        <div
                            className={`${style.block} ${style.top}`}
                            style={{
                                height: `${handicap.upper}%`,
                                display: !handicap.upper ? 'none' : 'inherit',
                                borderBottomLeftRadius: handicap.lower <= 0 ? '4px' : 0,
                                borderBottomRightRadius: handicap.lower <= 0 ? '4px' : 0
                            }}
                        >
                            {handicap.upper > 16 ? `上${handicap.upper}%` : null}
                        </div>
                        <div
                            className={`${style.block} ${style.bottom}`}
                            style={{
                                height: `${handicap.lower}%`,
                                display: !handicap.lower ? 'none' : 'flex',
                                borderTopLeftRadius: handicap.upper <= 0 ? '4px' : 0,
                                borderTopRightRadius: handicap.upper <= 0 ? '4px' : 0
                            }}
                        >
                            {handicap.lower > 16 ? `下${handicap.lower}%` : null}
                        </div>
                    </div>
                </li>
                <li>
                    <div className={style.title}>全场大小</div>
                    <div className={style.bar}>
                        <div
                            className={`${style.block} ${style.top}`}
                            style={{
                                height: `${overUnder.over}%`,
                                display: !overUnder.over ? 'none' : 'inherit',
                                borderBottomLeftRadius: overUnder.under <= 0 ? '4px' : 0,
                                borderBottomRightRadius: overUnder.under <= 0 ? '4px' : 0
                            }}
                        >
                            {overUnder.over > 16 ? `大${overUnder.over}%` : null}
                        </div>
                        <div
                            className={`${style.block} ${style.bottom}`}
                            style={{
                                height: `${overUnder.under}%`,
                                display: !overUnder.under ? 'none' : 'flex',
                                borderTopLeftRadius: overUnder.over <= 0 ? '4px' : 0,
                                borderTopRightRadius: overUnder.over <= 0 ? '4px' : 0
                            }}
                        >
                            {overUnder.under > 16 ? `小${overUnder.under}%` : null}
                        </div>
                    </div>
                </li>
                <li>
                    <div className={style.title}>全场独赢</div>
                    <div className={style.bar}>
                        <div
                            className={`${style.block} ${style.top}`}
                            style={{
                                height: `${moneyLine.home}%`,
                                display: !moneyLine.home ? 'none' : 'inherit',
                                borderBottomLeftRadius:
                                    moneyLine.draw || moneyLine.away > 0 ? 0 : '4px',
                                borderBottomRightRadius:
                                    moneyLine.draw || moneyLine.away > 0 ? 0 : '4px'
                            }}
                        >
                            {moneyLine.home > 16 ? `主${moneyLine.home}%` : null}
                        </div>
                        <div
                            className={`${style.block} ${style.middle}`}
                            style={{
                                height: `${moneyLine.draw}%`,
                                display: !moneyLine.draw ? 'none' : 'flex',
                                borderTopLeftRadius: moneyLine.home > 0 ? 0 : '4px',
                                borderTopRightRadius: moneyLine.home > 0 ? 0 : '4px',
                                borderBottomLeftRadius: moneyLine.away > 0 ? 0 : '4px',
                                borderBottomRightRadius: moneyLine.away > 0 ? 0 : '4px'
                            }}
                        >
                            {moneyLine.draw > 16 ? `和${moneyLine.draw}%` : null}
                        </div>
                        <div
                            className={`${style.block} ${style.bottom}`}
                            style={{
                                height: `${moneyLine.away}%`,
                                display: !moneyLine.away ? 'none' : 'flex',
                                borderTopLeftRadius: moneyLine.home > 0 ? 0 : '4px',
                                borderTopRightRadius: moneyLine.home > 0 ? 0 : '4px'
                            }}
                        >
                            {moneyLine.away > 16 ? `客${moneyLine.away}%` : null}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default BarChart;

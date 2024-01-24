import { useEffect, useState } from 'react';
import style from './barChart.module.scss';
import {
    StatisticsCategories,
    Statistics
} from '@/app/aiBigData/analysisResult/analysisResultStore';

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

    // 分配剩余的百分比，可以优先分配给最小值，或者平均分配
    if (error > 0) {
        const minIndex = [upperHeight, drawHeight, lowerHeight].indexOf(
            Math.min(upperHeight, drawHeight, lowerHeight)
        );
        if (minIndex === 0) upperHeight += error;
        else if (minIndex === 1) drawHeight += error;
        else if (minIndex === 2) lowerHeight += error;
    }

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
                                height: `${handicap.upper}%`
                            }}
                        >
                            {handicap.upper}%
                        </div>
                        <div
                            className={`${style.block} ${style.bottom}`}
                            style={{
                                height: `${handicap.lower}%`
                            }}
                        >
                            {handicap.lower}%
                        </div>
                    </div>
                </li>
                <li>
                    <div className={style.title}>全场大小</div>
                    <div className={style.bar}>
                        <div
                            className={`${style.block} ${style.top}`}
                            style={{
                                height: `${overUnder.over}%`
                            }}
                        >
                            {overUnder.over}%
                        </div>
                        <div
                            className={`${style.block} ${style.bottom}`}
                            style={{
                                height: `${overUnder.under}%`
                            }}
                        >
                            {overUnder.under}%
                        </div>
                    </div>
                </li>
                <li>
                    <div className={style.title}>全场独赢</div>
                    <div className={style.bar}>
                        <div
                            className={`${style.block} ${style.top}`}
                            style={{
                                height: `${moneyLine.home}%`
                            }}
                        >
                            {moneyLine.home}%
                        </div>
                        <div
                            className={`${style.block} ${style.middle}`}
                            style={{
                                height: `${moneyLine.away}%`
                            }}
                        >
                            {moneyLine.away}%
                        </div>
                        <div
                            className={`${style.block} ${style.bottom}`}
                            style={{
                                height: `${moneyLine.draw}%`
                            }}
                        >
                            {moneyLine.draw}%
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default BarChart;

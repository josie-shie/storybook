import { ProgressBar } from 'ui/stories/progressBar/progressBar';
import style from './analyze.module.scss';
import { useGuessDetailStore } from './guessDetailStore';

interface AnalyzeProps {
    homeType: string;
    awayType: string;
}

function AnalyzeColumn({ homeType, awayType }: AnalyzeProps) {
    const highWinRateTrend = useGuessDetailStore.use.highWinRateTrend();

    const calculatePercentage = (a: number, b: number) => {
        if (b === 0) {
            return 0;
        }
        const percentage = Math.round((a / (a + b)) * 100);
        return percentage;
    };
    const leftValue = homeType === '主' ? highWinRateTrend.home : highWinRateTrend.over;
    const rightValue = homeType === '主' ? highWinRateTrend.away : highWinRateTrend.under;
    const leftPercent =
        homeType === '主'
            ? calculatePercentage(highWinRateTrend.home, highWinRateTrend.away)
            : calculatePercentage(highWinRateTrend.over, highWinRateTrend.under);
    const rightPercent = 100 - leftPercent;

    return (
        <div className={style.column}>
            <div className={style.button}>
                <span className={style.team}>{homeType}</span>
                <span className={style.user}>{leftPercent}%</span>
            </div>
            <div className={style.progress}>
                <div className={style.play}>
                    <span className={style.home}>{leftValue}</span>
                    <span className={style.ing}>一球/球半</span>
                    <span className={style.away}>{rightValue}</span>
                </div>
                <ProgressBar
                    background="#c3c3c3"
                    fill="#276ce1"
                    gapSize="large"
                    height={10}
                    radius
                    skewGap
                    value={leftPercent}
                />
            </div>
            <div className={style.button}>
                <span className={style.team}>{awayType}</span>
                <span className={style.user}>{rightPercent}%</span>
            </div>
        </div>
    );
}

export default AnalyzeColumn;

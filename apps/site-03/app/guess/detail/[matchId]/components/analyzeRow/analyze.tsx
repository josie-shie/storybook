import { ProgressBar } from 'ui/stories/progressBar/progressBar';
import { useGuessDetailStore } from '../../guessDetailStore';
import style from './analyze.module.scss';

interface AnalyzeProps {
    homeType: string;
    awayType: string;
    isLocked: boolean;
}

function AnalyzeRow({ homeType, awayType, isLocked }: AnalyzeProps) {
    const highWinRateTrend = useGuessDetailStore.use.highWinRateTrend();

    const calculatePercentage = (a: number, b: number) => {
        if (a === 0 && b === 0) {
            return 50; // 兩邊都為 0，讓 progressbar 置中
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
        <div className={`${style.row} ${isLocked ? style.locked : ''}`}>
            <div className={style.button}>
                <span className={style.team}>{homeType}</span>
                <span className={style.user}>{leftPercent}%</span>
            </div>
            <div className={style.progress}>
                <div className={style.play}>
                    <span className={style.home}>{isLocked ? 88 : leftValue}</span>
                    <span className={style.ing}>一球/球半</span>
                    <span className={style.away}>{isLocked ? 88 : rightValue}</span>
                </div>
                <ProgressBar
                    background={isLocked ? '#F3F3F3' : '#DCE9FF'}
                    fill={isLocked ? '#F3F3F3' : '#276ce1'}
                    height={10}
                    radius
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

export default AnalyzeRow;

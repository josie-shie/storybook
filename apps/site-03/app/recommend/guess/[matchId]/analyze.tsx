import { ProgressBar } from 'ui/stories/progressBar/progressBar';
import style from './analyze.module.scss';

interface AnalyzeProps {
    homeType: string;
    awayType: string;
    homeUser: number;
    awayUser: number;
    value: number;
}

function AnalyzeColumn({ homeType, awayType, homeUser, awayUser, value }: AnalyzeProps) {
    return (
        <div className={style.column}>
            <div className={style.button}>
                <span className={style.team}>{homeType}</span>
                <span className={style.user}>{homeUser}人</span>
            </div>
            <div className={style.progress}>
                <div className={style.play}>
                    <span className={style.home}>88%</span>
                    <span className={style.ing}>一球/球半</span>
                    <span className={style.away}>4%</span>
                </div>
                <ProgressBar
                    background="#c3c3c3"
                    fill="#276ce1"
                    gapSize="large"
                    height={10}
                    radius
                    skewGap
                    value={value}
                />
            </div>
            <div className={style.button}>
                <span className={style.team}>{awayType}</span>
                <span className={style.user}>{awayUser}人</span>
            </div>
        </div>
    );
}

export default AnalyzeColumn;

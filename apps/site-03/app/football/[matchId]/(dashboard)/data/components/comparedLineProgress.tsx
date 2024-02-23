import LinearProgress from '@mui/material/LinearProgress';
import style from './comparedLineProgress.module.scss';

function ComparedLineProgress({
    title,
    homeValue,
    homeProgress,
    awayValue,
    awayProgress
}: {
    title: string;
    homeValue: string;
    homeProgress: number;
    awayValue: string;
    awayProgress: number;
}) {
    return (
        <div className={style.comparedLineProgress}>
            <div className={style.progressCard}>
                <div className={style.topBar}>
                    <div className={style.value}>{homeValue}</div>
                    <div className={style.title}>{title}</div>
                    <div className={style.value}>{awayValue}</div>
                </div>
                <div className={style.progressBar}>
                    <div className={style.homeProgressBar}>
                        <LinearProgress
                            className={style.homeProgress}
                            value={homeProgress}
                            variant="determinate"
                        />
                    </div>
                    <div className={style.awayProgressBar}>
                        <LinearProgress
                            className={style.awayProgress}
                            value={awayProgress}
                            variant="determinate"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComparedLineProgress;

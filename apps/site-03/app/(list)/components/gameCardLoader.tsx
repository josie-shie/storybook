import { Skeleton } from '@mui/material';
import style from './gameCard.module.scss';
import CornerIcon from './img/corner.svg';

function TopArea() {
    return (
        <div className={style.topArea}>
            <div className={style.left}>
                <div className={style.league}>
                    <Skeleton sx={{ fontSize: '12px' }} variant="text" width={30} />
                </div>
                <div className={`${style.time}  ui-game-card-time`} suppressHydrationWarning>
                    <Skeleton sx={{ fontSize: '12px' }} variant="text" width={30} />
                </div>
                <div className={style.halfScore} suppressHydrationWarning>
                    0-0
                </div>
            </div>
            <div className={style.mid}>
                <Skeleton sx={{ fontSize: '12px' }} variant="text" width={12} />
            </div>
            <div className={style.right} suppressHydrationWarning>
                <div className={style.corner} suppressHydrationWarning>
                    <CornerIcon className={style.cornerIcon} suppressHydrationWarning />0 - 0
                </div>
                <div className={`${style.resultBar}`} suppressHydrationWarning>
                    <Skeleton sx={{ fontSize: '12px' }} width={28} />
                    <Skeleton sx={{ fontSize: '12px' }} width={12} />
                </div>
            </div>
        </div>
    );
}

function TeamInfo() {
    return (
        <div className={style.teamInfo}>
            <div className={`${style.homeTeam} ${style.team}`}>
                <div className={style.cards}>
                    <Skeleton height={14} variant="rounded" width={10} />
                </div>
                <div className={style.teamName} suppressHydrationWarning>
                    <Skeleton sx={{ fontSize: '14px' }} variant="text" width={84} />
                </div>
            </div>
            <div
                className={`${style.score} ui-game-card-score ${style.finishScore} `}
                suppressHydrationWarning
            >
                0 - 0
            </div>
            <div className={`${style.awayTeam} ${style.team}`}>
                <div className={style.teamName} suppressHydrationWarning>
                    <Skeleton sx={{ fontSize: '14px' }} variant="text" width={84} />
                </div>
                <div className={style.cards}>
                    <Skeleton height={14} variant="rounded" width={10} />
                </div>
            </div>
        </div>
    );
}

function GameCardLoader() {
    const list = Array.from({ length: 10 });
    return (
        <ul>
            {list.map((_, idx) => (
                <li className={`${style.gameCard} ui-game-card`} key={idx}>
                    <div className={style.gameCardLink}>
                        <TopArea />
                        <TeamInfo />
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default GameCardLoader;

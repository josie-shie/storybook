import style from './periodListItem.module.scss';
import Soccer from './img/soccer.svg';
import Avatar from '@/components/avatar/avatar';

interface PropsType {
    ranking: number;
    avatar?: string;
    name?: string;
    record?: number;
    victory?: number;
    defeat?: number;
    winRate?: number;
}

function PeriodListItem({
    ranking,
    avatar,
    name = '老梁聊球',
    record = 0,
    victory = 0,
    defeat = 0,
    winRate = 0
}: PropsType) {
    const rankingClass = ranking > 0 && ranking < 6 ? style[`ranking${ranking}`] : '';

    return (
        <div className={style.periodListItem}>
            <div className={`${style.rankingFlag} ${rankingClass}`}>{ranking}</div>
            <div className={style.avatarContainer}>
                <Avatar src={avatar} />
            </div>
            <div className={style.content}>
                <div className={style.name}>{name}</div>
                <div className={style.detail}>
                    <div>战绩: {record}场</div>
                    <div>
                        胜负: <span className={style.victory}>{victory}</span>/{defeat}
                    </div>
                </div>
            </div>
            <div className={style.winRateBlock}>
                {winRate >= 90 && <Soccer className={style.icon} />}
                <span className={`${style.winRate} ${winRate >= 90 ? style.redFill : ''}`}>
                    <span>{winRate}</span>
                    <span className={style.percent}>%</span>
                </span>
            </div>
        </div>
    );
}

export default PeriodListItem;

import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/avatar/avatar';
import BaseNoData from '@/components/baseNoData/noData';
import { useRankStore } from '../../rank/rankStore';
import style from './periodListItem.module.scss';
import Soccer from './img/soccer.png';
import Crown from './img/crown.png';
import Rank from './img/rank.png';

function PeriodListItem() {
    const rankList = useRankStore.use.rankList();
    const onlyShowToday = useRankStore.use.onlyShowToday();

    const rankingClass = (ranking: number) => {
        return ranking > 0 && ranking < 6 ? style[`ranking${ranking}`] : '';
    };

    if (rankList.length === 0) return <BaseNoData />;
    return (
        <>
            {rankList.map(item => {
                const hasHighWinRate = item.hitRate >= 90;
                if (onlyShowToday && !item.today) return null;

                return (
                    <Link
                        className={style.periodListItem}
                        href={`/master/masterAvatar/${item.memberId}?status=analysis`}
                        key={item.memberId}
                    >
                        <div className={`${style.rankingFlag} ${rankingClass(item.ranking)}`}>
                            {item.ranking > 3 ? (
                                <Image alt="" height={24} src={Rank} width={24} />
                            ) : (
                                <Image alt="" height={24} src={Crown} width={24} />
                            )}
                            <span>{item.ranking}</span>
                        </div>
                        <div className={style.avatarContainer}>
                            <Avatar src={item.memberAvatar} />
                        </div>
                        <div className={style.content}>
                            <div className={style.name}>{item.memberName}</div>
                            <div className={style.detail}>
                                <div>战绩: {item.totalMatches}场</div>
                                <div>
                                    胜负: <span className={style.victory}>{item.totalWin}</span>/
                                    {item.totalLose}
                                </div>
                            </div>
                        </div>
                        <div className={style.winRateBlock}>
                            {hasHighWinRate ? (
                                <Image alt="icon" className={style.icon} src={Soccer} />
                            ) : null}
                            <span
                                className={`${style.winRate} ${
                                    hasHighWinRate ? style.redFill : ''
                                }`}
                            >
                                <span>{Math.floor(item.hitRate)}</span>
                                <span className={style.percent}>%</span>
                            </span>
                        </div>
                    </Link>
                );
            })}
        </>
    );
}

export default PeriodListItem;

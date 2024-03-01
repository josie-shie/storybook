import Image from 'next/image';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import type { GuessRank } from 'data-center';
import Avatar from '@/components/avatar/avatar';
import BaseNoData from '@/components/baseNoData/noData';
import { useRankStore } from '../../rankStore';
import style from './periodListItem.module.scss';
import Soccer from './img/soccerNew.png';
import Rank from './img/rank.png';

function PeriodListItem({
    isLoading,
    status
}: {
    isLoading: boolean;
    status: 'week' | 'month' | 'season';
}) {
    const weekRankList = useRankStore.use.weekRankList();
    const monthRankList = useRankStore.use.monthRankList();
    const seasonRankList = useRankStore.use.seasonRankList();
    const rankListMap = {
        week: weekRankList,
        month: monthRankList,
        season: seasonRankList
    };
    const rankList = rankListMap[status];
    const onlyShowToday = useRankStore.use.onlyShowToday();
    const filteredRankList = onlyShowToday
        ? rankList.filter((item: GuessRank) => item.today)
        : rankList;

    if (isLoading)
        return (
            <div className={style.loadingBlock}>
                <CircularProgress size={24} />
            </div>
        );
    if (filteredRankList.length === 0) return <BaseNoData text="暂无资料" />;
    return (
        <>
            {filteredRankList.map(item => {
                const hasHighWinRate = item.ranking <= 10;
                return (
                    <Link
                        className={style.periodListItem}
                        href={`/master/memberAvatar/${item.memberId}?status=guess`}
                        key={item.memberId}
                    >
                        <div className={style.rankingFlag}>
                            {item.ranking <= 50 && (
                                <Image alt="" height={24} src={Rank} width={24} />
                            )}
                            <span>{item.ranking}</span>
                        </div>
                        <div className={style.avatarContainer}>
                            <Avatar
                                shadow
                                src={item.memberAvatar === '0' ? '' : item.memberAvatar}
                            />
                        </div>
                        <div className={style.content}>
                            <div className={style.name}>{item.memberName}</div>
                            <div className={style.detail}>
                                <div>战绩: {item.totalMatches}场</div>
                                <div>
                                    胜负: <span className={style.victory}>{item.totalWin}</span>/
                                    <span className={style.lose}>{item.totalLose}</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.winRateBlock}>
                            {hasHighWinRate ? (
                                <Image alt="icon" className={style.icon} src={Soccer} />
                            ) : null}
                            <span className={`${style.winRate} ${style.redFill}`}>
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

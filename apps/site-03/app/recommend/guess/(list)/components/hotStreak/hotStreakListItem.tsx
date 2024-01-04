import Image from 'next/image';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@/components/avatar/avatar';
import BaseNoData from '@/components/baseNoData/noData';
import { useMasterRankStore } from '../../masterRank/masterRankStore';
import style from './hotStreakListItem.module.scss';
import Streak from './img/streak.png';
import Rank from './img/rank.png';

function HotStreakListItem() {
    const masterRankList = useMasterRankStore.use.masterRankList();
    const onlyShowToday = useMasterRankStore.use.onlyShowToday();
    const isLoading = useMasterRankStore.use.isLoading();

    if (isLoading)
        return (
            <div className={style.loadingBlock}>
                <CircularProgress size={24} />
            </div>
        );
    if (masterRankList.length === 0) return <BaseNoData text="暂无资料" />;
    return (
        <>
            {masterRankList.map(item => {
                if (onlyShowToday && !item.today) return null;

                return (
                    <Link
                        className={style.hotStreakListItem}
                        href={`/master/masterAvatar/${item.memberId}?status=analysis`}
                        key={item.memberId}
                    >
                        <div className={style.rankingFlag}>
                            <Image alt="" height={24} src={Rank} width={24} />
                            <span>{item.ranking}</span>
                        </div>
                        <div className={style.avatarContainer}>
                            <Avatar src={item.memberAvatar === '0' ? '' : item.memberAvatar} />
                        </div>
                        <div className={style.content}>
                            <div className={style.name}>{item.memberName}</div>
                            <div className={style.streak}>
                                <div className={style.current}>
                                    <Image
                                        alt="streakIcon"
                                        className={style.streakIcon}
                                        src={Streak}
                                    />
                                    <span className={style.label}>当前:</span>{' '}
                                    {item.currentMaxWinStreak}
                                    連紅
                                </div>
                                <div className={style.highest}>
                                    <Image
                                        alt="streakIcon"
                                        className={style.streakIcon}
                                        src={Streak}
                                    />
                                    <span className={style.label}>历史最高:</span>{' '}
                                    {item.historyMaxWinStreak}連紅
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </>
    );
}

export default HotStreakListItem;

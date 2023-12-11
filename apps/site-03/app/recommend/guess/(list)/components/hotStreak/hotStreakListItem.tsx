import Image from 'next/image';
import { useMasterRankStore } from '../../masterRank/masterRankStore';
import style from './hotStreakListItem.module.scss';
import Streak from './img/streak.png';
import Crown from './img/crown.png';
import Rank from './img/rank.png';
import Avatar from '@/components/avatar/avatar';

function HotStreakListItem() {
    const masterRankList = useMasterRankStore.use.masterRankList();
    const onlyShowToday = useMasterRankStore.use.onlyShowToday();

    const rankingClass = (ranking: number) => {
        return ranking > 0 && ranking < 6 ? style[`ranking${ranking}`] : '';
    };

    return (
        <>
            {masterRankList.map(item => {
                if (onlyShowToday && !item.today) return null;

                return (
                    <div className={style.hotStreakListItem} key={item.memberId}>
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
                    </div>
                );
            })}
        </>
    );
}

export default HotStreakListItem;

import Image from 'next/image';
import { useMasterRankStore } from '../../masterRank/masterRankStore';
import style from './hotStreakListItem.module.scss';
import Streak from './img/streak.png';
import Avatar from '@/components/avatar/avatar';

function HotStreakListItem() {
    const masterRankList = useMasterRankStore.use.masterRankList();

    const rankingClass = (ranking: number) => {
        return ranking > 0 && ranking < 6 ? style[`ranking${ranking}`] : '';
    };

    return (
        <>
            {masterRankList.map(item => {
                return (
                    <div className={style.hotStreakListItem} key={item.name}>
                        <div className={`${style.rankingFlag} ${rankingClass(item.ranking)}`}>
                            {item.ranking}
                        </div>
                        <div className={style.avatarContainer}>
                            <Avatar src={item.avatar} />
                        </div>
                        <div className={style.content}>
                            <div className={style.name}>{item.name}</div>
                            <div className={style.streak}>
                                <div className={style.current}>
                                    <Image
                                        alt="streakIcon"
                                        className={style.streakIcon}
                                        src={Streak}
                                    />
                                    <span className={style.label}>当前:</span> {item.currentStreak}
                                    連紅
                                </div>
                                <div className={style.highest}>
                                    <Image
                                        alt="streakIcon"
                                        className={style.streakIcon}
                                        src={Streak}
                                    />
                                    <span className={style.label}>历史最高:</span>{' '}
                                    {item.highestStreak}連紅
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            ;
        </>
    );
}

export default HotStreakListItem;

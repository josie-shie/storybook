import Image from 'next/image';
import style from './hotStreakListItem.module.scss';
import Streak from './img/streak.png';
import Avatar from '@/components/avatar/avatar';

interface PropsType {
    ranking: number;
    avatar?: string;
    name?: string;
    currentStreak?: number;
    highestStreak?: number;
}

function HotStreakListItem({
    ranking,
    avatar,
    name = '老梁聊球',
    currentStreak = 0,
    highestStreak = 0
}: PropsType) {
    const rankingClass = ranking > 0 && ranking < 6 ? style[`ranking${ranking}`] : '';

    return (
        <div className={style.hotStreakListItem}>
            <div className={`${style.rankingFlag} ${rankingClass}`}>{ranking}</div>
            <div className={style.avatarContainer}>
                <Avatar src={avatar} />
            </div>
            <div className={style.content}>
                <div className={style.name}>{name}</div>
                <div className={style.streak}>
                    <div className={style.current}>
                        <Image alt="streakIcon" className={style.streakIcon} src={Streak} />
                        <span className={style.label}>当前:</span> {currentStreak}連紅
                    </div>
                    <div className={style.highest}>
                        <Image alt="streakIcon" className={style.streakIcon} src={Streak} />
                        <span className={style.label}>历史最高:</span> {highestStreak}連紅
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotStreakListItem;

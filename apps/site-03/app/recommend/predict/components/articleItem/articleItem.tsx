import { IconFlame } from '@tabler/icons-react';
import style from './articleItem.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import UnlockButton from '@/components/unlockButton/unlockButton';

interface PropsType {
    id: number;
    name: string;
    unlock: boolean;
    unlockNumber: number;
    hotStreak: number;
    ranking: number;
    title: string;
    cupName: string;
    cupTime: string;
    homeTeam: string;
    awayTeam: string;
    postTime: string;
}

function ArticleItem({ item }: { item: PropsType }) {
    return (
        <div className={style.articleItem}>
            <div className={style.user}>
                <div className={style.avatarContainer}>
                    <Avatar borderColor="#4489FF" />
                </div>
                <div className={style.userInfo}>
                    <div className={style.userName}>{item.name}</div>
                    <div className={style.tagsContainer}>
                        {item.hotStreak > 2 && (
                            <Tag icon={<IconFlame size={10} />} text={`${item.hotStreak}連紅`} />
                        )}
                        <Tag background="#4489FF" text={`月榜 ${item.ranking}`} />
                    </div>
                </div>
                <div className={style.unlockStatus}>
                    {item.unlock ? (
                        <span className={style.unlocked}>已解鎖</span>
                    ) : (
                        <>
                            <UnlockButton />
                            <span className={style.unlockNumber}>
                                已有{item.unlockNumber}人解鎖
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className={style.title}>{item.title}</div>
            <div className={style.game}>
                <div className={style.detail}>
                    {item.cupName}
                    <span className={style.time}> | {item.cupTime}</span>
                </div>
                <div className={style.combination}>
                    {item.homeTeam} vs {item.awayTeam}
                </div>
            </div>
            <div className={style.postTime}>发表于 {item.postTime}</div>
        </div>
    );
}

export default ArticleItem;

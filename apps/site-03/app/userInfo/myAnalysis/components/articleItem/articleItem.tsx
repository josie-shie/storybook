'use client';
// import { IconFlame } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { timestampToString } from 'lib';
import style from './articleItem.module.scss';
import Avatar from '@/components/avatar/avatar';
// import Tag from '@/components/tag/tag';

interface MemberTags {
    memberId: number;
    type: number;
    ranking: number;
}

interface GetUnlockPostProps {
    item: {
        postId: number;
        analysisTitle: string;
        analysisContent: string;
        predictionResult: string;
        mentorId: number;
        mentorName: string;
        avatarPath: string;
        matchId: number;
        leagueId: number;
        leagueName: string;
        homeTeamId: number;
        homeTeamName: string;
        awayTeamId: number;
        awayTeamName: string;
        matchTime: number;
        createdAt: number;
        predictStat: number;
        memberTags: MemberTags[];
    };
}

function ArticleItem({ item }: GetUnlockPostProps) {
    const router = useRouter();

    const goDetail = () => {
        router.push('/recommend/predict/1');
    };

    const goInfo = () => {
        router.push('/recommend/predict/masterAvatar');
    };

    return (
        <div className={style.articleItem}>
            <div className={style.user}>
                <div className={style.avatarContainer} onClick={goInfo}>
                    <Avatar borderColor="#4489FF" />
                </div>
                <div className={style.userInfo}>
                    <div className={style.userName}>{item.mentorName}</div>
                    {/* <div className={style.tagsContainer}>
                        {item.hotStreak > 2 && (
                            <Tag
                                icon={<IconFlame size={10} />}
                                text={`${item.hotStreak}連紅`}
                            />
                        )}
                        <Tag background="#4489FF" text={`月榜 ${item.ranking}`} />
                    </div> */}
                </div>
                <div className={style.unlockStatus}>
                    <span className={style.unlocked}>已解鎖</span>
                </div>
            </div>
            <div className={style.title}>{item.analysisTitle}</div>
            <div className={style.game} onClick={goDetail}>
                <div className={style.detail}>
                    {item.leagueName}
                    <span className={style.time}>
                        {' '}
                        | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                    </span>
                </div>
                <div className={style.combination}>
                    {item.homeTeamName} vs {item.awayTeamName}
                </div>
            </div>
            <div className={style.postTime}>
                发表于 {timestampToString(item.createdAt, 'YYYY-M-DD')}
            </div>
        </div>
    );
}

export default ArticleItem;

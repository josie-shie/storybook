'use client';
import { useRouter } from 'next/navigation';
import { timestampToString } from 'lib';
import Image from 'next/image';
import Tag from '@/components/tag/tag';
import Avatar from '@/components/avatar/avatar';
import Fire from '@/app/img/fire.png';
import style from './articleItem.module.scss';
import Win from './img/win.png';
import Lose from './img/lose.png';
import Draw from './img/draw.png';

interface Tags {
    id: number;
    tagName: string;
    note: string;
    colorCode: string;
    weekHitRecentTen: number;
    weekMaxAccurateStreak: number;
    weekHitMatches: number;
    weekTotalMatches: number;
    weekHitRate: number;
    weekHitRateDisplay: string;
    weekRanking: number;
    weekHistoryMaxWinStreak: number;
    monthHitRecentTen: number;
    monthMaxAccurateStreak: number;
    monthHitMatches: number;
    monthTotalMatches: number;
    monthHitRate: number;
    monthHitRateDisplay: string;
    monthRanking: number;
    monthHistoryMaxWinStreak: number;
    quarterHitRecentTen: number;
    quarterMaxAccurateStreak: number;
    quarterHitMatches: number;
    quarterTotalMatches: number;
    quarterHitRate: number;
    quarterHitRateDisplay: string;
    quarterRanking: number;
    quarterHistoryMaxWinStreak: number;
    winHitRecentTen: number;
    winMaxAccurateStreak: number;
    winHitMatches: number;
    winTotalMatches: number;
    winHitRate: number;
    winHitRateDisplay: string;
    winRanking: number;
    winHistoryMaxWinStreak: number;
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
        memberTags: Tags;
    };
}

function ArticleItem({ item }: GetUnlockPostProps) {
    const router = useRouter();

    const goDetail = (id: number) => {
        router.push(`/master/article/${id}`);
    };

    const goInfo = (mentorId: number) => {
        router.push(`/master/masterAvatar/${mentorId}?status=analysis`);
    };

    return (
        <div className={style.articleItem}>
            <div className={style.user}>
                <div
                    className={style.avatarContainer}
                    onClick={() => {
                        goInfo(item.mentorId);
                    }}
                >
                    <Avatar borderColor="#4489FF" />
                </div>
                <div className={style.userInfo}>
                    <div className={style.userName}>{item.mentorName}</div>
                    {item.memberTags.winMaxAccurateStreak > 3 && (
                        <Tag
                            icon={<Image alt="fire" src={Fire} />}
                            text={`${item.memberTags.winMaxAccurateStreak}连红`}
                        />
                    )}
                    {item.memberTags.weekRanking > 3 && (
                        <Tag
                            background="#4489FF"
                            color="#fff"
                            text={`周榜 ${item.memberTags.weekRanking}`}
                        />
                    )}
                    {item.memberTags.monthRanking > 3 && (
                        <Tag
                            background="#4489FF"
                            color="#fff"
                            text={`月榜 ${item.memberTags.monthRanking}`}
                        />
                    )}
                    {item.memberTags.quarterRanking > 3 && (
                        <Tag
                            background="#4489FF"
                            color="#fff"
                            text={`季榜 ${item.memberTags.quarterRanking}`}
                        />
                    )}
                </div>
                <div className={style.unlockStatus}>
                    <span className={style.unlocked}>已解鎖</span>
                </div>
            </div>
            <div className={style.title}>{item.analysisTitle}</div>
            <div
                className={style.game}
                onClick={() => {
                    goDetail(item.postId);
                }}
            >
                <div className={style.rows}>
                    <div className={style.detail}>
                        {item.leagueName}
                        <span className={style.time}>
                            | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                        </span>
                    </div>
                    <div className={style.combination}>
                        {item.homeTeamName} vs {item.awayTeamName}
                    </div>
                </div>
                {item.predictionResult === 'WIN' && (
                    <Image alt="" height={36} src={Win} width={36} />
                )}
                {item.predictionResult === 'LOSE' && (
                    <Image alt="" height={36} src={Lose} width={36} />
                )}
                {item.predictionResult === 'DRAW' && (
                    <Image alt="" height={36} src={Draw} width={36} />
                )}
            </div>
            <div className={style.postTime}>
                发表于 {timestampToString(item.createdAt, 'YYYY-M-DD')}
            </div>
        </div>
    );
}

export default ArticleItem;

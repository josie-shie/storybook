'use client';
import { useRouter } from 'next/navigation';
import { timestampToString } from 'lib';
import Image from 'next/image';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import Avatar from '@/components/avatar/avatar';
import Fire from '@/app/img/fire.png';
import style from './articleItem.module.scss';
import Link from 'next/link';
import Win from './img/win.png';
import Lose from './img/lose.png';
import Draw from './img/draw.png';
import Eye from './img/eye.svg';
import LockOpen from './img/lockOpen.svg';
import LockOpenBlue from './img/lockOpenBlue.svg';
import { truncateFloatingPoint, timestampToTodayTime } from 'lib';

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

    const goInfo = (mentorId: number) => {
        router.push(`/master/masterAvatar/${mentorId}?status=analysis`);
    };

    return (
        <div className={style.articleItem}>
            {item.predictionResult === 'WIN' && (
                <div className={style.result}>
                    <Image alt="" height={27} src={Win} width={27} />
                </div>
            )}
            {item.predictionResult === 'LOSE' && (
                <div className={style.result}>
                    <Image alt="" height={27} src={Lose} width={27} />
                </div>
            )}
            {item.predictionResult === 'DRAW' && (
                <div className={style.result}>
                    <Image alt="" height={27} src={Draw} width={27} />
                </div>
            )}

            <div className={style.unlockStatus}>
                <span className={style.unlocked}>
                    <LockOpenBlue width={16} height={16} />
                </span>
            </div>
            <div className={style.user}>
                <Link
                    className={style.avatarContainer}
                    href={`/master/masterAvatar/${item.mentorId}?status=analysis`}
                >
                    <Avatar borderColor="#4489FF" src={item.avatarPath} />
                </Link>
                <div className={style.userInfo}>
                    <Link
                        className={style.userName}
                        href={`/master/masterAvatar/${item.mentorId}?status=analysis`}
                    >
                        {item.mentorName}
                    </Link>
                    <div className={style.tagsContainer}>
                        {item.memberTags.winMaxAccurateStreak > 3 && (
                            <Tag
                                icon={<Image alt="fire" src={Fire} />}
                                text={`${item.memberTags.winMaxAccurateStreak}连红`}
                            />
                        )}
                        {item.memberTags.quarterRanking > 0 && (
                            <TagSplit
                                isBlueBg={false}
                                number={item.memberTags.quarterRanking}
                                text="季"
                            />
                        )}
                        {item.memberTags.monthRanking > 0 && (
                            <TagSplit
                                isBlueBg={false}
                                number={item.memberTags.monthRanking}
                                text="月"
                            />
                        )}
                        {item.memberTags.weekRanking > 0 && (
                            <TagSplit
                                isBlueBg={false}
                                number={item.memberTags.weekRanking}
                                text="周"
                            />
                        )}
                    </div>
                </div>
                <div className={style.rate}>
                    <span className={style.hit}>
                        {truncateFloatingPoint(item.memberTags.weekHitRate, 2)}
                        <i>%</i>
                    </span>
                    <span className={style.hitName}>近十命中</span>
                </div>
            </div>
            <Link href={`/master/articleDetail/${item.postId}`}>
                <div className={style.game}>
                    <div className={style.leagueTeam}>
                        <span>{item.leagueName}</span>
                        <span className={style.line}>|</span>
                        <span>
                            {item.homeTeamName}VS{item.awayTeamName}
                        </span>
                    </div>
                    <div className={style.title}>{item.analysisTitle}</div>
                </div>
            </Link>
            <div className={style.postTime}>
                <span>{timestampToTodayTime(item.createdAt)}</span>
                <div className={style.seen}>
                    <span>
                        <Eye />
                        9999
                    </span>
                    <span className={style.line}>|</span>
                    <span>
                        <LockOpen />
                        344
                    </span>
                </div>
                {/* {item.seenCounts && item.unlockCounts ? (
                    <div className={style.seen}>
                        {item.seenCounts && (
                            <>
                                <span>
                                    <Eye />
                                    {item.seenCounts}
                                </span>
                                <span className={style.line}>|</span>
                            </>
                        )}
                        {item.unlockCounts && (
                            <span>
                                <LockOpen />
                                {item.unlockCounts}
                            </span>
                        )}
                    </div>
                ) : null} */}
            </div>
        </div>
    );
}

export default ArticleItem;

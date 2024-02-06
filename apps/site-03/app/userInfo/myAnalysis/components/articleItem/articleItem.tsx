'use client';
import { truncateFloatingPoint, timestampToTodayTime } from 'lib';
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

interface MentorArticleCount {
    predictedPlay: string;
    counts: number;
}

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
        unlockCounts: number;
        seenCounts: number;
        mentorArticleCount: MentorArticleCount;
    };
}

function ArticleItem({ item }: GetUnlockPostProps) {
    const getText = predictedPlay => {
        switch (predictedPlay) {
            case 'HANDICAP':
                return '胜负';
            case 'OVERUNDER':
                return '总进球';
            default:
                return '';
        }
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
                        {item.mentorArticleCount.predictedPlay === 'HANDICAP' &&
                            item.mentorArticleCount.counts >= 10 && (
                                <Tag
                                    background="#f3f3f3"
                                    borderColor="#bfbfbf"
                                    color="#8d8d8d"
                                    text={`${getText(item.mentorArticleCount.predictedPlay)} ${
                                        item.mentorArticleCount.counts
                                    }場`}
                                />
                            )}
                        {item.mentorArticleCount.predictedPlay === 'OVERUNDER' &&
                            item.mentorArticleCount.counts >= 10 && (
                                <Tag
                                    background="#f3f3f3"
                                    borderColor="#bfbfbf"
                                    color="#8d8d8d"
                                    text={`${getText(item.mentorArticleCount.predictedPlay)} ${
                                        item.mentorArticleCount.counts
                                    }場`}
                                />
                            )}
                        {item.memberTags.weekHitRecentTen > 0 && (
                            <TagSplit
                                isBlueBg={false}
                                number={item.memberTags.weekHitRecentTen}
                                hit={true}
                                text="近"
                            />
                        )}
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
                    {item.memberTags.weekHitRecentTen > 0 && (
                        <span
                            className={style.hitName}
                        >{`近十中${item.memberTags.weekHitRecentTen}`}</span>
                    )}
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
                {item.seenCounts || item.unlockCounts ? (
                    <div className={style.seen}>
                        {item.seenCounts ? (
                            <>
                                <span>
                                    <Eye />
                                    {item.seenCounts}
                                </span>
                                <span className={style.line}>|</span>
                            </>
                        ) : null}
                        {item.unlockCounts ? (
                            <span>
                                <LockOpen />
                                {item.unlockCounts}
                            </span>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ArticleItem;

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { timestampToTodayTime } from 'lib';
import { type RecommendPost } from 'data-center';
import Tag from '@/components/tag/tag';
import NoData from '@/components/baseNoData/noData';
import style from './recommendationList.module.scss';
import Win from './img/win.svg';
import Draw from './img/draw.svg';
import Lose from './img/lose.svg';
import Eye from './img/eye.svg';
import LockOpenBlue from './img/lockOpenBlue.svg';
import SkeletonLayout from './components/skeleton';

function RecommendationItem({ 
    recommendationList,
    isNoData
}: {
    recommendationList: RecommendPost[];
    isNoData: boolean | null;
}) {
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
        <>
            {recommendationList.length === 0 && isNoData === null && <SkeletonLayout />}

            {recommendationList.length === 0 && isNoData ? (
                <NoData text="暂无资料" />
            ) : (
                <>
                    {recommendationList.map(item => {
                        return (
                            <Link
                                className={style.item}
                                href={`/master/articleDetail/${item.id}`}
                                key={item.id}
                            >
                                {item.predictionResult === 'WIN' && (
                                    <Win className={style.icon} />
                                )}
                                {item.predictionResult === 'DRAW' && (
                                    <Draw className={style.icon} />
                                )}
                                {item.predictionResult === 'LOSE' && (
                                    <Lose className={style.icon} />
                                )}
                                <div className={style.left}>
                                    <div className={style.name}>
                                        {item.mentorArticleCount.predictedPlay === 'HANDICAP' &&
                                            item.mentorArticleCount.counts >= 10 && (
                                                <Tag
                                                    background="#f3f3f3"
                                                    borderColor="#bfbfbf"
                                                    color="#8d8d8d"
                                                    text={`${getText(
                                                        item.mentorArticleCount.predictedPlay
                                                    )}`}
                                                />
                                            )}
                                        {item.mentorArticleCount.predictedPlay === 'OVERUNDER' &&
                                            item.mentorArticleCount.counts >= 10 && (
                                                <Tag
                                                    background="#f3f3f3"
                                                    borderColor="#bfbfbf"
                                                    color="#8d8d8d"
                                                    text={`${getText(
                                                        item.mentorArticleCount.predictedPlay
                                                    )}`}
                                                />
                                            )}
                                        <span>{item.mentorName}</span>
                                    </div>

                                    <div className={style.leagueName}>
                                        <span className={style.name}>{item.leagueName}</span>
                                        <span>|</span>
                                        <span className={style.teamName}>
                                            {item.homeTeamName}VS{item.awayTeamName}
                                        </span>
                                    </div>

                                    <div className={style.content}>{item.analysisTitle}</div>

                                    <div className={style.seeDetail}>
                                        <div className={style.time}>
                                            {timestampToTodayTime(item.createdAt)}
                                        </div>
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
                                                        <LockOpenBlue />
                                                        {item.unlockCounts}
                                                    </span>
                                                ) : null}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </>
            )}
        </>
    );
}

export default RecommendationItem;

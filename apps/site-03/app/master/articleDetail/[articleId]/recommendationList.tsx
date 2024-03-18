'use client';
import Link from 'next/link';
import { timestampToTodayTime, getPredictedPlayDisplay } from 'lib';
import { type RecommendPost } from 'data-center';
import Tag from '@/components/tag/tag';
import NoData from '@/components/baseNoData/noData';
import Draw from '@/public/resultIcon/bigDraw.svg';
import Miss from '@/public/resultIcon/bigMiss.svg';
import Hit from '@/public/resultIcon/bigHit.svg';
import style from './recommendationList.module.scss';
import Eye from './img/eye.svg';
import LockOpen from './img/lockOpen.svg';
import SkeletonLayout from './components/skeleton';

function RecommendationItem({
    recommendationList,
    isNoData
}: {
    recommendationList: RecommendPost[];
    isNoData: boolean | null;
}) {
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
                                    <Hit className={style.icon} height="45" width="45" />
                                )}
                                {item.predictionResult === 'DRAW' && (
                                    <Draw className={style.icon} height="45" width="45" />
                                )}
                                {item.predictionResult === 'LOSE' && (
                                    <Miss className={style.icon} height="45" width="45" />
                                )}
                                <div className={style.left}>
                                    <div className={style.name}>
                                        <Tag
                                            background="#f3f3f3"
                                            borderColor="#bfbfbf"
                                            color="#8d8d8d"
                                            text={`${getPredictedPlayDisplay(item.predictedPlay)}`}
                                        />
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
                                        <div className={style.seen}>
                                            {item.seenCounts ? (
                                                <span>
                                                    <Eye />
                                                    {item.seenCounts}
                                                </span>
                                            ) : null}

                                            {item.seenCounts && item.unlockCounts ? (
                                                <span className={style.line}>|</span>
                                            ) : null}

                                            {item.unlockCounts ? (
                                                <span>
                                                    <LockOpen />
                                                    {item.unlockCounts}
                                                </span>
                                            ) : null}
                                        </div>
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

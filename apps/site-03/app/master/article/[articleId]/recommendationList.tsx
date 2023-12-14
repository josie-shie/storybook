'use client';

import Image from 'next/image';
import { timestampToString, timestampToMonthDay } from 'lib';
import Link from 'next/link';
import { type RecommendPost } from 'data-center';
import style from './recommendationList.module.scss';
import Star from './img/star.png';

function RecommendationItem({ recommendationList }: { recommendationList: RecommendPost[] }) {
    const formatHandicapName = {
        HANDICAP: '大小',
        OVERUNDER: '让分'
    };

    return (
        <>
            {recommendationList.map(item => {
                return (
                    <Link
                        className={style.item}
                        href={`/recommend/predict/${item.id}`}
                        key={item.id}
                    >
                        <div className={style.left}>
                            <div className={style.time}>
                                发表于今天 {timestampToMonthDay(item.createdAt)}
                            </div>
                            <div className={style.leagueName}>
                                <span className={style.name}>{item.leagueName}</span>
                                <span className={style.time}>
                                    | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                                </span>
                            </div>
                            <div className={style.teamName}>
                                <span className={style.play}>
                                    {formatHandicapName[item.predictedPlay]}
                                </span>
                                <span className={style.name}>
                                    {item.homeTeamName} vs {item.awayTeamName}
                                </span>
                            </div>
                        </div>
                        <div className={style.right}>
                            {!item.isUnlocked ? (
                                <>
                                    <div className={style.noPaid}>
                                        <Image
                                            alt=""
                                            className={style.image}
                                            src={Star}
                                            width={14}
                                        />
                                        <span className={style.text}>{item.price}元</span>
                                    </div>
                                    <div className={style.unlockMember}>
                                        已有{item.unlockCounts}人解鎖
                                    </div>
                                </>
                            ) : (
                                <div className={style.unlockMember}>已解鎖</div>
                            )}
                        </div>
                    </Link>
                );
            })}
        </>
    );
}

export default RecommendationItem;

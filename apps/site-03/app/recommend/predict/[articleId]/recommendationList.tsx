'use client';

import Image from 'next/image';
import { timestampToString, timestampToMonthDay } from 'lib';
import style from './recommendationList.module.scss';
import Star from './img/star.png';
import { useArticleStore } from './articleStore';
import type { HandicapType } from '@/types/predict';

function RecommendationItem() {
    const recommendationList = useArticleStore.use.recommendationList();
    const formatHandicapName = (type: HandicapType): string => {
        const list = {
            overUnder: '大小',
            handicap: '让分'
        };
        return list[type];
    };
    return (
        <>
            {recommendationList.map(item => {
                return (
                    <section className={style.item} key={item.id}>
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
                                    {formatHandicapName(item.predictPlayType)}
                                </span>
                                <span className={style.name}>
                                    {item.homeTeamName} vs {item.awayTeamName}
                                </span>
                            </div>
                        </div>
                        <div className={style.right}>
                            {!item.isLock ? (
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
                                        已有{item.unlockNumber}人解鎖
                                    </div>
                                </>
                            ) : (
                                <div className={style.unlockMember}>已解鎖</div>
                            )}
                        </div>
                    </section>
                );
            })}
        </>
    );
}

export default RecommendationItem;

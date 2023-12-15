'use client';

import Image from 'next/image';
import { timestampToString, timestampToMonthDay } from 'lib';
import Link from 'next/link';
import style from './recommendationList.module.scss';
import Star from './img/star.png';
import type { HandicapType } from '@/types/predict';

interface RecommendationItem {
    id: number;
    createdAt: number; //發表時間
    leagueName: string; //聯賽名稱
    matchTime: number; //比賽時間
    homeTeamName: string; //主隊名稱
    awayTeamName: string; //客隊名稱
    price: number; //解鎖費用
    predictPlayType: HandicapType; //玩法
    unlockNumber: number; //已解鎖人數,
    isLock: boolean; //是否解鎖
}

function RecommendationItem({ recommendationList }: { recommendationList: RecommendationItem[] }) {
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
                    </Link>
                );
            })}
        </>
    );
}

export default RecommendationItem;

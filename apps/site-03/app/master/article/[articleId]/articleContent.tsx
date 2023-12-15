'use client';

import Image from 'next/image';
import { timestampToMonthDay, timestampToString, convertHandicap } from 'lib';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { type GetPostDetailResponse, type RecommendPost } from 'data-center';
import { getPostList, payForPost } from 'data-center';
import Star from './img/star.png';
import Push from './img/push.png';
import Win from './img/win.png';
import Lose from './img/lose.png';
import Draw from './img/draw.png';
import style from './articleContent.module.scss';
import RecommendationList from './recommendationList';
import { useUserStore } from '@/app/userStore';
import NormalDialog from '@/components/normalDialog/normalDialog';
import type { GuessType } from '@/types/predict';

function Content({ article }: { article: GetPostDetailResponse }) {
    const userInfo = useUserStore.use.userInfo();
    return (
        <>
            <div className={style.payContent}>
                <div className={style.price}>
                    <span className={style.text}>支付</span>
                    <span className={style.number}>
                        <Image alt="" className={style.image} src={Star} width={14} />
                        {article.price}
                    </span>
                </div>
                <span className={style.text}>开通年卡订阅</span>
            </div>
            <div className={style.balance}>
                我的餘額: {userInfo.balance ? userInfo.balance : 0}金幣
            </div>
        </>
    );
}

interface ArticleContentProps {
    article: GetPostDetailResponse;
    params: { articleId: string };
}
function ArticleContent({ params, article }: ArticleContentProps) {
    const [openPaid, setOpenPaid] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [recommendationList, setRecommendationList] = useState<RecommendPost[]>([]);

    const router = useRouter();

    const userInfo = useUserStore.use.userInfo();

    const unlockArticle = () => {
        setOpenPaid(true);
    };

    const onSubmit = async () => {
        if (userInfo.balance < article.price) {
            setOpenPaid(false);
            setOpenDialog(true);
            return;
        }
        try {
            const res = await payForPost({ postId: Number(params.articleId) });

            if (!res.success) {
                return new Error();
            }
            void fetchData();
        } catch (error) {
            return new Error();
        } finally {
            setOpenPaid(false);
        }
    };

    const filterImage = (value: GuessType): string => {
        const result = {
            NONE: Push.src,
            WIN: Win.src,
            DRAW: Draw.src,
            LOSE: Lose.src
        };
        return result[value];
    };

    const adjustHandicap = (val: number, type: string) => {
        if (article.playType === 'HOMEAWAY') {
            if (type === 'home') {
                return val > 0 ? '-' : '+';
            }
            return val > 0 ? '+' : '-';
        }
    };

    const goSubscribe = () => {
        setOpenDialog(false);
        router.push('/userInfo/subscribe');
    };

    const fetchData = async () => {
        try {
            const res = await getPostList({
                memberId: userInfo.uid,
                filterId: [article.mentorId],
                postFilter: ['mentor'],
                pageSize: 20
            });

            if (!res.success) {
                return new Error();
            }
            setRecommendationList(res.data.posts);
        } catch (error) {
            return new Error();
        }
    };

    useEffect(() => {
        void fetchData();
    }, [userInfo.uid]);

    return (
        <div className={style.articleContent}>
            <div className={style.container}>
                <div className={style.time}>
                    发表于今天 {timestampToMonthDay(article.createdAt)}
                </div>
                <div className={style.title}>{article.analysisTitle}</div>
                <div className={style.article}>
                    <div className={style.leagueName}>
                        {article.leagueName} {timestampToString(article.matchTime, 'MM-DD HH:mm')}
                    </div>
                    <div className={style.clubInfo}>
                        <div className={style.team}>
                            <Image
                                alt=""
                                height={48}
                                src={article.homeTeam.logo === '0' ? '' : article.homeTeam.logo}
                                width={48}
                            />
                            <div className={style.name}>{article.homeTeam.name}</div>
                        </div>
                        <div className={style.fight}>VS</div>
                        <div className={style.team}>
                            <Image
                                alt=""
                                height={48}
                                src={article.awayTeam.logo === '0' ? '' : article.awayTeam.logo}
                                width={48}
                            />
                            <div className={style.name}>{article.awayTeam.name}</div>
                        </div>
                    </div>

                    {article.predictedPlay === 'LOCK' && (
                        <div className={style.paidButton}>
                            <div className={style.content}>{article.shortAnalysisContent}</div>
                            <div className={style.buttonArea}>
                                <div className={style.backDrop} />
                                <div className={style.text}>
                                    Lorem ipsum dolor sit amet consectetur consect.
                                </div>
                            </div>
                            <div className={style.button} onClick={unlockArticle}>
                                <Image alt="" className={style.image} src={Star} width={14} />
                                <span className={style.text}>{article.price} 金币解锁本场预测</span>
                            </div>
                        </div>
                    )}

                    {article.predictedPlay !== 'LOCK' ? (
                        <div className={style.paidArea}>
                            <article className={style.content}>{article.analysisContent}</article>
                            <div className={style.team}>
                                <div
                                    className={`${style.table} ${
                                        article.playType === 'HOMEAWAY' ? style.active : ''
                                    }`}
                                >
                                    {article.playType === 'HOMEAWAY' && (
                                        <Image
                                            alt=""
                                            height={32}
                                            src={filterImage(article.predictionResult)}
                                            width={32}
                                        />
                                    )}
                                    <div
                                        className={`${style.header} ${
                                            article.playType === 'HOMEAWAY'
                                                ? style[
                                                      article.predictionResult.toLocaleLowerCase()
                                                  ]
                                                : style.normal
                                        }`}
                                    >
                                        {article.playType === 'HOMEAWAY'
                                            ? article.homeTeam.name
                                            : '大於'}
                                    </div>
                                    <div className={style.score}>
                                        <span>
                                            {adjustHandicap(
                                                article.playType === 'HOMEAWAY'
                                                    ? article.odds.handicap
                                                    : article.odds.overUnder,
                                                'home'
                                            )}
                                            {convertHandicap(
                                                article.playType === 'HOMEAWAY'
                                                    ? Math.abs(article.odds.handicap)
                                                    : Math.abs(article.odds.overUnder)
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={`${style.table} ${
                                        article.playType === 'OVERUNDER' ? style.active : ''
                                    }`}
                                >
                                    {article.playType === 'OVERUNDER' && (
                                        <Image
                                            alt=""
                                            height={32}
                                            src={filterImage(article.predictionResult)}
                                            width={32}
                                        />
                                    )}
                                    <div
                                        className={`${style.header} ${
                                            article.playType === 'OVERUNDER'
                                                ? style[
                                                      article.predictionResult.toLocaleLowerCase()
                                                  ]
                                                : style.normal
                                        }`}
                                    >
                                        {article.playType === 'HOMEAWAY'
                                            ? article.awayTeam.name
                                            : '小於'}
                                    </div>
                                    <div className={style.score}>
                                        <span>
                                            {adjustHandicap(
                                                article.playType === 'HOMEAWAY'
                                                    ? article.odds.handicap
                                                    : article.odds.overUnder,
                                                'away'
                                            )}
                                            {convertHandicap(
                                                article.playType === 'HOMEAWAY'
                                                    ? Math.abs(article.odds.handicap)
                                                    : Math.abs(article.odds.overUnder)
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className={style.otherList}>
                <div className={style.title}>Ta还推荐了... ({recommendationList.length})</div>
                <RecommendationList recommendationList={recommendationList} />
            </div>
            <NormalDialog
                cancelText="取消"
                confirmText="確認支付"
                content={<Content article={article} />}
                onClose={() => {
                    setOpenPaid(false);
                }}
                onConfirm={onSubmit}
                openDialog={openPaid}
            />
            <NormalDialog
                cancelText="取消"
                confirmText="去订阅"
                content={<div>余额不足，请订阅</div>}
                onClose={() => {
                    setOpenDialog(false);
                }}
                onConfirm={goSubscribe}
                openDialog={openDialog}
            />
        </div>
    );
}

export default ArticleContent;

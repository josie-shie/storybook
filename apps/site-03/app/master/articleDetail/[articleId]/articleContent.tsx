'use client';

import Image from 'next/image';
import { timestampToTodayTime, convertHandicap } from 'lib';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    type GetPostDetailResponse,
    GetMemberProfileWithMemberIdResponse,
    getMemberInfo,
    type RecommendPost
} from 'data-center';
import { getPostList, payForPost } from 'data-center';
import { useUserStore } from '@/store/userStore';
import NormalDialog from '@/components/normalDialog/normalDialog';
import type { GuessType } from '@/types/predict';
import DefaultLogo from '@/app/football/[matchId]/img/defaultTeamLogo.png';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import Star from './img/star.png';
import Push from './img/push.png';
import Win from './img/win.png';
import Lose from './img/lose.png';
import Draw from './img/draw.png';
import style from './articleContent.module.scss';
import RecommendationList from './recommendationList';
import Wallet from './img/wallet.png';
import Skeleton from '@mui/material/Skeleton';

interface ArticleContentProps {
    article: GetPostDetailResponse;
    info: GetMemberProfileWithMemberIdResponse;
    isNoArticleData: boolean;
    params: { articleId: string };
    fetchPostDetail: () => void;
}
function ArticleContent({
    params,
    article,
    info,
    isNoArticleData,
    fetchPostDetail
}: ArticleContentProps) {
    const [openPaid, setOpenPaid] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [recommendationList, setRecommendationList] = useState<RecommendPost[]>([]);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);

    const router = useRouter();

    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();
    const setUserInfo = useUserStore.use.setUserInfo();

    const unlockArticle = () => {
        if (!isLogin) {
            router.push(`/master/article/${params.articleId}?auth=login`);
            return;
        }
        setOpenPaid(true);
    };

    const onSubmit = async () => {
        if (userInfo.balance < article.price) {
            setOpenPaid(false);
            setOpenDialog(true);
            return;
        }
        const res = await payForPost({ postId: Number(params.articleId) });

        if (!res.success) {
            return new Error();
        }
        fetchPostDetail();
        void getUser();
        setOpenPaid(false);
    };

    const getUser = async () => {
        const res = await getMemberInfo();
        if (!res.success) {
            return new Error();
        }
        setUserInfo(res.data);
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
        const res = await getPostList({
            memberId: userInfo.uid ? userInfo.uid : 0,
            filterId: [article.mentorId],
            postFilter: ['mentor'],
            pageSize: 20
        });

        if (!res.success) {
            return new Error();
        }
        setRecommendationList(res.data.posts);
        setIsNoData(res.data.posts.length === 0);
    };

    useEffect(() => {
        void fetchData();
    }, [userInfo.uid]);

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
        <div className={style.articleContent}>
            <div className={style.articleLayout}>
                <div className={style.container}>
                    <div className={style.topTitle}>
                        <div className={style.leagueTeam}>
                            {!isNoArticleData ? (
                                <>
                                    <span>{article.leagueName}</span>
                                    <span className={style.line}>|</span>
                                    <span>
                                        {article.homeTeam.name}VS{article.awayTeam.name}
                                    </span>
                                </>
                            ) : (
                                <Skeleton animation="wave" height={20} variant="text" width={136} />
                            )}
                        </div>
                        <div className={style.time}>
                            {!isNoArticleData ? (
                                <>{timestampToTodayTime(article.createdAt)}</>
                            ) : (
                                <Skeleton animation="wave" height={20} variant="text" width={94} />
                            )}
                        </div>
                    </div>
                    <div className={style.title}>
                        {!isNoArticleData ? (
                            <>{article.analysisTitle}</>
                        ) : (
                            <Skeleton animation="wave" height={26} variant="text" width={180} />
                        )}
                    </div>

                    <div className={style.article}>
                        <div className={style.clubInfo}>
                            <div className={style.team}>
                                <Image
                                    alt=""
                                    height={48}
                                    src={
                                        (article.homeTeam.logo === '0'
                                            ? DefaultLogo
                                            : article.homeTeam.logo) || DefaultLogo
                                    }
                                    width={48}
                                />
                                <div className={style.name}>
                                    {!isNoArticleData ? (
                                        <>{article.homeTeam.name}</>
                                    ) : (
                                        <Skeleton
                                            animation="wave"
                                            height={20}
                                            variant="text"
                                            width={84}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={style.fight}>VS</div>
                            <div className={style.team}>
                                <Image
                                    alt=""
                                    height={48}
                                    src={
                                        (article.awayTeam.logo === '0'
                                            ? DefaultLogo
                                            : article.awayTeam.logo) || DefaultLogo
                                    }
                                    width={48}
                                />
                                <div className={style.name}>
                                    {!isNoArticleData ? (
                                        <>{article.awayTeam.name}</>
                                    ) : (
                                        <Skeleton
                                            animation="wave"
                                            height={20}
                                            variant="text"
                                            width={84}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {article.predictedPlay === 'LOCK' && article.price !== 0 ? (
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
                                    <span className={style.text}>
                                        {article.price} 金币解锁本场预测
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className={style.paidArea}>
                                <article className={style.content}>
                                    {article.analysisContent}
                                </article>
                                {!isNoArticleData ? (
                                    <>
                                        <div className={style.play}>
                                            {getText(info.mentorArticleCount.predictedPlay)}
                                        </div>
                                        <div className={style.team}>
                                            <div
                                                className={`${style.table} ${
                                                    article.playType === 'HOMEAWAY'
                                                        ? style.active
                                                        : ''
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
                                                    article.playType === 'OVERUNDER'
                                                        ? style.active
                                                        : ''
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
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>

                <div className={style.otherList}>
                    <div className={style.title}>Ta还推荐了... ({recommendationList.length})</div>
                    <RecommendationList
                        isNoData={isNoData}
                        params={params}
                        recommendationList={recommendationList}
                    />
                </div>
            </div>
            <ConfirmPayDrawer
                isOpen={openPaid}
                onClose={() => {
                    setOpenPaid(false);
                }}
                onOpen={() => {
                    setOpenPaid(true);
                }}
                onPay={onSubmit}
                price={article.price}
            />
            <NormalDialog
                confirmText="去充值"
                content={<div>余额不足，请充值</div>}
                onClose={() => {
                    setOpenDialog(false);
                }}
                onConfirm={goSubscribe}
                openDialog={openDialog}
                srcImage={Wallet}
            />
        </div>
    );
}

export default ArticleContent;

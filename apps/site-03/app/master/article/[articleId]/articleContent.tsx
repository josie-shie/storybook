'use client';

import Image from 'next/image';
import { timestampToMonthDay, timestampToString, convertHandicap } from 'lib';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { type GetPostDetailResponse, getMemberInfo, type RecommendPost } from 'data-center';
import { getPostList, payForPost } from 'data-center';
import Cookies from 'js-cookie';
import { useUserStore } from '@/app/userStore';
import NormalDialog from '@/components/normalDialog/normalDialog';
import type { GuessType } from '@/types/predict';
import DefaultLogo from '@/app/football/[matchId]/img/defaultTeamLogo.png';
import ConfirmPayArticle from '../components/confirmPayArticle/confirmPayArticle';
import Star from './img/star.png';
import Push from './img/push.png';
import Win from './img/win.png';
import Lose from './img/lose.png';
import Draw from './img/draw.png';
import style from './articleContent.module.scss';
import RecommendationList from './recommendationList';
import Wallet from './img/wallet.png';

interface ArticleContentProps {
    article: GetPostDetailResponse;
    params: { articleId: string };
    fetchPostDetail: () => void;
}
function ArticleContent({ params, article, fetchPostDetail }: ArticleContentProps) {
    const [openPaid, setOpenPaid] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [recommendationList, setRecommendationList] = useState<RecommendPost[]>([]);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);

    const router = useRouter();

    const userInfo = useUserStore.use.userInfo();
    const setUserInfo = useUserStore.use.setUserInfo();

    const unlockArticle = () => {
        const isCookieExist = Cookies.get('access');
        if (!isCookieExist) {
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
            memberId: userInfo.uid ? userInfo.uid : 1,
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

    return (
        <div className={style.articleContent}>
            <div className={style.articleLayout}>
                <div className={style.container}>
                    <div className={style.time}>
                        发表于今天 {timestampToMonthDay(article.createdAt)}
                    </div>
                    <div className={style.title}>{article.analysisTitle}</div>
                    <div className={style.article}>
                        <div className={style.leagueName}>
                            {article.leagueName}
                            {timestampToString(article.matchTime, 'MM-DD HH:mm')}
                        </div>
                        <div className={style.clubInfo}>
                            <div className={style.team}>
                                <Image
                                    alt=""
                                    height={48}
                                    src={
                                        article.homeTeam.logo === '0'
                                            ? DefaultLogo
                                            : article.homeTeam.logo
                                    }
                                    width={48}
                                />
                                <div className={style.name}>{article.homeTeam.name}</div>
                            </div>
                            <div className={style.fight}>VS</div>
                            <div className={style.team}>
                                <Image
                                    alt=""
                                    height={48}
                                    src={
                                        article.awayTeam.logo === '0'
                                            ? DefaultLogo
                                            : article.awayTeam.logo
                                    }
                                    width={48}
                                />
                                <div className={style.name}>{article.awayTeam.name}</div>
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
                        )}
                    </div>
                </div>

                <div className={style.otherList}>
                    <div className={style.title}>Ta还推荐了... ({recommendationList.length})</div>
                    <RecommendationList
                        isNoData={isNoData}
                        recommendationList={recommendationList}
                    />
                </div>
            </div>
            <NormalDialog
                cancelText="取消"
                confirmText="確認支付"
                content={<ConfirmPayArticle price={article.price} />}
                onClose={() => {
                    setOpenPaid(false);
                }}
                onConfirm={onSubmit}
                openDialog={openPaid}
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

'use client';

import Image from 'next/image';
import { timestampToTodayTime, convertHandicap } from 'lib';
import { useEffect, useState } from 'react';
import type {
    GetMemberProfileWithMemberIdResponse,
    GetPostDetailResponse,
    RecommendPost
} from 'data-center';
import { getPostList, payForPost, getMemberInfo } from 'data-center';
import Skeleton from '@mui/material/Skeleton';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import RechargeDialog from '@/components/rechargeDialog/rechargeDialog';
import type { GuessType } from '@/types/predict';
import DefaultLogo from '@/app/football/[matchId]/img/defaultTeamLogo.png';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import Star from './img/star.png';
import Push from './img/push.svg';
import Win from './img/win.svg';
import Lose from './img/lose.svg';
import Draw from './img/draw.svg';
import style from './articleContent.module.scss';
import RecommendationList from './recommendationList';

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
    const [isOpenRechargeDialog, setIsOpenRechargeDialog] = useState(false);
    const [recommendationList, setRecommendationList] = useState<RecommendPost[]>([]);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setUserInfo = useUserStore.use.setUserInfo();

    const unlockArticle = () => {
        if (!isLogin) {
            setAuthQuery('login');
            setIsDrawerOpen(true);
            return;
        }
        setOpenPaid(true);
    };

    const onSubmit = async () => {
        if (userInfo.balance < article.price) {
            setOpenPaid(false);
            setIsOpenRechargeDialog(true);
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

    const filterImage = (value: GuessType): JSX.Element => {
        const result = {
            NONE: <Push className={style.icon} height="36" width="36" />,
            WIN: <Win className={style.icon} height="36" width="36" />,
            DRAW: <Draw className={style.icon} height="36" width="36" />,
            LOSE: <Lose className={style.icon} height="36" width="36" />,
            PUSH: <Push className={style.icon} height="36" width="36" />
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

    const fetchData = async () => {
        const res = await getPostList({
            memberId: userInfo.uid ? userInfo.uid : 0,
            filterId: [article.mentorId],
            postFilter: ['mentor'],
            pagination: {
                currentPage: 1,
                perPage: 20
            }
        });

        if (!res.success) {
            return new Error();
        }
        const filterData = res.data.posts.filter(item => item.id !== Number(params.articleId));
        setRecommendationList(filterData);
        setIsNoData(filterData.length === 0);
    };

    useEffect(() => {
        void fetchData();
    }, [userInfo.uid, article]);

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
                        <div className={style.time}>
                            {!isNoArticleData ? (
                                <>{timestampToTodayTime(article.createdAt)}</>
                            ) : (
                                <Skeleton animation="wave" height={20} variant="text" width={94} />
                            )}
                        </div>
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
                                <div
                                    className={style.content}
                                    dangerouslySetInnerHTML={{
                                        __html: article.shortAnalysisContent
                                    }}
                                />
                                <div className={style.buttonArea}>
                                    <div className={style.backDrop} />
                                    <div className={style.text}>
                                        Lorem ipsum dolor sit amet consectetur consect.
                                    </div>
                                </div>
                                <div className={style.button} onClick={unlockArticle}>
                                    <Image alt="" className={style.image} src={Star} width={14} />
                                    <span className={style.text}>{article.price} 解锁本场预测</span>
                                </div>
                            </div>
                        ) : (
                            <div className={style.paidArea}>
                                <article
                                    className={style.content}
                                    dangerouslySetInnerHTML={{ __html: article.analysisContent }}
                                />
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
                                                {article.playType === 'HOMEAWAY' &&
                                                    filterImage(article.predictionResult)}
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
                                                {article.playType === 'OVERUNDER' &&
                                                    filterImage(article.predictionResult)}
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
                    <div className={style.title}>
                        Ta还推荐了...
                        {recommendationList.length > 0 ? `(${recommendationList.length})` : null}
                    </div>
                    <RecommendationList
                        isNoData={isNoData}
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
            <RechargeDialog
                openDialog={isOpenRechargeDialog}
                setRechargeDialogClose={setIsOpenRechargeDialog}
            />
        </div>
    );
}

export default ArticleContent;

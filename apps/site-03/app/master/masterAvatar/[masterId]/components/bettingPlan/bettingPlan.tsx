import Image from 'next/image';
import {
    getMemberIndividualGuessMatches,
    payForProGuess,
    getMemberInfo,
    type MemberIndividualGuessMatch
} from 'data-center';
import { useEffect, useState } from 'react';
import { timestampToString } from 'lib';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import UnlockButton from '@/components/unlockButton/unlockButton';
import NoData from '@/components/baseNoData/noData';
import { useUserStore } from '@/app/userStore';
import NormalDialog from '@/components/normalDialog/normalDialog';
import ConfirmPayArticle from '@/app/master/article/components/confirmPayArticle/confirmPayArticle';
import IconWin from './img/win.png';
import IconLose from './img/lose.png';
import IconDraw from './img/draw.png';
import style from './bettingPlan.module.scss';
import SkeletonLayout from './components/skeleton';

type Tab = 0 | 1 | 2;

const filterIcon = {
    WIN: <Image alt="icon" className={style.iconWin} src={IconWin} />,
    LOSE: <Image alt="icon" className={style.iconDefeat} src={IconLose} />,
    DRAW: <Image alt="icon" className={style.iconDefeat} src={IconDraw} />
};

const filterPlay = {
    HOME: '让球',
    AWAY: '让球',
    OVER: '大小',
    UNDER: '大小',
    HANDICAP: '让球',
    OVERUNDER: '大小'
};

const filterOdds = {
    HOME: 'handicap',
    AWAY: 'handicap',
    OVER: 'overUnder',
    UNDER: 'overUnder',
    HANDICAP: 'handicap',
    OVERUNDER: 'overUnder'
};

function BettingPlan({
    planActiveTab,
    setGuessLength,
    params
}: {
    planActiveTab: Tab;
    setGuessLength: (val: number) => void;
    params: { masterId: string };
}) {
    const [guessMatchesList, setGuessMatchesList] = useState<MemberIndividualGuessMatch[]>([]);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isOpenPaid, setIsOpenPaid] = useState(false);
    const [articleInfo, setArticleInfo] = useState({} as MemberIndividualGuessMatch);
    const [isOpenRecharge, setIsOpenRecharge] = useState(false);

    const isLogin = useUserStore.use.isLogin();
    const isVip = useUserStore.use.memberSubscribeStatus();
    const userInfo = useUserStore.use.userInfo();
    const setUserInfo = useUserStore.use.setUserInfo();

    const router = useRouter();

    const fetchData = async () => {
        const res = await getMemberIndividualGuessMatches({
            memberId: Number(params.masterId),
            currentPage,
            pageSize: 30,
            guessType: planActiveTab
        });

        if (!res.success) {
            return new Error();
        }

        const updatedGuessMatchesList = [...guessMatchesList, ...res.data.guessMatchList];
        setGuessMatchesList(updatedGuessMatchesList);
        setGuessLength(res.data.pagination.totalCount);
        setIsNoData(res.data.guessMatchList.length === 0);
        setTotalPage(res.data.pagination.pageCount);
    };

    const fetchResetData = async () => {
        const res = await getMemberIndividualGuessMatches({
            memberId: Number(params.masterId),
            currentPage,
            pageSize: 30,
            guessType: planActiveTab
        });

        if (!res.success) {
            return new Error();
        }

        setGuessMatchesList(res.data.guessMatchList);
        setGuessLength(res.data.pagination.totalCount);
        setIsNoData(res.data.guessMatchList.length === 0);
        setTotalPage(res.data.pagination.pageCount);
    };

    const loadMoreList = () => {
        if (currentPage <= Math.round(guessMatchesList.length / 30) && currentPage < totalPage) {
            setCurrentPage(prevData => prevData + 1);
        }
    };

    const isOpenDialog = async (item: MemberIndividualGuessMatch) => {
        if (!isLogin) {
            setIsOpenPaid(false);
            router.push(`/master/masterAvatar/${params.masterId}?status=analysis&auth=login`);
            return;
        }

        if (isVip.planId === 1) {
            const res = await payForProGuess({ guessId: item.id });

            if (!res.success) {
                return new Error();
            }
            router.push(`/master/article/${item.id}`);
            return;
        }
        setIsOpenPaid(true);
        setArticleInfo(item);
    };

    const onSubmit = async () => {
        if (userInfo.balance < articleInfo.unlockPrice) {
            setIsOpenPaid(false);
            setIsOpenRecharge(true);
            return;
        }

        const res = await payForProGuess({ guessId: Number(articleInfo.id) });

        if (!res.success) {
            return new Error();
        }
        setIsOpenPaid(false);
        void fetchResetData();
        void getUser();
    };

    const getUser = async () => {
        const res = await getMemberInfo();
        if (!res.success) {
            return new Error();
        }
        setUserInfo(res.data);
    };

    const goPayment = () => {
        setIsOpenRecharge(false);
        router.push('/userInfo/subscribe');
    };

    useEffect(() => {
        void fetchData();
    }, [currentPage]);

    useEffect(() => {
        setGuessMatchesList([]);
        setCurrentPage(1);
        void fetchData();
    }, [planActiveTab]);

    return (
        <>
            {guessMatchesList.length === 0 && isNoData === null && <SkeletonLayout />}

            {guessMatchesList.length === 0 && isNoData ? (
                <NoData text="暂无资料" />
            ) : (
                <>
                    {guessMatchesList.map(item => {
                        return (
                            <div className={style.bettingPlan} key={item.id}>
                                {filterIcon[item.predictionResult]}
                                <div className={style.top}>
                                    {item.leagueName}
                                    <span className={style.time}>
                                        | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                                    </span>
                                </div>
                                <div className={style.mid}>
                                    <span className={style.plan}>
                                        {filterPlay[item.predictedPlay]}
                                    </span>
                                    <div className={style.combination}>
                                        {item.predictionResult === 'NONE' && item.isPaidToRead ? (
                                            <span>
                                                {item.homeTeamName} vs {item.awayTeamName}
                                            </span>
                                        ) : (
                                            <span>
                                                {item.homeTeamName}{' '}
                                                <span>
                                                    {item.homeScore} - {item.awayScore}
                                                </span>{' '}
                                                {item.awayTeamName}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className={style.bot}>
                                    {!item.isPaidToRead ? (
                                        <div
                                            className={`${style.message} ${
                                                item.predictionResult === 'WIN' && style.win
                                            }`}
                                        >
                                            {filterOdds[item.predictedPlay] === 'overUnder'
                                                ? ''
                                                : `${item.handicapOdds > 0 ? '让球' : '受让'}${
                                                      item.handicapInChinese
                                                  }`}{' '}
                                            {item.predictedPlay === 'OVER' &&
                                                `${item.overUnderOdds} 小`}
                                            {item.predictedPlay === 'UNDER' &&
                                                `${item.overUnderOdds} 大`}
                                            {item.predictedPlay === 'HOME' && item.homeTeamName}
                                            {item.predictedPlay === 'AWAY' && item.awayTeamName}
                                        </div>
                                    ) : (
                                        <div />
                                    )}

                                    {item.isPaidToRead ? (
                                        <UnlockButton
                                            handleClick={() => void isOpenDialog(item)}
                                            price={item.unlockPrice}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                    {currentPage < totalPage && (
                        <InfiniteScroll onVisible={loadMoreList}>
                            <div className={style.loadMore}>
                                <CircularProgress size={24} />
                            </div>
                        </InfiniteScroll>
                    )}
                </>
            )}
            <NormalDialog
                cancelText="取消"
                confirmText="確認支付"
                content={<ConfirmPayArticle price={articleInfo.unlockPrice} />}
                onClose={() => {
                    setIsOpenPaid(false);
                }}
                onConfirm={onSubmit}
                openDialog={isOpenPaid}
            />
            <NormalDialog
                cancelText="取消"
                confirmText="去充值"
                content={<div>余额不足，请充值</div>}
                onClose={() => {
                    setIsOpenRecharge(false);
                }}
                onConfirm={goPayment}
                openDialog={isOpenRecharge}
            />
        </>
    );
}

export default BettingPlan;

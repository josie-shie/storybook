'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProDistrib, getProGuess, payForProDistrib, payForProGuess } from 'data-center';
import { useParams, useRouter } from 'next/navigation';
import PaidDialog from '@/components/paidDialog/paidDialog';
import { useUserStore } from '@/app/userStore';
import BaseNoData from '@/components/baseNoData/noData';
import Rule from './components/rule/rule';
import GameCard from './gameCard';
import AnalyzeColumn from './analyze';
import Title from './img/title.png';
import style from './masterPlan.module.scss';
import { useGuessDetailStore } from './guessDetailStore';
import starIcon from './img/star.png';

function MasterPlan() {
    const matchId = useParams().matchId;
    const router = useRouter();
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
    const [openPaid, setOpenPaid] = useState(false);
    const [amount, setAmount] = useState(0);
    const [plan, setPlan] = useState(false);

    const userInfo = useUserStore.use.userInfo();
    const userBalance = userInfo.balance;
    const highWinRateTrend = useGuessDetailStore.use.highWinRateTrend();
    const masterPlanList = useGuessDetailStore.use.masterPlanList();

    const setUserInfo = useUserStore.use.setUserInfo();
    const setHighWinRateTrend = useGuessDetailStore.use.setHighWinRateTrend();
    const setMasterPlanPrice = useGuessDetailStore.use.setMasterPlanPrice();
    const setMasterPlanList = useGuessDetailStore.use.setMasterPlanList();

    const handleUnlockTrendDialogOpen = (newAmount: number, getPlan: string) => {
        if (getPlan === 'single') {
            setPlan(true);
        } else if (getPlan === 'monthly') {
            setPlan(false);
        }
        setAmount(newAmount);
        setOpenPaid(true);
    };

    const handleLocalClickOpen = (gameId: number, newAmount: number, getPlan: string) => {
        if (getPlan === 'single') {
            setPlan(true);
        } else if (getPlan === 'monthly') {
            setPlan(false);
        }
        setSelectedGameId(gameId);
        setAmount(newAmount);
        setOpenPaid(true);
    };

    const handleClickClose = () => {
        setOpenPaid(false);
    };

    const handleConfirm = async () => {
        if (userBalance <= 0) {
            setSelectedGameId(null);
            setOpenPaid(false);
            goRechargePage();
            return;
        }
        if (typeof selectedGameId === 'number') {
            await payForProGuess({ guessId: selectedGameId });
            // response 處理 (高手方案)
        } else {
            const res = await payForProDistrib({ matchId: Number(matchId) });
            if (res.success) {
                const data = res.data;
                const newProDistrib = {
                    ...highWinRateTrend,
                    home: data.home,
                    away: data.away,
                    over: data.over,
                    under: data.under
                };
                setHighWinRateTrend(newProDistrib);
                const newUserInfo = { ...userInfo, balance: data.currentBalance };
                setUserInfo(newUserInfo);
            }
        }
        setSelectedGameId(null);
        setOpenPaid(false);
    };

    const goRechargePage = () => {
        router.push('/userInfo/subscribe');
    };

    useEffect(() => {
        async function fetchProDistrib() {
            const proDistribution = await getProDistrib({ matchId: Number(matchId), memberId: 16 });
            if (proDistribution.success) {
                const data = proDistribution.data;
                setHighWinRateTrend(data);
            }
        }
        async function fetchProGuess() {
            const proGuess = await getProGuess({ matchId: Number(matchId), memberId: 16 });
            if (proGuess.success) {
                const data = proGuess.data;
                setMasterPlanList(data.proGuess);
                setMasterPlanPrice(data.unlockPrice);
            } else {
                setMasterPlanList([]);
            }
        }
        void fetchProDistrib();
        void fetchProGuess();
    }, [matchId]);

    return (
        <div className={style.masterPlan}>
            {highWinRateTrend.enoughProData ? (
                <div className={style.area}>
                    <div className={style.title}>
                        <div className={style.name}>
                            <Image alt="titleIcon" src={Title} width={16} />
                            <span>近20场高胜率玩家风向</span>
                        </div>
                        <Rule />
                    </div>
                    <div className={style.analyze}>
                        {highWinRateTrend.memberPermission ? (
                            <>
                                <AnalyzeColumn awayType="客" homeType="主" />
                                <AnalyzeColumn awayType="小" homeType="大" />
                            </>
                        ) : (
                            <div className={style.mask}>
                                <button
                                    onClick={() => {
                                        handleUnlockTrendDialogOpen(10, 'single');
                                    }}
                                    type="button"
                                >
                                    <Image
                                        alt=""
                                        className={style.coin}
                                        src={starIcon}
                                        width={16}
                                    />{' '}
                                    {highWinRateTrend.unlockPrice} 金币解锁本场
                                </button>
                                {/* 訂閱方案流程待改 */}
                                <button
                                    onClick={() => {
                                        handleUnlockTrendDialogOpen(200, 'monthly');
                                    }}
                                    type="button"
                                >
                                    <Image
                                        alt=""
                                        className={style.coin}
                                        src={starIcon}
                                        width={16}
                                    />{' '}
                                    365天VIP无限看专案
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}

            <div className={style.area}>
                <div className={style.planList}>
                    <div className={style.title}>
                        <span>同场高手方案</span>
                    </div>
                    {masterPlanList.length === 0 ? (
                        <BaseNoData />
                    ) : (
                        masterPlanList.map((el, idx) => (
                            <GameCard
                                key={idx}
                                onOpenPaidDialog={() => {
                                    handleLocalClickOpen(el.guessId, 20, 'single');
                                }}
                                plan={el}
                            />
                        ))
                    )}
                </div>
            </div>
            <PaidDialog
                amount={amount}
                balance={userBalance}
                onClose={handleClickClose}
                onConfirm={handleConfirm}
                openPaid={openPaid}
                plan={plan}
            />
        </div>
    );
}

export default MasterPlan;

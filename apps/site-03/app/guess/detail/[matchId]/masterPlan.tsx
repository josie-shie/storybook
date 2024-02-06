'use client';
import { useEffect, useState } from 'react';
import { getProDistrib, getProGuess, payForProGuess } from 'data-center';
import { useParams, useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import BaseNoData from '@/components/baseNoData/noData';
import Rule from './components/rule/rule';
import GameCard from './gameCard';
import AnalyzeRow from './components/analyzeRow/analyze';
import TitleIcon from './img/title.svg';
import style from './masterPlan.module.scss';
import { useGuessDetailStore } from './guessDetailStore';

function Trend() {
    const highWinRateTrend = useGuessDetailStore.use.highWinRateTrend();
    const showdistributed = highWinRateTrend.memberPermission;

    if (!highWinRateTrend.enoughProData) return null;
    return (
        <div className={`${style.area} ${!showdistributed ? style.fade : ''}`}>
            <div className={style.title}>
                <div className={style.name}>
                    <TitleIcon />
                    <span>高胜率玩家风向</span>
                </div>
            </div>
            <div className={style.analyze}>
                <AnalyzeRow awayType="客" homeType="主" />
                <AnalyzeRow awayType="小" homeType="大" />
            </div>
            <div className={style.masterGuess}>{highWinRateTrend.proMemberNum}位高手猜過</div>
            {showdistributed ? null : (
                <div className={style.blurCover}>
                    <TitleIcon />
                    <span>猜球后即可解锁</span>
                    <span>高胜率玩家风向</span>
                </div>
            )}
            <div className={style.ruleContainer}>
                <Rule />
            </div>
        </div>
    );
}

interface PlanListPropsType {
    isLogin: boolean;
    setAmount: (number: number) => void;
    setOpenPaid: (open: boolean) => void;
    setSelectedGameId: (gameId: number) => void;
}

function MasterPlanList({ isLogin, setAmount, setOpenPaid, setSelectedGameId }: PlanListPropsType) {
    const masterPlanList = useGuessDetailStore.use.masterPlanList();
    const masterPlanPrice = useGuessDetailStore.use.masterPlanPrice();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();

    const handleLocalClickOpen = (gameId: number, newAmount: number) => {
        setSelectedGameId(gameId);
        setAmount(newAmount);
        setOpenPaid(true);
    };

    if (masterPlanList.length === 0) return <BaseNoData text="暂无资料" />;
    return (
        <>
            {masterPlanList.map(el => (
                <GameCard
                    key={el.guessId}
                    onOpenPaidDialog={() => {
                        if (!isLogin) {
                            setAuthQuery('login');
                            setIsDrawerOpen(true);
                            return;
                        }
                        handleLocalClickOpen(el.guessId, masterPlanPrice);
                    }}
                    plan={el}
                />
            ))}
        </>
    );
}

function MasterPlan() {
    const router = useRouter();
    const matchId = useParams().matchId;
    const [isProDistribLoading, setIsProDistribLoading] = useState(true);
    const [isPlanLoading, setIsPlanLoading] = useState(true);
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
    const [openPaid, setOpenPaid] = useState(false);
    const [amount, setAmount] = useState(0);

    const isLogin = useUserStore.use.isLogin();
    const userInfo = useUserStore.use.userInfo();
    const userBalance = userInfo.balance;
    const masterPlanList = useGuessDetailStore.use.masterPlanList();

    const setUserInfo = useUserStore.use.setUserInfo();
    const setHighWinRateTrend = useGuessDetailStore.use.setHighWinRateTrend();
    const setMasterPlanPrice = useGuessDetailStore.use.setMasterPlanPrice();
    const setMasterPlanList = useGuessDetailStore.use.setMasterPlanList();

    const handleConfirm = async () => {
        if (userBalance <= 0) {
            setSelectedGameId(null);
            setOpenPaid(false);
            goRechargePage();
            return;
        }
        if (typeof selectedGameId === 'number') {
            // 解鎖高手方案
            const res = await payForProGuess({ guessId: selectedGameId });
            if (res.success) {
                const data = res.data;
                const idx = masterPlanList.findIndex(ele => ele.guessId === data.guessId);
                const newList = [...masterPlanList];
                newList[idx].predictedPlay = data.predictedPlay;
                setMasterPlanList(newList);
                setUserInfo({ ...userInfo, balance: data.currentBalance });
            }
        }
        setSelectedGameId(null);
        setOpenPaid(false);
    };

    const goRechargePage = () => {
        router.push('/userInfo/subscribe');
    };

    useEffect(() => {
        const memberId = isLogin ? userInfo.uid : 1;
        async function fetchProDistrib() {
            const proDistribution = await getProDistrib({ matchId: Number(matchId), memberId });
            if (proDistribution.success) {
                const data = proDistribution.data;
                setHighWinRateTrend(data);
                setIsProDistribLoading(false);
            }
        }
        async function fetchProGuess() {
            const proGuess = await getProGuess({ matchId: Number(matchId), memberId });
            if (proGuess.success) {
                const data = proGuess.data;
                setMasterPlanList(data.proGuess);
                setMasterPlanPrice(data.unlockPrice);
                setIsPlanLoading(false);
            } else {
                setMasterPlanList([]);
            }
        }
        void fetchProDistrib();
        void fetchProGuess();
    }, [isLogin, matchId, userInfo.uid]);

    return (
        <div className={style.masterPlan}>
            {isProDistribLoading ? (
                <div className={style.distribLoading}>
                    <CircularProgress size={24} />
                </div>
            ) : (
                <Trend />
            )}
            <div className={style.area}>
                <div className={style.planList}>
                    <div className={style.title}>
                        <span>同场猜球高手方案</span>
                    </div>
                    {isPlanLoading ? (
                        <div className={style.planLoading}>
                            <CircularProgress size={24} />
                        </div>
                    ) : (
                        <MasterPlanList
                            isLogin={isLogin}
                            setAmount={setAmount}
                            setOpenPaid={setOpenPaid}
                            setSelectedGameId={setSelectedGameId}
                        />
                    )}
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
                onPay={handleConfirm}
                price={amount}
            />
        </div>
    );
}

export default MasterPlan;

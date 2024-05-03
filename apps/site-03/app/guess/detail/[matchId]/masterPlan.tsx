'use client';
import { useEffect, useState } from 'react';
import {
    getProDistrib,
    getProGuess,
    payForProGuess,
    getHotGuessMatchList,
    type GetHotGuessMatch
} from 'data-center';
import { useParams } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import BaseNoData from '@/components/baseNoData/noData';
import RechargeDialog from '@/components/rechargeDialog/rechargeDialog';
import HotGameCard from '@/app/guess/(list)/contest/gameCard';
import Rule from './components/rule/rule';
import GameCard from './gameCard';
import AnalyzeRow from './components/analyzeRow/analyze';
import TitleIcon from './img/title.svg';
import style from './masterPlan.module.scss';
import { useGuessDetailStore } from './guessDetailStore';

function Trend() {
    const highWinRateTrend = useGuessDetailStore.use.highWinRateTrend();
    const isLocked = !highWinRateTrend.memberPermission;

    if (!highWinRateTrend.enoughProData) return null;
    return (
        <div className={`${style.area} ${isLocked ? style.fade : ''}`}>
            <div className={style.title}>
                <div className={style.name}>
                    <TitleIcon />
                    <span>高胜率玩家风向</span>
                </div>
            </div>
            <div className={style.analyze}>
                <AnalyzeRow awayType="客" homeType="主" isLocked={isLocked} />
                <AnalyzeRow awayType="小" homeType="大" isLocked={isLocked} />
            </div>
            <div className={style.masterGuess}>{highWinRateTrend.proMemberNum}位高手猜過</div>
            {isLocked ? (
                <div className={style.blurCover}>
                    <TitleIcon />
                    <span>猜球后即可解锁</span>
                    <span>高胜率玩家风向</span>
                </div>
            ) : null}
            <div className={style.ruleContainer}>
                <Rule />
            </div>
        </div>
    );
}

function HotGuessList({ hotMatchList }: { hotMatchList: GetHotGuessMatch[] }) {
    return (
        <>
            {hotMatchList.slice(0, 10).map((item: GetHotGuessMatch) => (
                <HotGameCard key={item.matchId} matchId={item.matchId} />
            ))}
            {hotMatchList.length ? (
                <div className={style.listEnd}>
                    <p>已滑到底啰</p>
                </div>
            ) : null}
        </>
    );
}

interface PlanListPropsType {
    isLogin: boolean;
    setAmount: (number: number) => void;
    setOpenPaid: (open: boolean) => void;
    setIsOpenRechargeDialog: (open: boolean) => void;
    setSelectedGameId: (gameId: number) => void;
    handleVIPUnlock: (gameId: number) => void;
}

function MasterPlanList({
    isLogin,
    setAmount,
    setOpenPaid,
    setIsOpenRechargeDialog,
    setSelectedGameId,
    handleVIPUnlock
}: PlanListPropsType) {
    const masterPlanList = useGuessDetailStore.use.masterPlanList();
    const masterPlanPrice = useGuessDetailStore.use.masterPlanPrice();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const userInfo = useUserStore.use.userInfo();

    const handleLocalClickOpen = (planId: number, newAmount: number) => {
        if (userInfo.balance < newAmount) {
            setIsOpenRechargeDialog(true);
            return;
        }
        setSelectedGameId(planId);
        setAmount(newAmount);
        setOpenPaid(true);
    };

    if (masterPlanList.length === 0) return <BaseNoData text="暂无资料" />;
    return (
        <>
            {masterPlanList.map(el => (
                <GameCard
                    handleVIPUnlock={handleVIPUnlock}
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
            {masterPlanList.length ? (
                <div className={style.listEnd}>
                    <p>已滑到底啰</p>
                </div>
            ) : null}
        </>
    );
}

function MasterPlan() {
    const matchId = useParams().matchId;
    const [isProDistribLoading, setIsProDistribLoading] = useState(true);
    const [isPlanLoading, setIsPlanLoading] = useState(false);
    const [hotMatchList, setHotMatchList] = useState<GetHotGuessMatch[]>([]);
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
    const [openPaid, setOpenPaid] = useState(false);
    const [isOpenRechargeDialog, setIsOpenRechargeDialog] = useState(false);
    const [amount, setAmount] = useState(0);

    const isLogin = useUserStore.use.isLogin();
    const userInfo = useUserStore.use.userInfo();
    const masterPlanList = useGuessDetailStore.use.masterPlanList();

    const setUserInfo = useUserStore.use.setUserInfo();
    const setHighWinRateTrend = useGuessDetailStore.use.setHighWinRateTrend();
    const setMasterPlanPrice = useGuessDetailStore.use.setMasterPlanPrice();
    const setMasterPlanList = useGuessDetailStore.use.setMasterPlanList();

    const handleConfirm = async () => {
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

    // VIP 免費查看
    const handleVIPUnlock = async (planId: number) => {
        const res = await payForProGuess({ guessId: planId });
        if (res.success) {
            const data = res.data;
            const idx = masterPlanList.findIndex(ele => ele.guessId === data.guessId);
            const newList = [...masterPlanList];
            newList[idx].predictedPlay = data.predictedPlay;
            setMasterPlanList(newList);
        }
    };

    const displayList = () => {
        return masterPlanList.length ? (
            <MasterPlanList
                handleVIPUnlock={handleVIPUnlock}
                isLogin={isLogin}
                setAmount={setAmount}
                setIsOpenRechargeDialog={setIsOpenRechargeDialog}
                setOpenPaid={setOpenPaid}
                setSelectedGameId={setSelectedGameId}
            />
        ) : (
            <HotGuessList hotMatchList={hotMatchList} />
        );
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
            if (proGuess.success && proGuess.data.proGuess.length) {
                const data = proGuess.data;
                setMasterPlanList(data.proGuess);
                setMasterPlanPrice(data.unlockPrice);
                setIsPlanLoading(false);
            } else {
                const hotGuessMatchList = await getHotGuessMatchList();
                if (hotGuessMatchList.success) {
                    setHotMatchList(hotGuessMatchList.data);
                }
            }
        }
        setIsPlanLoading(true);
        void fetchProDistrib();
        void fetchProGuess();
        setIsPlanLoading(false);
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
            <div className={`${style.area} ${style.masterPlanContainer}`}>
                <div className={style.planList}>
                    <div className={style.title}>
                        {masterPlanList.length ? (
                            <span>同场猜球高手方案({masterPlanList.length})</span>
                        ) : (
                            <span className={style.hotTitle}>其他热门猜球</span>
                        )}
                    </div>
                    {isPlanLoading ? (
                        <div className={style.planLoading}>
                            <CircularProgress size={24} />
                        </div>
                    ) : (
                        displayList()
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
            <RechargeDialog
                openDialog={isOpenRechargeDialog}
                setRechargeDialogClose={setIsOpenRechargeDialog}
            />
        </div>
    );
}

export default MasterPlan;

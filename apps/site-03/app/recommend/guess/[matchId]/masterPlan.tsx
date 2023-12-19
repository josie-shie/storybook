'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProDistrib, getProGuess, payForProDistrib, payForProGuess } from 'data-center';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/app/userStore';
import PaidDialog from '@/components/paidDialog/paidDialog';
import Rule from './components/rule/rule';
import GameCard from './gameCard';
import AnalyzeColumn from './analyze';
import Title from './img/title.png';
import style from './masterPlan.module.scss';
import { useGuessDetailStore } from './guessDetailStore';
import starIcon from './img/star.png';

function MasterPlan() {
    const matchId = useParams().matchId;
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
    const [openPaid, setOpenPaid] = useState(false);
    const [amount, setAmount] = useState(0);
    const [plan, setPlan] = useState(false);

    const userBalance = useUserStore.use.userInfo().balance;
    const highWinRateTrend = useGuessDetailStore.use.highWinRateTrend();
    const masterPlanList = useGuessDetailStore.use.masterPlanList();

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
        if (typeof selectedGameId === 'number') {
            setSelectedGameId(null);
            await payForProGuess({ guessId: selectedGameId });
            // response 處理 (方案)
        } else {
            await payForProDistrib({ matchId: Number(matchId) });
            // response 處理 (高手分佈)
        }
        setOpenPaid(false);
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
            }
        }
        void fetchProDistrib();
        void fetchProGuess();
    }, [matchId]);

    return (
        <div className={style.masterPlan}>
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
                                <Image alt="" className={style.coin} src={starIcon} width={16} />{' '}
                                {highWinRateTrend.unlockPrice} 金币解锁本场
                            </button>
                            {/* 訂閱方案流程待改 */}
                            <button
                                onClick={() => {
                                    handleUnlockTrendDialogOpen(200, 'monthly');
                                }}
                                type="button"
                            >
                                <Image alt="" className={style.coin} src={starIcon} width={16} />{' '}
                                365天VIP无限看专案
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className={style.area}>
                <div className={style.planList}>
                    <div className={style.title}>
                        <span>同场高手方案</span>
                    </div>
                    {masterPlanList.map((el, idx) => (
                        <GameCard
                            key={idx}
                            onOpenPaidDialog={() => {
                                handleLocalClickOpen(el.guessId, 20, 'single');
                            }}
                            plan={el}
                        />
                    ))}
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

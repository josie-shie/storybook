'use client';
import { useState } from 'react';
import Image from 'next/image';
import Rule from './components/rule/rule';
import GameCard from './gameCard';
import AnalyzeColumn from './analyze';
import Title from './img/title.png';
import style from './masterPlan.module.scss';
import { useGuessDetailStore } from './guessDetailStore';
import { useUserStore } from '@/app/userStore';
import PaidDialog from '@/components/paidDialog/paidDialog';

function MasterPlan() {
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
    const [openPaid, setOpenPaid] = useState(false);
    const [amount, setAmount] = useState(0);
    const [plan, setPlan] = useState(false);

    const userBalance = useUserStore.use.userInfo().balance;
    const isTrendUnlocked = useGuessDetailStore.use.unlockTrend();
    const trend = useGuessDetailStore.use.highWinRateTrend();
    const masterPlanList = useGuessDetailStore.use.masterPlanList();

    const setUnlockTrend = useGuessDetailStore.use.setUnlockTrend();
    const setMasterPlanList = useGuessDetailStore.use.setMasterPlanList();

    const handleGlobalClickOpen = (newAmount: number, getPlan: string) => {
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

    const handleConfirm = () => {
        if (typeof selectedGameId === 'number') {
            const newMasterPlan = [...masterPlanList];
            const index = newMasterPlan.findIndex(item => item.id === selectedGameId);
            newMasterPlan[index].unlock = true;
            setMasterPlanList(newMasterPlan);
            setSelectedGameId(null);
        } else {
            setUnlockTrend(true);
        }
        setOpenPaid(false);
    };

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
                    {isTrendUnlocked ? (
                        <>
                            <AnalyzeColumn awayType="客" homeType="主" />
                            <AnalyzeColumn awayType="小" homeType="大" />
                        </>
                    ) : (
                        <div className={style.mask}>
                            <button
                                onClick={() => {
                                    handleGlobalClickOpen(trend.unlockPrice, 'single');
                                }}
                                type="button"
                            >
                                {trend.unlockPrice} 金币解锁本场
                            </button>
                            {/* 訂閱方案流程待改 */}
                            <button
                                onClick={() => {
                                    handleGlobalClickOpen(200, 'monthly');
                                }}
                                type="button"
                            >
                                200 金币包月无限看
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
                                handleLocalClickOpen(el.id, el.unlockPrice, 'single');
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

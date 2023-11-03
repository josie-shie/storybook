'use client';
import { useState } from 'react';
import Rule from '../components/rule/rule';
import PaidDialog from './components/paidDialog/paidDialog';
import GameCard from './gameCard';
import AnalyzeColumn from './analyze';
import Title from './img/title.svg';
import style from './masterPlan.module.scss';

interface MasterPlanProps {
    isUnlocked: boolean;
    setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
}

function MasterPlan({ isUnlocked, setIsUnlocked }: MasterPlanProps) {
    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
    const [unlockedGames, setUnlockedGames] = useState<Set<string>>(new Set());
    const [openPaid, setOpenPaid] = useState(false);
    const [balance, setBalance] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [plan, setPlan] = useState(false);

    const handleGlobalClickOpen = (newBalance: number, newAmount: number, getPlan: string) => {
        if (getPlan === 'single') {
            setPlan(true);
        } else if (getPlan === 'monthly') {
            setPlan(false);
        }
        setBalance(newBalance);
        setAmount(newAmount);
        setOpenPaid(true);
    };

    const handleLocalClickOpen = (
        gameId: string,
        newBalance: number,
        newAmount: number,
        getPlan: string
    ) => {
        if (getPlan === 'single') {
            setPlan(true);
        } else if (getPlan === 'monthly') {
            setPlan(false);
        }
        setSelectedGameId(gameId);
        setBalance(newBalance);
        setAmount(newAmount);
        setOpenPaid(true);
    };

    const handleGameUnlock = (gameId: string) => {
        setUnlockedGames(prevState => new Set(prevState).add(gameId));
    };

    const handleClickClose = () => {
        setOpenPaid(false);
    };

    const handleConfirm = () => {
        if (selectedGameId) {
            handleGameUnlock(selectedGameId);
            setSelectedGameId(null);
        } else {
            setIsUnlocked(true);
        }
        setOpenPaid(false);
    };

    return (
        <div className={style.masterPlan}>
            <div className={style.area}>
                <div className={style.title}>
                    <div className={style.name}>
                        <Title />
                        <span>近20场高胜率玩家风向</span>
                    </div>
                    <Rule />
                </div>
                <div className={style.analyze}>
                    {!isUnlocked ? (
                        <div className={style.mask}>
                            <button
                                onClick={() => {
                                    handleGlobalClickOpen(100, 10, 'single');
                                }}
                                type="button"
                            >
                                10 金币解锁本场
                            </button>
                            <button
                                onClick={() => {
                                    handleGlobalClickOpen(100, 200, 'monthly');
                                }}
                                type="button"
                            >
                                200 金币包月无限看
                            </button>
                        </div>
                    ) : (
                        <>
                            <AnalyzeColumn
                                awayType="客"
                                awayUser={4}
                                homeType="主"
                                homeUser={888}
                                value={88}
                            />
                            <AnalyzeColumn
                                awayType="小"
                                awayUser={4}
                                homeType="大"
                                homeUser={888}
                                value={88}
                            />
                        </>
                    )}
                </div>
            </div>

            <div className={style.area}>
                <div className={style.planList}>
                    <div className={style.title}>
                        <span>同场高手方案</span>
                    </div>
                    <GameCard
                        globalUnlock={isUnlocked}
                        league="欧锦U20A vs 斯洛文尼亚U20"
                        localIsUnlocked={unlockedGames.has('1')}
                        name="老梁聊球"
                        onOpenPaidDialog={() => {
                            handleLocalClickOpen('1', 100, 200, 'single');
                        }}
                        text="9连红"
                    />
                    <GameCard
                        globalUnlock={isUnlocked}
                        league="欧锦U20A vs 斯洛文尼亚U20"
                        localIsUnlocked={unlockedGames.has('2')}
                        name="老梁聊球"
                        onOpenPaidDialog={() => {
                            handleLocalClickOpen('2', 100, 200, 'single');
                        }}
                        text="月榜10"
                    />
                    <GameCard
                        globalUnlock={isUnlocked}
                        league="欧锦U20A vs 斯洛文尼亚U20"
                        localIsUnlocked={unlockedGames.has('3')}
                        name="老梁聊球"
                        onOpenPaidDialog={() => {
                            handleLocalClickOpen('3', 100, 200, 'single');
                        }}
                        text="月榜10"
                    />
                    <GameCard
                        globalUnlock={isUnlocked}
                        league="欧锦U20A vs 斯洛文尼亚U20"
                        localIsUnlocked={unlockedGames.has('4')}
                        name="老梁聊球"
                        onOpenPaidDialog={() => {
                            handleLocalClickOpen('4', 100, 200, 'single');
                        }}
                        text="月榜10"
                    />
                </div>
            </div>
            <PaidDialog
                amount={amount}
                balance={balance}
                onClose={handleClickClose}
                onConfirm={handleConfirm}
                openPaid={openPaid}
                plan={plan}
            />
        </div>
    );
}

export default MasterPlan;

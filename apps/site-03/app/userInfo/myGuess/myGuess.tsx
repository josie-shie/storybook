'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import backLeftArrowImg from '../img/backLeftArrow.png';
import BettingPlan from './components/bettingPlan/bettingPlan';
import RecordFilter from './components/recordFilter/recordFilter';
import style from './myGuess.module.scss';
import RecentPerformance from './myGuessRecentPerformence';
import { creatMyGuessStoreStore } from './myGuessStore';

function MyGuess() {
    const router = useRouter();
    const [showFilter, setShowFilter] = useState(false);
    const [planActiveTab, setPlanActiveTab] = useState('全部');

    creatMyGuessStoreStore({
        myGuess: {
            rank: 1,
            recentPerformance: {
                byWeek: {
                    summary: { play: 100, win: 60, draw: 15, lose: 25 },
                    handicap: { play: 75, win: 50, draw: 5, lose: 20 },
                    size: { play: 25, win: 10, draw: 10, lose: 5 }
                },
                byMonth: {
                    summary: { play: 150, win: 70, draw: 30, lose: 50 },
                    handicap: { play: 100, win: 50, draw: 20, lose: 30 },
                    size: { play: 50, win: 20, draw: 10, lose: 20 }
                },
                byQuarter: {
                    summary: { play: 300, win: 200, draw: 20, lose: 80 },
                    handicap: { play: 100, win: 50, draw: 10, lose: 40 },
                    size: { play: 200, win: 150, draw: 10, lose: 40 }
                }
            },
            myPlans: {
                totale: [],
                handicap: [],
                size: []
            }
        }
    });

    const handlePlanTabClick = (tabName: string) => {
        setPlanActiveTab(tabName);
    };

    return (
        <>
            <div className={style.placeholder}>
                <div className={style.headerDetail}>
                    <div className={style.title}>
                        <Image
                            alt=""
                            height={24}
                            onClick={() => {
                                router.back();
                            }}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div className={style.text}>我的竟猜</div>
                    </div>
                </div>
            </div>

            <div className={style.myGuess}>
                <RecentPerformance />
                <div className={style.title}>
                    <span>方案</span>
                    <span
                        className={style.record}
                        onClick={() => {
                            setShowFilter(true);
                        }}
                    >
                        查看纪录
                    </span>
                </div>
                <div className={style.tab}>
                    <span
                        className={planActiveTab === '全部' ? style.active : ''}
                        onClick={() => {
                            handlePlanTabClick('全部');
                        }}
                    >
                        全部
                    </span>
                    <span
                        className={planActiveTab === '让球' ? style.active : ''}
                        onClick={() => {
                            handlePlanTabClick('让球');
                        }}
                    >
                        让球
                    </span>
                    <span
                        className={planActiveTab === '大小' ? style.active : ''}
                        onClick={() => {
                            handlePlanTabClick('大小');
                        }}
                    >
                        大小
                    </span>
                </div>
                <div className={style.plan}>
                    <BettingPlan />
                    <BettingPlan result="win" />
                    <BettingPlan result="defeat" />
                    <BettingPlan result="defeat" />
                    <BettingPlan result="defeat" />
                    <BettingPlan result="defeat" />
                    <BettingPlan result="defeat" />
                    <BettingPlan result="defeat" />
                    <BettingPlan result="defeat" />
                    <BettingPlan result="defeat" />
                    <BettingPlan result="defeat" />
                    <BettingPlan result="defeat" />
                    <BettingPlan result="defeat" />
                </div>
            </div>
            <RecordFilter
                isOpen={showFilter}
                onClose={() => {
                    setShowFilter(false);
                }}
                onOpen={() => {
                    setShowFilter(true);
                }}
            />
        </>
    );
}

export default MyGuess;

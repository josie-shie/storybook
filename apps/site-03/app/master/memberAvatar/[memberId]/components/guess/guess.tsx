'use client';
import { useEffect, useState } from 'react';
import {
    getMemberIndividualGuess,
    type GetMemberIndividualGuessResponse,
    type MemberIndividualGuessRecord
} from 'data-center';
import Record from '../record/record';
import BettingPlan from '../bettingPlan/bettingPlan';
import style from './guess.module.scss';

type DateTab = 'byWeek' | 'byMonth' | 'byQuarter';
type Tab = 0 | 1 | 2;

function InfoTabs({ params }: { params: { memberId: string } }) {
    const [guessLength, setGuessLength] = useState<number>(0);
    const [dateActiveTab, setDateActiveTab] = useState<DateTab>('byWeek');
    const [planActiveTab, setPlanActiveTab] = useState<Tab>(0);
    const [individualGuess, setIndividualGuess] = useState({} as GetMemberIndividualGuessResponse);
    const [individualGuessInfo, setIndividualGuessInfo] = useState({
        rank: 0,
        summary: {
            play: 0,
            win: 0,
            draw: 0,
            lose: 0
        },
        handicap: {
            play: 0,
            win: 0,
            draw: 0,
            lose: 0
        },
        size: {
            play: 0,
            win: 0,
            draw: 0,
            lose: 0
        }
    } as MemberIndividualGuessRecord);

    const handleTabClick = (tabName: DateTab) => {
        setDateActiveTab(tabName);

        const info = {
            byWeek: individualGuess.byWeek,
            byMonth: individualGuess.byMonth,
            byQuarter: individualGuess.byQuarter
        };
        const item = info[tabName];
        setIndividualGuessInfo(item);
    };

    const handlePlanTabClick = (tabName: Tab) => {
        setPlanActiveTab(tabName);
    };

    const fetchGuess = async () => {
        const res = await getMemberIndividualGuess({ memberId: Number(params.memberId) });

        if (!res.success) {
            return new Error();
        }
        setIndividualGuess(res.data);
        setIndividualGuessInfo(res.data.byWeek);
    };

    useEffect(() => {
        void fetchGuess();
    }, []);

    return (
        <div className={style.infoTabs}>
            <div className={style.tabContest}>
                <div className={style.title}>
                    <div className={style.tab}>
                        <span
                            className={`${style.defaultButton} ${
                                dateActiveTab === 'byWeek' ? style.active : ''
                            }`}
                            onClick={() => {
                                handleTabClick('byWeek');
                            }}
                        >
                            周榜
                        </span>
                        <span
                            className={`${style.defaultButton} ${
                                dateActiveTab === 'byMonth' ? style.active : ''
                            }`}
                            onClick={() => {
                                handleTabClick('byMonth');
                            }}
                        >
                            月榜
                        </span>
                        <span
                            className={`${style.defaultButton} ${
                                dateActiveTab === 'byQuarter' ? style.active : ''
                            }`}
                            onClick={() => {
                                handleTabClick('byQuarter');
                            }}
                        >
                            季榜
                        </span>
                    </div>
                </div>
                <div className={style.recentGames}>
                    <Record individualGuessInfo={individualGuessInfo} />
                </div>
                <div className={style.title}>
                    <span>专家猜球方案({guessLength})</span>
                    <div className={style.tabText}>
                        <span
                            className={planActiveTab === 0 ? style.active : ''}
                            onClick={() => {
                                handlePlanTabClick(0);
                            }}
                        >
                            全部
                        </span>
                        <span
                            className={planActiveTab === 1 ? style.active : ''}
                            onClick={() => {
                                handlePlanTabClick(1);
                            }}
                        >
                            总胜负
                        </span>
                        <span
                            className={planActiveTab === 2 ? style.active : ''}
                            onClick={() => {
                                handlePlanTabClick(2);
                            }}
                        >
                            总进球
                        </span>
                    </div>
                </div>
                <div className={style.bettingPlan}>
                    <BettingPlan
                        params={params}
                        planActiveTab={planActiveTab}
                        setGuessLength={setGuessLength}
                    />
                </div>
            </div>
        </div>
    );
}

export default InfoTabs;

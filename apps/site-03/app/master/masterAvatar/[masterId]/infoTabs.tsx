'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    getMemberIndividualGuess,
    type GetMemberIndividualGuessResponse,
    type MemberIndividualGuessRecord,
    type RecommendPost
} from 'data-center';
import { getPostList } from 'data-center';
import { motion } from 'framer-motion';
import AnalysisItem from './components/analysisItem/analysisItem';
import MasterItem from './components/masterItem/masterItem';
import BettingPlan from './components/bettingPlan/bettingPlan';
import style from './infoTabs.module.scss';
import Record from './components/record/record';

type DateTab = 'byWeek' | 'byMonth' | 'byQuarter';
type Tab = 0 | 1 | 2;

function InfoTabs({
    params,
    setArticleLength
}: {
    params: { masterId: string };
    setArticleLength: (val: number) => void;
}) {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
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
    const [predictArticleList, setPredictArticleList] = useState<RecommendPost[]>([]);

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
        const res = await getMemberIndividualGuess({ memberId: Number(params.masterId) });

        if (!res.success) {
            return new Error();
        }
        setIndividualGuess(res.data);
        setIndividualGuessInfo(res.data.byWeek);
    };

    const fetchAnalysis = async () => {
        const res = await getPostList({
            memberId: Number(params.masterId),
            postFilter: ['all']
        });

        if (!res.success) {
            return new Error();
        }
        setPredictArticleList(res.data.posts);
        setArticleLength(res.data.totalArticle);
    };

    useEffect(() => {
        void fetchAnalysis();
        void fetchGuess();
    }, []);

    return (
        <div className={style.infoTabs}>
            {status === 'analysis' && (
                <div className={style.tabContest}>
                    <AnalysisItem predictArticleList={predictArticleList} />
                </div>
            )}

            {status === 'guess' && (
                <div className={style.tabContest}>
                    <div className={style.title}>
                        <span>近期战绩</span>
                        <div className={style.tab}>
                            <motion.button
                                className={`${style.defaultButton} ${
                                    dateActiveTab === 'byWeek' ? style.active : ''
                                }`}
                                onClick={() => {
                                    handleTabClick('byWeek');
                                }}
                                type="button"
                                whileTap={{ scale: 0.9 }}
                            >
                                周榜
                            </motion.button>
                            <motion.button
                                className={`${style.defaultButton} ${
                                    dateActiveTab === 'byMonth' ? style.active : ''
                                }`}
                                onClick={() => {
                                    handleTabClick('byMonth');
                                }}
                                type="button"
                                whileTap={{ scale: 0.9 }}
                            >
                                月榜
                            </motion.button>
                            <motion.button
                                className={`${style.defaultButton} ${
                                    dateActiveTab === 'byQuarter' ? style.active : ''
                                }`}
                                onClick={() => {
                                    handleTabClick('byQuarter');
                                }}
                                type="button"
                                whileTap={{ scale: 0.9 }}
                            >
                                季榜
                            </motion.button>
                        </div>
                    </div>
                    <div className={style.recentGames}>
                        <Record individualGuessInfo={individualGuessInfo} />
                    </div>
                    <div className={style.title}>
                        <span>專家猜球方案({guessLength})</span>
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
                                让分
                            </span>
                            <span
                                className={planActiveTab === 2 ? style.active : ''}
                                onClick={() => {
                                    handlePlanTabClick(2);
                                }}
                            >
                                大小
                            </span>
                        </div>
                    </div>
                    <div>
                        <BettingPlan
                            planActiveTab={planActiveTab}
                            setGuessLength={setGuessLength}
                        />
                    </div>
                </div>
            )}
            {status === 'focus' && (
                <div className={style.tabContest}>
                    <MasterItem params={params} />
                </div>
            )}
        </div>
    );
}

export default InfoTabs;

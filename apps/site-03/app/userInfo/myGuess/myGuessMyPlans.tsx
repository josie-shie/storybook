'use client';
import { useEffect, useState } from 'react';
import { InfiniteScroll } from 'ui';
import {
    getMemberIndividualGuessMatches,
    type GetMemberIndividualGuessMatchesResponse,
    type MemberIndividualGuessMatch
} from 'data-center';
import { CircularProgress } from '@mui/material';
import NoData from '@/components/baseNoData/noData';
import Loading from '@/components/loading/loading';
import { useUserStore } from '@/store/userStore';
import BettingPlan from './components/bettingPlan/bettingPlan';
import style from './myGuess.module.scss';
import { useMyGuessStore } from './myGuessStore';

type Tab = 0 | 1 | 2;

function PlansList({ planActiveTab }: { planActiveTab: Tab }) {
    const uid = useUserStore.use.userInfo().uid;
    const initPlans = useMyGuessStore.use.myGuess().initPlans;
    const [displayList, setDisplayList] = useState<MemberIndividualGuessMatch[]>([]);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const fetchData = async (resetList = false) => {
        if (resetList) {
            const guessMatchListLength = initPlans[planActiveTab].guessMatchList.length;
            setDisplayList(initPlans[planActiveTab].guessMatchList);
            setIsNoData(guessMatchListLength === 0);
            setTotalCount(initPlans[planActiveTab].pagination.totalCount);
            return;
        }
        const res = await getMemberIndividualGuessMatches({
            memberId: uid,
            currentPage: currentPage + 1,
            pageSize: 50,
            guessType: planActiveTab
        });

        if (!res.success) {
            return new Error();
        }

        const updatedGuessMatchesList = displayList.concat(res.data.guessMatchList);
        setDisplayList(updatedGuessMatchesList);
        setIsNoData(res.data.guessMatchList.length === 0);
        setTotalCount(res.data.pagination.totalCount);
    };

    const loadMoreList = () => {
        if (currentPage <= Math.round(displayList.length / 30) && currentPage < totalCount) {
            setCurrentPage(prevData => prevData + 1);
            void fetchData();
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        void fetchData(true);
    }, [planActiveTab]);

    if (isNoData) return <NoData text="暂无资料" />;

    return (
        <>
            {displayList.map(row => (
                <BettingPlan key={row.id} rowData={row} />
            ))}
            {displayList.length < totalCount ? (
                <InfiniteScroll onVisible={loadMoreList}>
                    <div className={style.loadMore}>
                        <CircularProgress size={24} />
                    </div>
                </InfiniteScroll>
            ) : (
                <div className={style.listEnd}>
                    <p>已滑到底啰</p>
                </div>
            )}
        </>
    );
}

interface MyGuessMyPlansProps {
    setIsOpenRecord: (arg: boolean) => void;
}

function MyGuessMyPlans({ setIsOpenRecord }: MyGuessMyPlansProps) {
    const uid = useUserStore.use.userInfo().uid;
    const setInitPlans = useMyGuessStore.use.setInitPlans();
    const [planActiveTab, setPlanActiveTab] = useState<Tab>(0);
    const [isMyPlanLoading, setIsMyPlanLoading] = useState(false);

    const handleOpenRecord = () => {
        setIsOpenRecord(true);
    };

    const handlePlanTabClick = (tabName: Tab) => {
        setPlanActiveTab(tabName);
    };

    useEffect(() => {
        const initFetch = async () => {
            setIsMyPlanLoading(true);
            // 用于收集所有请求结果的临时变量
            const initPlan = {
                0: {} as GetMemberIndividualGuessMatchesResponse,
                1: {} as GetMemberIndividualGuessMatchesResponse,
                2: {} as GetMemberIndividualGuessMatchesResponse
            };
            await Promise.all(
                [0, 1, 2].map(async (value: Tab) => {
                    const res = await getMemberIndividualGuessMatches({
                        memberId: uid,
                        currentPage: 1,
                        pageSize: 50,
                        guessType: value
                    });

                    if (!res.success) {
                        throw new Error();
                    }
                    initPlan[value] = res.data;
                })
            );
            setInitPlans(initPlan);
            setIsMyPlanLoading(false);
        };

        if (uid) void initFetch();
    }, [setInitPlans, uid]);

    return (
        <div className={style.recordList}>
            <div className={style.guessTitle}>
                <span>我猜过的</span>
                <span className={style.record} onClick={handleOpenRecord}>
                    查看解锁方案
                </span>
            </div>
            <div className={style.title}>
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
                        胜负
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
                {isMyPlanLoading ? (
                    <div className={style.loaderBox}>
                        <Loading />
                    </div>
                ) : (
                    <PlansList planActiveTab={planActiveTab} />
                )}
            </div>
        </div>
    );
}

export default MyGuessMyPlans;

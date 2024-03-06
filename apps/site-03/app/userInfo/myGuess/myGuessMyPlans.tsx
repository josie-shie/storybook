'use client';
import { useEffect, useState } from 'react';
import { InfiniteScroll, Tab, Tabs } from 'ui';
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

function PlansList({
    planActiveTab,
    setPage,
    page
}: {
    setPage: (arg: number) => void;
    page: number;
    planActiveTab: Tab;
}) {
    const uid = useUserStore.use.userInfo().uid;
    const myPlansData = useMyGuessStore.use.myGuess().initPlans[planActiveTab].guessMatchList;
    const initPlans = useMyGuessStore.use.myGuess().initPlans;
    const pagination = useMyGuessStore.use.myGuess().initPlans[planActiveTab].pagination;
    const [displayList, setDisplayList] = useState<MemberIndividualGuessMatch[]>(myPlansData);
    const [disPlayPagination, setDisPlayPagination] = useState(pagination);

    const loadMoreList = async () => {
        if (
            page === disPlayPagination.pageCount ||
            initPlans[planActiveTab].guessMatchList.length === pagination.totalCount
        )
            return;
        const palns = await getMemberIndividualGuessMatches({
            memberId: uid,
            guessType: planActiveTab,
            currentPage: page + 1,
            pageSize: 50
        });
        if (palns.success) {
            setDisplayList(myPlansData.concat(palns.data.guessMatchList));
            setDisPlayPagination(palns.data.pagination);
            setPage(page + 1);
        }
    };

    if (!myPlansData.length) return <NoData text="暂无资料" />;

    return (
        <>
            {displayList.map(row => (
                <BettingPlan key={row.id} rowData={row} />
            ))}
            {displayList.length < pagination.totalCount ? (
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
const tabList = [
    {
        label: '全部',
        value: '0'
    },
    {
        label: '总胜负',
        value: '1'
    },
    {
        label: '总进球',
        value: '2'
    }
];
interface MyGuessMyPlansProps {
    setIsOpenRecord: (arg: boolean) => void;
}

function MyGuessMyPlans({ setIsOpenRecord }: MyGuessMyPlansProps) {
    const uid = useUserStore.use.userInfo().uid;
    const setInitPlans = useMyGuessStore.use.setInitPlans();
    const [planActiveTab, setPlanActiveTab] = useState<Tab>(0);
    const [isMyPlanLoading, setIsMyPlanLoading] = useState(false);
    const [page, setPage] = useState(1);

    const handlePlanTabClick = (tabName: Tab) => {
        setPage(1);
        setPlanActiveTab(tabName);
    };

    const handleOpenRecord = () => {
        setIsOpenRecord(true);
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
                    查看纪录
                </span>
            </div>
            <div className={style.btnTab}>
                <Tabs
                    defaultValue={planActiveTab}
                    gap={8}
                    onTabChange={value => {
                        handlePlanTabClick(Number(value) as Tab);
                    }}
                    position="center"
                    styling="button"
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.value} label={item.label} value={item.value}>
                                {isMyPlanLoading ? (
                                    <div className={style.loaderBox}>
                                        <Loading />
                                    </div>
                                ) : (
                                    <PlansList
                                        page={page}
                                        planActiveTab={planActiveTab}
                                        setPage={setPage}
                                    />
                                )}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </div>
    );
}

export default MyGuessMyPlans;

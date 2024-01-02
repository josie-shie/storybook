'use client';
import { useEffect, useState } from 'react';
import { InfiniteScroll, Tab, Tabs } from 'ui';
import { getMemberIndividualGuessMatches } from 'data-center';
import { CircularProgress } from '@mui/material';
import NoData from '@/components/baseNoData/noData';
import Loading from '@/components/loading/loading';
import { useUserStore } from '@/app/userStore';
import BettingPlan from './components/bettingPlan/bettingPlan';
import style from './myGuess.module.scss';
import { useMyGuessStore, type GuessType } from './myGuessStore';

function PlansList({
    planActiveTab,
    setPage,
    page
}: {
    setPage: (arg: number) => void;
    page: number;
    planActiveTab: string;
}) {
    const uid = useUserStore.use.userInfo().uid;
    const myPlansData = useMyGuessStore.use.myGuess().myPlans.guessMatchList;
    const setMyPlans = useMyGuessStore.use.setMyPlans();
    const pagination = useMyGuessStore.use.myGuess().myPlans.pagination;

    const loadMoreList = async () => {
        const palns = await getMemberIndividualGuessMatches({
            memberId: uid,
            guessType: Number(planActiveTab) as GuessType,
            currentPage: page + 1,
            pageSize: 20
        });
        if (palns.success) {
            setPage(page + 1);
            setMyPlans({
                guessType: palns.data.guessType,
                guessMatchList: myPlansData.concat(palns.data.guessMatchList),
                pagination: palns.data.pagination
            });
        }
    };
    return (
        <>
            {myPlansData.length === 0 ? (
                <NoData />
            ) : (
                <>
                    {myPlansData.map(row => (
                        <BettingPlan key={row.id} rowData={row} />
                    ))}
                    {myPlansData.length < pagination.totalCount ? (
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
        label: '让分',
        value: '1'
    },
    {
        label: '大小',
        value: '2'
    }
];

interface MyGuessMyPlansProps {
    setIsOpenRecord: (arg: boolean) => void;
}

function MyGuessMyPlans({ setIsOpenRecord }: MyGuessMyPlansProps) {
    const uid = useUserStore.use.userInfo().uid;
    const setMyPlans = useMyGuessStore.use.setMyPlans();
    const [planActiveTab, setPlanActiveTab] = useState('0');
    const [isMyPlanLoading, setIsMyPlanLoading] = useState(false);
    const [page, setPage] = useState(1);

    const handlePlanTabClick = async (tabName: string) => {
        setIsMyPlanLoading(true);
        setPage(1);
        setPlanActiveTab(tabName);
        const data = await getMemberIndividualGuessMatches({
            memberId: uid,
            guessType: Number(tabName) as GuessType,
            currentPage: 1,
            pageSize: 20
        });

        if (data.success) {
            setMyPlans(data.data);
        }
        setIsMyPlanLoading(false);
    };

    const handleOpenRecord = () => {
        setIsOpenRecord(true);
    };

    useEffect(() => {
        const initFetch = async () => {
            setIsMyPlanLoading(true);
            const data = await getMemberIndividualGuessMatches({
                memberId: uid,
                guessType: 0,
                currentPage: 1,
                pageSize: 20
            });

            if (data.success) {
                setMyPlans(data.data);
            }
            setIsMyPlanLoading(false);
        };
        if (uid) void initFetch();
    }, [setMyPlans, uid]);

    return (
        <>
            <div className={style.title}>
                <span>我猜过的</span>
                <span className={style.record} onClick={handleOpenRecord}>
                    查看纪录
                </span>
            </div>
            <div className={style.btnTab}>
                <Tabs
                    defaultValue={planActiveTab}
                    onTabChange={value => {
                        void handlePlanTabClick(value);
                    }}
                    position="center"
                    styling="button"
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.value} label={item.label} value={item.value}>
                                {isMyPlanLoading ? (
                                    <div className={style.loderBox}>
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
        </>
    );
}

export default MyGuessMyPlans;

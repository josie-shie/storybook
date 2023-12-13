'use client';
import { Tabs, Tab } from 'ui';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { timestampToString } from 'lib';
import { getFootballStatsRecord } from 'data-center';
import type { GetAiAnalysisReportResponse, GetFootballStatsRecord } from 'data-center';
import style from './dashboard.module.scss';
import Handicap from './(dashboard)/handicap/handicap';
import { createAnalysisResultStore, useAnalyticsResultStore } from './analysisResultStore';
import { creatMatchFilterStore } from './matchFilterStore';
import ContestDrawerList from './components/contestDrawerList/contestDrawerList';
import HeaderTitleFilter from '@/components/header/headerTitleFilter';
import { useUserStore } from '@/app/userStore';
import { useNotificationStore } from '@/app/notificationStore';

function ResultContent({ children }: { children: ReactNode }) {
    const route = usePathname().split('/');
    const router = useRouter();
    const params = useParams();
    const showContestDrawer = useAnalyticsResultStore.use.showContestDrawer();
    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const selectedResult = useAnalyticsResultStore.use.selectedResult();
    const contestList = useAnalyticsResultStore.use.contestList();
    const userInfo = useUserStore.use.userInfo();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();
    const setRecordData = useAnalyticsResultStore.use.setRecordData();
    const recordData = useAnalyticsResultStore.use.recordData();

    const getRecordData = async () => {
        const recordList = await getFootballStatsRecord({ memberId: userInfo.uid });

        if (!recordList.success) {
            const errorMessage = recordList.error ? recordList.error : '取得资料失败，请稍后再试';
            setIsNotificationVisible(errorMessage, 'error');
            return;
        }

        const record = recordList.data.find(item => item.ticketId.toString() === params.recordId);
        if (record) {
            setRecordData(record);
        }
    };

    const tabStyle = {
        gap: 4,
        swiperOpen: true,
        scrolling: true,
        buttonRadius: 30
    };

    const tabList = [
        {
            label: '讓球大小',
            to: `/bigData/${params.recordId as string}/handicap`,
            params: 'handicap'
        },
        {
            label: '15分鐘進球',
            to: `/bigData/${params.recordId as string}/minutes`,
            params: 'minutes'
        },
        {
            label: '進球數區間',
            to: `/bigData/${params.recordId as string}/range`,
            params: 'range'
        },
        {
            label: '全場波膽',
            to: `/bigData/${params.recordId as string}/bodan`,
            params: 'bodan'
        }
    ];

    const handicapTeam = {
        home: '主',
        away: '客'
    };

    const backHandler = () => {
        router.push('/bigData?status=analysis');
    };

    useEffect(() => {
        void getRecordData();
    }, []);

    return (
        <>
            <HeaderTitleFilter backHandler={backHandler} title="分析结果" />
            <div className={style.bigDataGame}>
                <div className={style.column}>
                    <div className={style.row}>
                        <span className={style.title}>全場讓球</span>
                        <span className={style.name}>
                            讓方/{(recordData && handicapTeam[recordData.handicapSide]) || '全部'}
                            、盤口/
                            {recordData?.handicapValues || '不挑選'}
                        </span>
                    </div>
                    <div className={style.row}>
                        <span className={style.title}>全場大小</span>
                        <span className={style.name}>
                            {recordData?.overUnderValues || '不挑選'}
                        </span>
                    </div>
                </div>
                <div className={style.column}>
                    <div className={style.row}>
                        <span className={style.title}>時間區間</span>
                        <span className={style.date}>
                            {recordData
                                ? timestampToString(recordData.startTime, 'YYYY-MM-DD')
                                : null}{' '}
                            ~{' '}
                            {recordData
                                ? timestampToString(recordData.endTime, 'YYYY-MM-DD')
                                : null}
                        </span>
                    </div>
                </div>
            </div>
            <div className={style.dashboard}>
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
                    defaultValue={
                        route[route.length - 1] === params.recordId.toString() ? 0 : undefined
                    }
                    fullBlock={
                        route[route.length - 1] === params.recordId.toString() ||
                        route[route.length - 1] === 'handicap'
                    }
                    gap={tabStyle.gap}
                    position="flexStart"
                    scrolling={tabStyle.scrolling}
                    styling="button"
                    swiperOpen={tabStyle.swiperOpen}
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.label} label={item.label} to={item.to}>
                                {item.params === route[route.length - 1] ? children : ''}

                                {route[route.length - 1] === params.recordId.toString() &&
                                    item.params === 'handicap' && <Handicap />}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
            <ContestDrawerList
                isOpen={showContestDrawer}
                matchList={contestList}
                onClose={() => {
                    setShowContestDrawer(false);
                }}
                onOpen={() => {
                    setShowContestDrawer(true);
                }}
                selectedResult={selectedResult}
            />
        </>
    );
}

function AnalysisResult({
    children,
    analysisData
}: {
    children: ReactNode;
    analysisData: GetAiAnalysisReportResponse;
}) {
    createAnalysisResultStore({
        analysisResultData: analysisData,
        recordData: {} as GetFootballStatsRecord
    });
    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });

    return <ResultContent>{children}</ResultContent>;
}

export default AnalysisResult;

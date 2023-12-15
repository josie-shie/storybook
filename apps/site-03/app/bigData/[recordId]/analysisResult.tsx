'use client';
import { Tabs, Tab } from 'ui';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { type ReactNode, Suspense, useEffect } from 'react';
import { timestampToString } from 'lib';
import { getFootballStatsResult } from 'data-center';
import style from './dashboard.module.scss';
import Handicap from './(dashboard)/handicap/handicap';
import { useAnalyticsResultStore } from './analysisResultStore';
import ContestDrawerList from './components/contestDrawerList/contestDrawerList';
import HeaderTitleFilter from '@/components/header/headerTitleFilter';

type HandicapSideType = 'home' | 'away';

function ResultContent({ children }: { children: ReactNode }) {
    const route = usePathname().split('/');
    const router = useRouter();
    const params = useParams();
    const showContestDrawer = useAnalyticsResultStore.use.showContestDrawer();
    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const selectedResult = useAnalyticsResultStore.use.selectedResult();
    const contestList = useAnalyticsResultStore.use.contestList();
    const analysisData = useAnalyticsResultStore.use.analysisResultData();

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

    return (
        <>
            <HeaderTitleFilter backHandler={backHandler} title="分析结果" />
            <div className={style.bigDataGame}>
                <div className={style.column}>
                    <div className={style.row}>
                        <span className={style.title}>全場讓球</span>
                        <span className={style.name}>
                            讓方/
                            {handicapTeam[analysisData.handicapSide as HandicapSideType] || '全部'}
                            、盤口/
                            {analysisData.handicapValues ||
                                analysisData.handicapValues === '0' ||
                                '不挑選'}
                        </span>
                    </div>
                    <div className={style.row}>
                        <span className={style.title}>全場大小</span>
                        <span className={style.name}>
                            {analysisData.overUnderValues || '不挑選'}
                        </span>
                    </div>
                </div>
                <div className={style.column}>
                    <div className={style.row}>
                        <span className={style.title}>時間區間</span>
                        <span className={style.date}>
                            {timestampToString(analysisData.startTime, 'YYYY-MM-DD')} ~{' '}
                            {timestampToString(analysisData.endTime, 'YYYY-MM-DD')}
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
                                <Suspense fallback={<div>Loading</div>}>
                                    {item.params === route[route.length - 1] ? children : ''}

                                    {route[route.length - 1] === params.recordId.toString() &&
                                        item.params === 'handicap' && <Handicap />}
                                </Suspense>
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

function AnalysisResult({ children }: { children: ReactNode }) {
    const params = useParams();
    const setAnalysisResultData = useAnalyticsResultStore.use.setAnalysisResultData();
    const setHandicapEchart = useAnalyticsResultStore.use.setHandicapEchart();

    const fetchData = async () => {
        const res = await getFootballStatsResult({
            ticketId: params.recordId.toString(),
            memberId: 243
        });

        if (!res.success) {
            return <div />;
        }

        setAnalysisResultData(res.data);
        setHandicapEchart(res.data);
    };

    useEffect(() => {
        void fetchData();
    }, []);

    return <ResultContent>{children}</ResultContent>;
}

export default AnalysisResult;

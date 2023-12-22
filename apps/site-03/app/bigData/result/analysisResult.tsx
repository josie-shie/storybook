'use client';
import { Tabs, Tab } from 'ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { timestampToString } from 'lib';
import HeaderTitleFilter from '@/components/header/headerTitleFilter';
import Loading from '@/components/loading/loading';
import { useHandicapAnalysisFormStore } from '../formStore';
import style from './dashboard.module.scss';
import Handicap from './(dashboard)/handicap/handicap';
import { useAnalyticsResultStore } from './analysisResultStore';
import ContestDrawerList from './components/contestDrawerList/contestDrawerList';
import Minutes from './(dashboard)/minutes/minutes';
import Bodan from './(dashboard)/bodan/bodan';
import Range from './(dashboard)/range/range';
import Tutorial from './tutorial';

type HandicapSideType = 'home' | 'away';

function ResultContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pageType = searchParams.get('type');
    const [defaultPageIndex, setDefaultPageIndex] = useState(0);
    const showContestDrawer = useAnalyticsResultStore.use.showContestDrawer();
    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const selectedResult = useAnalyticsResultStore.use.selectedResult();
    const contestList = useAnalyticsResultStore.use.contestList();
    const showedTutorial = localStorage.getItem('showAnalysisTutorial');

    const endDate = useHandicapAnalysisFormStore.use.endDate();
    const startDate = useHandicapAnalysisFormStore.use.startDate();
    const teamSelected = useHandicapAnalysisFormStore.use.teamSelected();
    const teamHandicapOdds = useHandicapAnalysisFormStore.use.teamHandicapOdds();
    const handicapOddsSelected = useHandicapAnalysisFormStore.use.handicapOddsSelected();
    const loading = useHandicapAnalysisFormStore.use.loading();

    const tabStyle = {
        gap: 4,
        swiperOpen: true,
        scrolling: true,
        buttonRadius: 30
    };

    const tabList = useMemo(
        () => [
            {
                label: '让分大小',
                content: <Handicap />,
                params: 'handicap'
            },
            {
                label: '15分钟进球',
                content: <Minutes />,
                params: 'minutes'
            },
            {
                label: '进球数区间',
                content: <Range />,
                params: 'range'
            },
            {
                label: '全场波胆',
                content: <Bodan />,
                params: 'bodan'
            }
        ],
        []
    );

    const handicapTeam = {
        home: '主',
        away: '客'
    };

    const backHandler = () => {
        router.push('/bigData/analysis?status=analysis');
    };

    useEffect(() => {
        if (pageType) {
            const index = tabList.findIndex(item => item.params === pageType);
            setDefaultPageIndex(index || 0);
        } else {
            router.push(`${pathname}?type=handicap`);
        }
    }, [pageType, pathname, router, tabList]);

    return (
        <>
            <div className={style.analysisResult}>
                <div className={style.resultPage}>
                    <HeaderTitleFilter backHandler={backHandler} title="分析结果" />
                    <div className={style.bigDataGame}>
                        <div className={style.column}>
                            <div className={style.row}>
                                <span className={style.title}>全场让分</span>
                                <span className={style.name}>
                                    让方/
                                    {handicapTeam[teamSelected as HandicapSideType] || '全部'}
                                    、盘口/
                                    {teamHandicapOdds || teamHandicapOdds === '0' || '不挑选'}
                                </span>
                            </div>
                            <div className={style.row}>
                                <span className={style.title}>全场大小</span>
                                <span className={style.name}>
                                    {handicapOddsSelected || '不挑選'}
                                </span>
                            </div>
                        </div>
                        <div className={style.column}>
                            <div className={style.row}>
                                <span className={style.title}>時間區間</span>
                                <span className={style.date}>
                                    {timestampToString(startDate, 'YYYY-MM-DD')} ~{' '}
                                    {timestampToString(endDate, 'YYYY-MM-DD')}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.dashboard}>
                        <Tabs
                            buttonRadius={tabStyle.buttonRadius}
                            defaultValue={defaultPageIndex}
                            gap={tabStyle.gap}
                            position="flexStart"
                            scrolling={tabStyle.scrolling}
                            styling="button"
                            swiperOpen={tabStyle.swiperOpen}
                        >
                            {tabList.map(item => {
                                return (
                                    <Tab key={item.params} label={item.label}>
                                        {loading ? (
                                            <Loading loadingText="资料产生中..." />
                                        ) : (
                                            item.content
                                        )}
                                    </Tab>
                                );
                            })}
                        </Tabs>
                    </div>
                </div>
                {!showedTutorial ? (
                    <div className={style.tutorialBlock}>
                        <Tutorial setDefaultPageIndex={setDefaultPageIndex} />
                    </div>
                ) : null}
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

function AnalysisResult() {
    const analysisResultData = useAnalyticsResultStore.use.analysisResultData();
    const setHandicapEchart = useAnalyticsResultStore.use.setHandicapEchart();

    useEffect(() => {
        setHandicapEchart(analysisResultData);
    }, [analysisResultData, setHandicapEchart]);

    return <ResultContent />;
}

export default AnalysisResult;

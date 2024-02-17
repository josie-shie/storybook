'use client';
import { useEffect, useState } from 'react';
import type { GetFootballStatsMatchesResponse } from 'data-center';
import { getFootballStatsMatches } from 'data-center';
import { Tab, Tabs } from 'ui';
import { Skeleton } from '@mui/material';
import MagnifyingGlass from '@/app/aiBigData/analysisResult/img/magnifyingGlass.svg';
import { useNotificationStore } from '@/store/notificationStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useMatchFilterStore } from '../../matchFilterStore';
import ContestCard from '../../components/contestCard/contestCard';
import Footer from '../../components/footer/footer';
import style from './handicap.module.scss';
import BarChart from './components/barChart/barChart';
import HandicapTable from './components/handicapTable/handicapTable';
import MixedLineChart from './components/mixedLineChart/mixedLineChart';
import '@/app/football/[matchId]/dataTable.scss';

function ContestList({ matchIds }: { matchIds: number[] }) {
    const [matchList, setMatchList] = useState<GetFootballStatsMatchesResponse>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let ignore = false;
        const setIsNotificationVisible = useNotificationStore.getState().setIsVisible;
        const fetchMatchList = async () => {
            try {
                setIsLoading(true);
                const res = await getFootballStatsMatches({ matchIds });

                if (!res.success) {
                    const errorMessage = res.error ? res.error : '取得资料失败，请稍后再试';
                    setIsNotificationVisible(errorMessage, 'error');
                    return;
                }

                if (!ignore) {
                    setMatchList(res.data);
                }
            } finally {
                setIsLoading(false);
            }
        };
        void fetchMatchList();
        return () => {
            ignore = true;
        };
    }, [matchIds]);

    return (
        <div className={style.matchList}>
            {!isLoading && matchList.length > 0 ? (
                matchList.map(match => <ContestCard key={match.matchId} match={match} />)
            ) : (
                <div className={style.loadingSkeleton} style={{ height: '62px' }}>
                    <Skeleton animation="wave" height="15px" variant="text" width="40px" />
                    <div>
                        <Skeleton animation="wave" height="15px" variant="text" width="100%" />
                        <Skeleton animation="wave" height="20px" variant="text" width="100%" />
                    </div>
                </div>
            )}
        </div>
    );
}

function OverUnderTrend() {
    const [matchIds, setMatchIds] = useState<number[]>([]);
    const handicapEchart = useAnalyticsResultStore.use.handicapEchart();
    const labels = [
        { label: '大', color: 'rgb(255, 109, 109)' },
        { label: '小', color: 'rgb(141, 141, 141)' }
    ];

    return (
        <>
            <MixedLineChart
                chartData={handicapEchart.full}
                lengendLabels={labels}
                setMatchIds={setMatchIds}
                tabType="overUnder"
            />
            <ContestList matchIds={matchIds} />
        </>
    );
}

function HandicapTrend() {
    const [matchIds, setMatchIds] = useState<number[]>([]);
    const handicapEchart = useAnalyticsResultStore.use.handicapEchart();
    const labels = [
        { label: '上盘', color: 'rgb(255, 67, 67)' },
        { label: '下盘', color: 'rgb(141, 141, 141)' }
    ];

    return (
        <>
            <MixedLineChart
                chartData={handicapEchart.full}
                lengendLabels={labels}
                setMatchIds={setMatchIds}
                tabType="handicap"
            />
            <ContestList matchIds={matchIds} />
        </>
    );
}

function MatchesTrend() {
    const tabStyle = {
        gap: 4,
        swiperOpen: false
    };

    const tabList = [
        {
            label: `看让分`,
            content: <HandicapTrend />,
            status: 'handicap',
            id: 'handicap,'
        },
        {
            label: `看大小`,
            content: <OverUnderTrend />,
            status: 'overUnder',
            id: 'overUnder'
        }
    ];

    return (
        <div className={style.matchesTrend}>
            <div className={style.title}>
                <MagnifyingGlass />
                <span>详细赛事走势</span>
            </div>
            <div className={style.tabContainer}>
                <Tabs
                    gap={tabStyle.gap}
                    position="center"
                    styling="text"
                    swiperOpen={tabStyle.swiperOpen}
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.id} label={item.label}>
                                {item.content}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </div>
    );
}

interface TableDataType {
    topValue?: number[];
    middleValue?: number[];
    bottomValue: number[];
    topLabel?: string;
    middleLabel?: string;
    bottomLabel: string;
}

function Handicap() {
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const handicapEchart = useAnalyticsResultStore.use.handicapEchart();

    const [tableData, setTableData] = useState<TableDataType[]>([]);

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    useEffect(() => {
        const handicapUpperMatchList: number[] = [];
        const handicapLowerMatchList: number[] = [];
        const overUnderOverMatchList: number[] = [];
        const overUnderUnderMatchList: number[] = [];
        const moneylineHomeMatchList: number[] = [];
        const moneylineAwayMatchList: number[] = [];
        const moneylineDrawMatchList: number[] = [];
        analysisRecord?.fullHandicapUpperDaily?.forEach(item => {
            handicapUpperMatchList.push(...item.matchIds);
        });
        analysisRecord?.fullHandicapLowerDaily?.forEach(item => {
            handicapLowerMatchList.push(...item.matchIds);
        });
        analysisRecord?.fullOverUnderOverDaily?.forEach(item => {
            overUnderOverMatchList.push(...item.matchIds);
        });
        analysisRecord?.fullOverUnderUnderDaily?.forEach(item => {
            overUnderUnderMatchList.push(...item.matchIds);
        });
        analysisRecord?.fullTimeHomeWinDaily?.forEach(item => {
            moneylineHomeMatchList.push(...item.matchIds);
        });
        analysisRecord?.fullTimeAwayWinDaily?.forEach(item => {
            moneylineAwayMatchList.push(...item.matchIds);
        });
        analysisRecord?.fullTimeDrawDaily?.forEach(item => {
            moneylineDrawMatchList.push(...item.matchIds);
        });

        const newTableData = [
            {
                topValue: handicapUpperMatchList,
                middleValue: overUnderOverMatchList,
                bottomValue: moneylineHomeMatchList,
                topLabel: '上',
                middleLabel: '大',
                bottomLabel: '主'
            },
            {
                topValue: handicapLowerMatchList,
                middleValue: overUnderUnderMatchList,
                bottomValue: moneylineDrawMatchList,
                topLabel: '下',
                middleLabel: '小',
                bottomLabel: '和'
            },
            {
                bottomValue: moneylineAwayMatchList,
                bottomLabel: '客'
            }
        ];
        setTableData(newTableData);
    }, [
        analysisRecord?.fullHandicapLowerDaily,
        analysisRecord?.fullHandicapUpperDaily,
        analysisRecord?.fullOverUnderOverDaily,
        analysisRecord?.fullOverUnderUnderDaily,
        analysisRecord?.fullTimeAwayWinDaily,
        analysisRecord?.fullTimeDrawDaily,
        analysisRecord?.fullTimeHomeWinDaily,
        handicapEchart
    ]);

    return (
        <div className={style.handicap}>
            <BarChart chartData={handicapEchart.full.day} />
            <HandicapTable tableData={tableData} />
            <MatchesTrend />
            <Footer />
        </div>
    );
}

export default Handicap;

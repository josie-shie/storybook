'use client';
import { useEffect, useState } from 'react';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useMatchFilterStore } from '../../matchFilterStore';
import style from './handicap.module.scss';
import BarChart from './components/barChart/barChart';
import '@/app/football/[matchId]/dataTable.scss';
import HandicapTable from './components/handicapTable/handicapTable';
import MagnifyingGlass from '@/app/aiBigData/analysisResult/img/magnifyingGlass.svg';
import { Tab, Tabs } from 'ui';
import MixedLineChart from './components/mixedLineChart/mixedLineChart';
import {
    GetFootballStatsMatchesResponse,
    MatchDateMatchListType,
    getFootballStatsMatches
} from 'data-center';
import { useNotificationStore } from '@/store/notificationStore';
import ContestCard from '../../components/contestCard/contestCard';

function ContestList({ matchIds }: { matchIds: number[] }) {
    const [matchList, setMatchList] = useState<GetFootballStatsMatchesResponse>([]);
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();

    useEffect(() => {
        void fetchMatchList();
    }, [matchIds]);

    const fetchMatchList = async () => {
        const res = await getFootballStatsMatches({ matchIds: matchIds });

        if (!res.success) {
            const errorMessage = res.error ? res.error : '取得资料失败，请稍后再试';
            setIsNotificationVisible(errorMessage, 'error');
            return;
        }

        setMatchList(res.data);
    };

    return (
        <div className={style.matchList}>
            {matchList.map(match => (
                <ContestCard key={match.matchId} match={match} />
            ))}
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
                type="overUnder"
                setMatchIds={setMatchIds}
                lengendLabels={labels}
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
                type="handicap"
                setMatchIds={setMatchIds}
                lengendLabels={labels}
            />
            <ContestList matchIds={matchIds} />
        </>
    );
}

function MatchesTrend() {
    const tabStyle = {
        gap: 0,
        swiperOpen: false,
        buttonRadius: 0
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
                    buttonRadius={tabStyle.buttonRadius}
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
    topValue?: MatchDateMatchListType[];
    middleValue?: MatchDateMatchListType[];
    bottomValue: MatchDateMatchListType[];
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
        const newTableData = [
            {
                topValue: analysisRecord?.fullHandicapUpper || [],
                middleValue: analysisRecord?.fullOverUnderOver || [],
                bottomValue: analysisRecord?.fullTimeHomeWin || [],
                topLabel: '上',
                middleLabel: '大',
                bottomLabel: '主'
            },
            {
                topValue: analysisRecord?.fullHandicapLower || [],
                middleValue: analysisRecord?.fullOverUnderUnder || [],
                bottomValue: analysisRecord?.fullTimeAwayWin || [],
                topLabel: '下',
                middleLabel: '小',
                bottomLabel: '客'
            },
            {
                bottomValue: analysisRecord?.fullTimeDraw || [],
                bottomLabel: '和'
            }
        ];
        setTableData(newTableData);
    }, [
        analysisRecord?.fullHandicapLower,
        analysisRecord?.fullHandicapUpper,
        analysisRecord?.fullOverUnderOver,
        analysisRecord?.fullOverUnderUnder,
        analysisRecord?.fullTimeAwayWin,
        analysisRecord?.fullTimeDraw,
        analysisRecord?.fullTimeHomeWin,
        handicapEchart
    ]);

    return (
        <div className={style.handicap}>
            <BarChart chartData={handicapEchart.full.day} />
            <HandicapTable tableData={tableData} />
            <MatchesTrend />
        </div>
    );
}

export default Handicap;

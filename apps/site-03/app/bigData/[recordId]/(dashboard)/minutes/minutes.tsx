'use client';
import { useEffect, useState } from 'react';
import FifteenMinutesChart from '../../components/fifteenMinutesChart/fifteenMinutesChart';
import ContestDrawerList from '../components/contestDrawerList';
import type { Match } from '../../analysisResultStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useMatchFilterStore } from '../../matchFilterStore';
import style from './minutes.module.scss';

const matchs = [
    {
        startTime: 1699280450,
        matchId: 2504100,
        countryCn: '科威特',
        leagueId: 923,
        leagueChsShort: '科威甲',
        homeChs: 'Al沙希尔',
        awayChs: '伯根',
        homeScore: 3,
        awayScore: 0,
        homeHalfScore: 3,
        awayHalfScore: 0,
        isFamous: true,
        leagueLevel: 1
    }
];

function TimeRangeTable({
    label,
    upper,
    lower,
    openMatchListDrawer
}: {
    label: string;
    upper: number[];
    lower: number[];
    openMatchListDrawer: (matchIdsList: number[], selectedType: string, odds: string) => void;
}) {
    return (
        <div className={style.tableContainer}>
            <div className={style.header}>{label}</div>

            <div className={style.cell}>
                <span
                    onClick={() => {
                        openMatchListDrawer(upper, label, '上');
                    }}
                >
                    上 {upper.length}
                </span>
            </div>
            <div className={`${style.cell} ${style.odd}`}>
                <span
                    onClick={() => {
                        openMatchListDrawer(lower, label, '下');
                    }}
                >
                    下 {lower.length}
                </span>
            </div>
        </div>
    );
}

function Minutes() {
    const headers = [
        '開場-14:59',
        '15:00-29:59',
        '30:00-半場',
        '下半場-59:59',
        '60:00-74:59',
        '75:00-全場'
    ];
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const [showList, setShowList] = useState(false);
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const [matchList, setMatchList] = useState<Match[]>([]);
    const [selectedResult, setSelectedResult] = useState({
        type: '',
        odds: ''
    });

    const openMatchListDrawer = (matchIdsList: number[], selectedType: string, odds: string) => {
        // eslint-disable-next-line -- for api request
        console.dir(matchIdsList);
        setMatchList(matchs);
        setSelectedResult({
            type: selectedType,
            odds
        });
        setContestList({
            contestList: matchs
        });
        setContestInfo({
            contestList: matchs
        });
        setShowList(true);
    };

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    return (
        <>
            <div className={style.minutes}>
                <FifteenMinutesChart headers={headers} minsGoalList={analysisRecord.minutesGoal} />
                <div className={style.dot}>
                    <span className={style.big}>大</span>
                    <span className={style.small}>小</span>
                </div>
            </div>
            <div className={style.contaniner}>
                {headers.map((time, index) => (
                    <TimeRangeTable
                        key={time}
                        label={time}
                        lower={analysisRecord.minutesGoal[index].goalLower}
                        openMatchListDrawer={openMatchListDrawer}
                        upper={analysisRecord.minutesGoal[index].goalUpper}
                    />
                ))}
            </div>

            <ContestDrawerList
                isOpen={showList}
                matchList={matchList}
                onClose={() => {
                    setShowList(false);
                }}
                onOpen={() => {
                    setShowList(true);
                }}
                selectedResult={selectedResult}
            />
        </>
    );
}

export default Minutes;

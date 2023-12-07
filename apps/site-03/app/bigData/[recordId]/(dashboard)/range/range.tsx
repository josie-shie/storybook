'use client';
import { useEffect, useState } from 'react';
import GoalRangeChart from '../../components/goalRangeChart/goalRangeChart';
import ContestDrawerList from '../components/contestDrawerList';
import type { Match } from '../../analysisResultStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useMatchFilterStore } from '../../matchFilterStore';
import style from './range.module.scss';

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

function TableCell({
    cellValue,
    selectedType,
    openMatchListDrawer
}: {
    cellValue: number[];
    selectedType: string;
    openMatchListDrawer: (matchIdsList: number[], selectedType: string) => void;
}) {
    return (
        <div className={`${style.cell}`}>
            <span
                onClick={() => {
                    openMatchListDrawer(cellValue, selectedType);
                }}
            >
                {cellValue.length}
            </span>
        </div>
    );
}

function Range() {
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const [showList, setShowList] = useState(false);
    const [matchList, setMatchList] = useState<Match[]>([]);
    const [selectedResult, setSelectedResult] = useState({
        type: '',
        odds: ''
    });
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const headers = [
        {
            class: style.first,
            label: '0-1',
            value: analysisRecord.goalRange.goalRange0To1,
            color: '#6357F0'
        },
        {
            class: style.second,
            label: '2-3',
            value: analysisRecord.goalRange.goalRange2To3,
            color: '#33AD1F'
        },
        {
            class: style.three,
            label: '4-6',
            value: analysisRecord.goalRange.goalRange4To6,
            color: '#4489FF'
        },
        {
            class: style.four,
            label: '7以上',
            value: analysisRecord.goalRange.goalRange7Upper,
            color: '#FBB03B'
        }
    ];

    const openMatchListDrawer = (matchIdsList: number[], selectedType: string) => {
        // eslint-disable-next-line -- for api request
        console.dir(matchIdsList);
        setMatchList(matchs);
        setSelectedResult({
            type: selectedType,
            odds: ''
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
            <div className={style.range}>
                <GoalRangeChart chartList={headers} />
                <div className={style.dot}>
                    {headers.map(header => (
                        <span className={header.class} key={header.label}>
                            {header.label}
                        </span>
                    ))}
                </div>
            </div>
            <div className={style.tableContainer}>
                {headers.map(header => (
                    <div className={style.header} key={header.label}>
                        {header.label}
                    </div>
                ))}
                {headers.map(header => (
                    <TableCell
                        cellValue={header.value}
                        key={header.label}
                        openMatchListDrawer={openMatchListDrawer}
                        selectedType={header.label}
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

export default Range;

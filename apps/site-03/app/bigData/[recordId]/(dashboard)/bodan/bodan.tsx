'use client';
import { useEffect, useState } from 'react';
import type { Match } from '../../analysisResultStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import ContestDrawerList from '../components/contestDrawerList';
import { useMatchFilterStore } from '../../matchFilterStore';
import style from './bodan.module.scss';

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

function Bodan() {
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const [showList, setShowList] = useState(false);
    const [matchList, setMatchList] = useState<Match[]>([]);
    const [selectedResult, setSelectedResult] = useState({
        type: '',
        odds: ''
    });

    const scores = [
        { score: '1-0', value: analysisRecord.exactGoal.goalRange1To0 },
        { score: '0-1', value: analysisRecord.exactGoal.goalRange0To1 },
        { score: '0-0', value: analysisRecord.exactGoal.goalRange0To0 },
        { score: '2-0', value: analysisRecord.exactGoal.goalRange2To0 },
        { score: '0-2', value: analysisRecord.exactGoal.goalRange0To2 },
        { score: '1-1', value: analysisRecord.exactGoal.goalRange1To1 },
        { score: '2-1', value: analysisRecord.exactGoal.goalRange2To1 },
        { score: '1-2', value: analysisRecord.exactGoal.goalRange1To2 },
        { score: '2-2', value: analysisRecord.exactGoal.goalRange2To2 },
        { score: '3-0', value: analysisRecord.exactGoal.goalRange3To0 },
        { score: '0-3', value: analysisRecord.exactGoal.goalRange0To3 },
        { score: '3-3', value: analysisRecord.exactGoal.goalRange3To3 },
        { score: '3-1', value: analysisRecord.exactGoal.goalRange3To1 },
        { score: '1-3', value: analysisRecord.exactGoal.goalRange1To3 },
        { score: '4-4', value: analysisRecord.exactGoal.goalRange4To4 },
        { score: '3-2', value: analysisRecord.exactGoal.goalRange3To2 },
        { score: '2-3', value: analysisRecord.exactGoal.goalRange2To3 },
        { score: '其他', value: analysisRecord.exactGoal.others },
        { score: '4-0', value: analysisRecord.exactGoal.goalRange4To0 },
        { score: '0-4', value: analysisRecord.exactGoal.goalRange0To4 },
        { score: '', value: [] },
        { score: '4-1', value: analysisRecord.exactGoal.goalRange4To1 },
        { score: '1-4', value: analysisRecord.exactGoal.goalRange1To4 },
        { score: '', value: [] },
        { score: '4-2', value: analysisRecord.exactGoal.goalRange4To2 },
        { score: '2-4', value: analysisRecord.exactGoal.goalRange2To4 },
        { score: '', value: [] },
        { score: '4-3', value: analysisRecord.exactGoal.goalRange4To3 },
        { score: '3-4', value: analysisRecord.exactGoal.goalRange3To4 },
        { score: '', value: [] }
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
            <div className={style.bodan}>
                {scores.map((item, index) => (
                    <div className={style.cell} key={`score_${index.toString()}`}>
                        <span className={`${style.score} ${!item.score ? style.nulls : ''}`}>
                            {item.score}
                        </span>
                        <span
                            className={`${style.value} ${!item.value.length ? style.nulls : ''}`}
                            onClick={() => {
                                openMatchListDrawer(item.value, item.score);
                            }}
                        >
                            <span>{item.score ? item.value.length : ''}</span>
                        </span>
                    </div>
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

export default Bodan;

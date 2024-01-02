'use client';
import { useEffect, useState } from 'react';
import { getFootballStatsMatches } from 'data-center';
import { useNotificationStore } from '@/app/notificationStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useMatchFilterStore } from '../../matchFilterStore';
import TextRadio from '../../components/switch/textSwitch';
import style from './bodan.module.scss';

type ScoreMapping = Partial<Record<string, number[]>>;

function Bodan() {
    const [handicapRadio, setHandicapRadio] = useState<'half' | 'full'>('full');
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();

    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const setSelectedResult = useAnalyticsResultStore.use.setSelectedResult();
    const setMatchList = useAnalyticsResultStore.use.setContestList();
    const [scoreListMapping, setScoreListMapping] = useState<ScoreMapping>({});

    const fetchMatchList = async (matchIdList: number[]) => {
        const res = await getFootballStatsMatches({ matchIds: matchIdList });

        if (!res.success) {
            const errorMessage = res.error ? res.error : '取得资料失败，请稍后再试';
            setIsNotificationVisible(errorMessage, 'error');
            return;
        }

        setMatchList(res.data);

        setContestList({
            contestList: res.data
        });
        setContestInfo({
            contestList: res.data
        });
        setShowContestDrawer(true);
    };

    const openMatchListDrawer = (matchIdsList: number[], selectedType: string) => {
        setSelectedResult({
            type: selectedType,
            odds: ''
        });
        void fetchMatchList(matchIdsList);
    };

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    useEffect(() => {
        const newScoreListMapping = {};

        const currentScore =
            handicapRadio === 'half'
                ? analysisRecord?.halfCorrectScores
                : analysisRecord?.correctScores;

        currentScore?.forEach(item => {
            newScoreListMapping[item.score] = item.matches;
        });

        setScoreListMapping(newScoreListMapping);
    }, [analysisRecord, handicapRadio]);

    const scores = [
        { score: '1-0', value: scoreListMapping['1-0'] || [] },
        { score: '0-1', value: scoreListMapping['0-1'] || [] },
        { score: '0-0', value: scoreListMapping['0-0'] || [] },
        { score: '2-0', value: scoreListMapping['2-0'] || [] },
        { score: '0-2', value: scoreListMapping['0-2'] || [] },
        { score: '1-1', value: scoreListMapping['1-1'] || [] },
        { score: '2-1', value: scoreListMapping['2-1'] || [] },
        { score: '1-2', value: scoreListMapping['1-2'] || [] },
        { score: '2-2', value: scoreListMapping['2-2'] || [] },
        { score: '3-0', value: scoreListMapping['3-0'] || [] },
        { score: '0-3', value: scoreListMapping['0-3'] || [] },
        { score: '3-3', value: scoreListMapping['3-3'] || [] },
        { score: '3-1', value: scoreListMapping['3-1'] || [] },
        { score: '1-3', value: scoreListMapping['1-3'] || [] },
        { score: '4-4', value: scoreListMapping['4-4'] || [] },
        { score: '3-2', value: scoreListMapping['3-2'] || [] },
        { score: '2-3', value: scoreListMapping['2-3'] || [] },
        { score: '其他', value: scoreListMapping.else || [] },
        { score: '4-0', value: scoreListMapping['4-0'] || [] },
        { score: '0-4', value: scoreListMapping['0-4'] || [] },
        { score: '', value: [] },
        { score: '4-1', value: scoreListMapping['4-1'] || [] },
        { score: '1-4', value: scoreListMapping['1-4'] || [] },
        { score: '', value: [] },
        { score: '4-2', value: scoreListMapping['4-2'] || [] },
        { score: '2-4', value: scoreListMapping['2-4'] || [] },
        { score: '', value: [] },
        { score: '4-3', value: scoreListMapping['4-3'] || [] },
        { score: '3-4', value: scoreListMapping['3-4'] || [] },
        { score: '', value: [] }
    ];

    return (
        <div className={style.bodan}>
            <TextRadio
                onChange={value => {
                    setHandicapRadio(value as 'half' | 'full');
                }}
                value={handicapRadio}
            />
            <div className={style.bodanScore}>
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
        </div>
    );
}

export default Bodan;

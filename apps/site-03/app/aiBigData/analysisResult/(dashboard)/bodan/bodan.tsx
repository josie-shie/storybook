import { getFootballStatsMatches } from 'data-center';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import style from './bodan.module.scss';
import { useNotificationStore } from '@/store/notificationStore';
import { useMatchFilterStore } from '../../matchFilterStore';
import { useEffect, useState } from 'react';

interface ItemType {
    score: string;
    matches: number[];
}

type ScoreMapping = Partial<Record<string, number[]>>;
type ValueCount = Record<number, number>;

function BodanItem({ item, highlight }: { item: ItemType; highlight: boolean }) {
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const setSelectedResult = useAnalyticsResultStore.use.setSelectedResult();
    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const setMatchList = useAnalyticsResultStore.use.setContestList();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();

    const openMatchListDrawer = (matchIdsList: number[], selectedType: string) => {
        setSelectedResult({
            type: selectedType,
            odds: ''
        });
        void fetchMatchList(matchIdsList);
    };

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

    return (
        <div
            className={style.cell}
            onClick={() => {
                openMatchListDrawer(item.matches, item.score);
            }}
        >
            <span
                className={`${style.score} ${!item.score ? style.nulls : ''} ${
                    highlight ? style.highlight : ''
                }`}
            >
                {item.score}
            </span>
            <span
                className={`${style.value} ${!item.matches.length ? style.nulls : ''} ${
                    highlight ? style.highlight : ''
                }`}
            >
                <span>{item.score ? item.matches.length : ''}</span>
            </span>
        </div>
    );
}

function Bodan() {
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const [score, setScore] = useState<ItemType[]>([]);
    const [highlightValues, setHighlightValues] = useState<number[]>([]);

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    useEffect(() => {
        const newScoreListMapping: ScoreMapping = {};

        const currentScore = analysisRecord?.correctScores || [];

        currentScore.forEach(item => {
            newScoreListMapping[item.score] = item.matches;
        });

        const valueCounts = currentScore.reduce<ValueCount>((accumulate, item) => {
            if (item.matches.length) {
                accumulate[item.matches.length] = (accumulate[item.matches.length] || 0) + 1;
            }
            return accumulate;
        }, {});

        const newHighLightValue: number[] = [];

        const sortedValues = Object.keys(valueCounts)
            .map(Number)
            .sort((a, b) => b - a);

        if (valueCounts[sortedValues[0]] >= 3) {
            newHighLightValue.push(sortedValues[0]);
        } else {
            newHighLightValue.push(sortedValues[0], sortedValues[1]);

            if (valueCounts[sortedValues[0]] + valueCounts[sortedValues[1]] < 3) {
                newHighLightValue.push(sortedValues[2]);
            }
        }

        setHighlightValues(newHighLightValue);
        setScore([
            { score: '1-0', matches: newScoreListMapping['1-0'] || [] },
            { score: '0-1', matches: newScoreListMapping['0-1'] || [] },
            { score: '0-0', matches: newScoreListMapping['0-0'] || [] },
            { score: '2-0', matches: newScoreListMapping['2-0'] || [] },
            { score: '0-2', matches: newScoreListMapping['0-2'] || [] },
            { score: '1-1', matches: newScoreListMapping['1-1'] || [] },
            { score: '2-1', matches: newScoreListMapping['2-1'] || [] },
            { score: '1-2', matches: newScoreListMapping['1-2'] || [] },
            { score: '2-2', matches: newScoreListMapping['2-2'] || [] },
            { score: '3-0', matches: newScoreListMapping['3-0'] || [] },
            { score: '0-3', matches: newScoreListMapping['0-3'] || [] },
            { score: '3-3', matches: newScoreListMapping['3-3'] || [] },
            { score: '3-1', matches: newScoreListMapping['3-1'] || [] },
            { score: '1-3', matches: newScoreListMapping['1-3'] || [] },
            { score: '4-4', matches: newScoreListMapping['4-4'] || [] },
            { score: '3-2', matches: newScoreListMapping['3-2'] || [] },
            { score: '2-3', matches: newScoreListMapping['2-3'] || [] },
            { score: '其他', matches: newScoreListMapping.else || [] },
            { score: '4-0', matches: newScoreListMapping['4-0'] || [] },
            { score: '0-4', matches: newScoreListMapping['0-4'] || [] },
            { score: '', matches: [] },
            { score: '4-1', matches: newScoreListMapping['4-1'] || [] },
            { score: '1-4', matches: newScoreListMapping['1-4'] || [] },
            { score: '', matches: [] },
            { score: '4-2', matches: newScoreListMapping['4-2'] || [] },
            { score: '2-4', matches: newScoreListMapping['2-4'] || [] },
            { score: '', matches: [] },
            { score: '4-3', matches: newScoreListMapping['4-3'] || [] },
            { score: '3-4', matches: newScoreListMapping['3-4'] || [] },
            { score: '', matches: [] }
        ]);
    }, [analysisRecord]);

    return (
        <div className={style.bodan}>
            <div className={style.title}>
                <div>全场波胆</div>
                <div>点击场数可直达赛事</div>
            </div>
            <div className={style.bodanScore}>
                {score.map((item, index) => (
                    <BodanItem
                        highlight={highlightValues.includes(item.matches.length)}
                        item={item}
                        key={`score_${index.toString()}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Bodan;

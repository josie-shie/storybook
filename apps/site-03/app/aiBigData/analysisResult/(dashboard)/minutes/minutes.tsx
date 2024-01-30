import { useEffect, useState } from 'react';
import style from './minutes.module.scss';
import { useMatchFilterStore } from '../../matchFilterStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useNotificationStore } from '@/store/notificationStore';
import { GoalsIn15MinsType, getFootballStatsMatches } from 'data-center';
import FifteenMinutesChart from './components/fifteenMinutesChart/fifteenMinutesChart';

function TimeRangeTable({
    label,
    upper,
    lower,
    openMatchListDrawer,
    currentIndex,
    maxIndexList
}: {
    label: string;
    upper: number[];
    lower: number[];
    openMatchListDrawer: (matchIdsList: number[], selectedType: string, odds: string) => void;
    currentIndex: number;
    maxIndexList: number[];
}) {
    return (
        <div
            className={`${style.tableContainer} ${
                maxIndexList.includes(currentIndex) ? style.highlightTable : ''
            }`}
        >
            <div className={style.header}>{label}</div>

            <div className={`${style.cell} ${style.over}`}>
                <span
                    onClick={() => {
                        openMatchListDrawer(upper, label, '大');
                    }}
                >
                    大<span className={style.total}>{upper.length}</span>
                </span>
            </div>
            <div className={`${style.cell} ${style.odd}`}>
                <span
                    onClick={() => {
                        openMatchListDrawer(lower, label, '小');
                    }}
                >
                    小 <span className={style.total}>{lower.length}</span>
                </span>
            </div>
        </div>
    );
}

function Minutes() {
    const headers = [
        '开场-14:59',
        '15:00-29:59',
        '30:00-半场',
        '下半场-59:59',
        '60:00-74:59',
        '75:00-全场'
    ];
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();
    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const setSelectedResult = useAnalyticsResultStore.use.setSelectedResult();
    const setMatchList = useAnalyticsResultStore.use.setContestList();
    const [list, setList] = useState<GoalsIn15MinsType[]>([]);
    const [maxOverValueIndex, setMaxOverValueIndex] = useState<number[]>([]);

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

    const openMatchListDrawer = (matchIdsList: number[], selectedType: string, odds: string) => {
        setSelectedResult({
            type: selectedType,
            odds
        });

        void fetchMatchList(matchIdsList);
    };

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    useEffect(() => {
        if (analysisRecord) {
            setList(analysisRecord.goalsIn15Mins || []);
            let maxIndexes: number[] = [];

            if (analysisRecord.goalsIn15Mins) {
                const maxLength = Math.max(
                    ...analysisRecord.goalsIn15Mins.map(item => item.goalsOver.length)
                );

                maxIndexes = analysisRecord.goalsIn15Mins
                    .map((item, index) => (item.goalsOver.length === maxLength ? index : -1))
                    .filter(index => index !== -1);
            }
            setMaxOverValueIndex(maxIndexes);
        }
    }, [analysisRecord]);

    return (
        <>
            <div className={style.minutes}>
                <FifteenMinutesChart
                    headers={headers}
                    minsGoalList={analysisRecord?.goalsIn15Mins || []}
                />
                <div className={style.contaniner}>
                    {list.map((item, index) => (
                        <TimeRangeTable
                            key={headers[index]}
                            label={headers[index]}
                            lower={item.goalsUnder}
                            openMatchListDrawer={openMatchListDrawer}
                            upper={item.goalsOver}
                            currentIndex={index}
                            maxIndexList={maxOverValueIndex}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Minutes;

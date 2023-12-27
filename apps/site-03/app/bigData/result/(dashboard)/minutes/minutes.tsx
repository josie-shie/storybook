'use client';
import { useEffect, useState } from 'react';
import type { GoalsIn15MinsType } from 'data-center';
import { getFootballStatsMatches } from 'data-center';
import { useNotificationStore } from '@/app/notificationStore';
import FifteenMinutesChart from '../../components/fifteenMinutesChart/fifteenMinutesChart';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useMatchFilterStore } from '../../matchFilterStore';
import style from './minutes.module.scss';

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
                        openMatchListDrawer(upper, label, '大');
                    }}
                >
                    大 {upper.length}
                </span>
            </div>
            <div className={`${style.cell} ${style.odd}`}>
                <span
                    onClick={() => {
                        openMatchListDrawer(lower, label, '小');
                    }}
                >
                    小 {lower.length}
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
        analysisRecord && setList(analysisRecord.goalsIn15Mins);
    }, [analysisRecord]);

    return (
        <>
            <div className={style.minutes}>
                <FifteenMinutesChart
                    headers={headers}
                    minsGoalList={analysisRecord?.goalsIn15Mins || []}
                />
                <div className={style.dot}>
                    <span className={style.big}>大</span>
                    <span className={style.small}>小</span>
                </div>
            </div>
            <div className={style.contaniner}>
                {list.map((item, index) => (
                    <TimeRangeTable
                        key={headers[index]}
                        label={headers[index]}
                        lower={item.goalsUnder}
                        openMatchListDrawer={openMatchListDrawer}
                        upper={item.goalsOver}
                    />
                ))}
            </div>
        </>
    );
}

export default Minutes;

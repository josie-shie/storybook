import { useEffect, useState } from 'react';
import style from './minutes.module.scss';
import { useMatchFilterStore } from '../../matchFilterStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useNotificationStore } from '@/store/notificationStore';
import { GoalsIn15MinsType, getFootballStatsMatches } from 'data-center';
import FifteenMinutesChart from './components/fifteenMinutesChart/fifteenMinutesChart';
import MinutesTable from './components/minutesTable/minutesTable';
import Range from './range';
import Footer from '../../components/footer/footer';

function MinutesContent({
    list,
    maxOverValueIndex
}: {
    list: GoalsIn15MinsType[];
    maxOverValueIndex: number[];
}) {
    const setSelectedResult = useAnalyticsResultStore.use.setSelectedResult();
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();
    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const setMatchList = useAnalyticsResultStore.use.setContestList();
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();
    const headers = [
        '开场-14:59',
        '15:00-29:59',
        '30:00-半场',
        '下半场-59:59',
        '60:00-74:59',
        '75:00-全场'
    ];

    const openMatchListDrawer = (matchIdsList: number[], selectedType: string, odds: string) => {
        setSelectedResult({
            type: selectedType,
            odds
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
        <>
            <FifteenMinutesChart
                headers={headers}
                minsGoalList={analysisRecord?.goalsIn15Mins || []}
            />
            <div className={style.contaniner}>
                {list.map((item, index) => (
                    <MinutesTable
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
        </>
    );
}

function Minutes() {
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const [list, setList] = useState<GoalsIn15MinsType[]>([]);
    const [maxOverValueIndex, setMaxOverValueIndex] = useState<number[]>([]);

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
                <MinutesContent list={list} maxOverValueIndex={maxOverValueIndex} />
                <Range />
                <Footer />
            </div>
        </>
    );
}

export default Minutes;

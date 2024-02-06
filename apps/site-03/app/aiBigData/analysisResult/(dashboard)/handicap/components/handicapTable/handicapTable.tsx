import { getFootballStatsMatches } from 'data-center';
import style from './handicapTable.module.scss';
import { useNotificationStore } from '@/store/notificationStore';
import { useAnalyticsResultStore } from '@/app/aiBigData/analysisResult/analysisResultStore';
import { useMatchFilterStore } from '@/app/aiBigData/analysisResult/matchFilterStore';

interface TableDataType {
    topValue?: number[];
    middleValue?: number[];
    bottomValue: number[];
    topLabel?: string;
    middleLabel?: string;
    bottomLabel: string;
}

function HandicapTable({ tableData }: { tableData: TableDataType[] }) {
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();
    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const setSelectedResult = useAnalyticsResultStore.use.setSelectedResult();
    const setMatchList = useAnalyticsResultStore.use.setContestList();
    const setContestList = useMatchFilterStore.use.setContestList();
    const setContestInfo = useMatchFilterStore.use.setContestInfo();

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

    const openMatchListDrawer = (matchList: number[], selectedType: string, odds: string) => {
        setSelectedResult({
            type: selectedType,
            odds
        });

        void fetchMatchList(matchList);
    };

    return (
        <div className={style.handicapTable}>
            <div className={style.table}>
                <div className={style.tableBody}>
                    <div className={style.row}>
                        {tableData.map((cell, index) => (
                            <div key={`handicapTable_${index.toString()}`} className={style.tr}>
                                {cell.topValue ? (
                                    <div className={style.td}>
                                        <div
                                            onClick={() => {
                                                openMatchListDrawer(
                                                    cell.topValue || [],
                                                    '全场让分',
                                                    cell.topLabel || ''
                                                );
                                            }}
                                        >
                                            <span className={style.label}>{cell.topLabel}</span>
                                            <span className={style.matchLength}>
                                                {cell.topValue.length}
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                                {cell.middleValue ? (
                                    <div className={style.td}>
                                        <div
                                            onClick={() => {
                                                openMatchListDrawer(
                                                    cell.middleValue || [],
                                                    '全场大小',
                                                    cell.middleLabel || ''
                                                );
                                            }}
                                        >
                                            <span className={style.label}>{cell.middleLabel}</span>
                                            <span className={style.matchLength}>
                                                {cell.middleValue.length}
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <div className={style.row}>
                        {tableData.map((cell, index) => (
                            <div key={`handicapTable_${index.toString()}`} className={style.tr}>
                                {cell.bottomValue ? (
                                    <div className={`${style.td} ${style.bottomTd}`}>
                                        <div
                                            onClick={() => {
                                                openMatchListDrawer(
                                                    cell.bottomValue,
                                                    '全场独赢',
                                                    cell.bottomLabel
                                                );
                                            }}
                                        >
                                            <span className={style.label}>{cell.bottomLabel}</span>
                                            <span className={style.matchLength}>
                                                {cell.bottomValue.length}
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HandicapTable;

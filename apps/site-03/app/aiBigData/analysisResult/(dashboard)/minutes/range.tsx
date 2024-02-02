import { useEffect, useState } from 'react';
import GoalRangeChart from './components/goalRangeChart/goalRangeChart';
import style from './range.module.scss';
import { useMatchFilterStore } from '../../matchFilterStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useNotificationStore } from '@/store/notificationStore';
import { getFootballStatsMatches } from 'data-center';

interface HeaderType {
    legend: string;
    label: string;
    value: number[];
    color: string;
}

function TableCell({
    cellValue,
    selectedType,
    openMatchListDrawer,
    cellIndex,
    maxIndex
}: {
    cellValue: number[];
    selectedType: string;
    openMatchListDrawer: (matchIdsList: number[], selectedType: string) => void;
    cellIndex: number;
    maxIndex: number;
}) {
    return (
        <div className={`${style.cell} ${cellIndex === maxIndex ? style.hightlightCell : ''}`}>
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
    const setShowContestDrawer = useAnalyticsResultStore.use.setShowContestDrawer();
    const setSelectedResult = useAnalyticsResultStore.use.setSelectedResult();
    const setMatchList = useAnalyticsResultStore.use.setContestList();
    const setIsNotificationVisible = useNotificationStore.use.setIsVisible();
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const [headers, setHeaders] = useState<HeaderType[]>([]);
    const [maxIndex, setMaxIndex] = useState(0);

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
        const zeroToOne = analysisRecord?.goalsInterval0To1 || [];
        const twoToThree = analysisRecord?.goalsInterval2To3 || [];
        const fourToSix = analysisRecord?.goalsInterval4To6 || [];
        const sevenPlus = analysisRecord?.goalsInterval7Plus || [];
        const total = zeroToOne.length + twoToThree.length + fourToSix.length + sevenPlus.length;

        const getPercentage = (val: number) => {
            return Math.floor((val / total) * 100);
        };

        const colorList = ['#9FC2FF', '#4489FF', '#276CE1'];
        const highlightColor = '#FF4343';

        const items = [
            {
                label: '0-1球',
                legend: '0-1',
                value: zeroToOne
            },
            {
                label: '2-3球',
                legend: '2-3',
                value: twoToThree
            },
            {
                label: '4-6球',
                legend: '4-6',
                value: fourToSix
            },
            {
                label: '7球以上',
                legend: '7以上',
                value: sevenPlus
            }
        ];

        // 最大值要hightlight
        const maxIndexInList = items.reduce(
            (maxIdx, current, idx, array) =>
                current.value.length > array[maxIdx].value.length ? idx : maxIdx,
            0
        );

        const updatedHeaders = items.map((item, index) => ({
            ...item,
            label: `${item.label}${getPercentage(item.value.length)}%`,
            // 为最大值设置高亮颜色，其他按顺序使用 colorList
            color: index === maxIndexInList ? highlightColor : colorList[index % colorList.length]
        }));

        setMaxIndex(maxIndexInList);
        setHeaders(updatedHeaders);
    }, [analysisRecord]);

    return (
        <>
            <div className={style.range}>
                <GoalRangeChart chartList={headers} maxIndex={maxIndex} />
                <div className={style.legend}>
                    {headers.map(header => (
                        <span style={{ color: header.color }} key={header.legend}>
                            <div className={style.dot} style={{ backgroundColor: header.color }} />
                            {header.legend}
                        </span>
                    ))}
                </div>
            </div>
            <div className={style.tableContainer}>
                {headers.map((header, index) => (
                    <div
                        className={`${style.header} ${
                            index === maxIndex ? style.highlightHeader : ''
                        }`}
                        key={header.legend}
                    >
                        {header.legend}
                    </div>
                ))}
                {headers.map((header, index) => (
                    <TableCell
                        cellValue={header.value}
                        key={header.label}
                        openMatchListDrawer={openMatchListDrawer}
                        selectedType={header.label}
                        cellIndex={index}
                        maxIndex={maxIndex}
                    />
                ))}
            </div>
        </>
    );
}

export default Range;

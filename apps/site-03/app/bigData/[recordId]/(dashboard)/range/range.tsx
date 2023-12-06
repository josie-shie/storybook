'use client';
import { useState } from 'react';
import GoalRangeChart from '../../components/goalRangeChart/goalRangeChart';
import ContestDrawerList from '../components/contestDrawerList';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import style from './range.module.scss';

function TableCell({
    cellValue,
    setShowList
}: {
    cellValue: number[];
    setShowList: (isShow: boolean) => void;
}) {
    const setQueryMatchList = useAnalyticsResultStore.use.setQueryMatchList();

    const openMatchListDrawer = (matchIdsList: number[]) => {
        setQueryMatchList(matchIdsList);
        setShowList(true);
    };

    return (
        <div className={`${style.cell}`}>
            <span
                onClick={() => {
                    openMatchListDrawer(cellValue);
                }}
            >
                {cellValue.length}
            </span>
        </div>
    );
}

function Range() {
    const [showList, setShowList] = useState(false);
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const headers = [
        {
            class: style.first,
            label: '0-1',
            value: analysisRecord.goalRange.goalRange0To1.length,
            color: '#6357F0'
        },
        {
            class: style.second,
            label: '2-3',
            value: analysisRecord.goalRange.goalRange2To3.length,
            color: '#33AD1F'
        },
        {
            class: style.three,
            label: '4-6',
            value: analysisRecord.goalRange.goalRange4To6.length,
            color: '#4489FF'
        },
        {
            class: style.four,
            label: '7以上',
            value: analysisRecord.goalRange.goalRange7Upper.length,
            color: '#FBB03B'
        }
    ];

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
                <TableCell
                    cellValue={analysisRecord.goalRange.goalRange0To1}
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.goalRange.goalRange2To3}
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.goalRange.goalRange4To6}
                    setShowList={setShowList}
                />
                <TableCell
                    cellValue={analysisRecord.goalRange.goalRange7Upper}
                    setShowList={setShowList}
                />
            </div>
            <ContestDrawerList
                isOpen={showList}
                onClose={() => {
                    setShowList(false);
                }}
                onOpen={() => {
                    setShowList(true);
                }}
                title="進球數區間/4-6"
            />
        </>
    );
}

export default Range;

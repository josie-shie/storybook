'use client';
import { useState } from 'react';
import FifteenMinutesChart from '../../components/fifteenMinutesChart/fifteenMinutesChart';
import ContestDrawerList from '../components/contestDrawerList';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import style from './minutes.module.scss';

function TimeRangeTable({
    label,
    upper,
    lower,
    setShowList
}: {
    label: string;
    upper: number;
    lower: number;
    setShowList: (isShow: boolean) => void;
}) {
    return (
        <div className={style.tableContainer}>
            <div className={style.header}>{label}</div>

            <div className={style.cell}>
                <span
                    onClick={() => {
                        setShowList(true);
                    }}
                >
                    上 {upper}
                </span>
            </div>
            <div className={`${style.cell} ${style.odd}`}>
                <span
                    onClick={() => {
                        setShowList(true);
                    }}
                >
                    下 {lower}
                </span>
            </div>
        </div>
    );
}

function Minutes() {
    const headers = [
        '開場-14:59',
        '15:00-29:59',
        '30:00-半場',
        '下半場-59:59',
        '60:00-74:59',
        '75:00-全場'
    ];
    const [showList, setShowList] = useState(false);
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();

    return (
        <>
            <div className={style.minutes}>
                <FifteenMinutesChart headers={headers} minsGoalList={analysisRecord.minutesGoal} />
                <div className={style.dot}>
                    <span className={style.big}>大</span>
                    <span className={style.small}>小</span>
                </div>
            </div>
            <div className={style.contaniner}>
                {headers.map((time, index) => (
                    <TimeRangeTable
                        key={time}
                        label={time}
                        lower={analysisRecord.minutesGoal[index].goalLower.length}
                        setShowList={setShowList}
                        upper={analysisRecord.minutesGoal[index].goalUpper.length}
                    />
                ))}
            </div>

            <ContestDrawerList
                isOpen={showList}
                onClose={() => {
                    setShowList(false);
                }}
                onOpen={() => {
                    setShowList(true);
                }}
                title="15分鐘進球/75:00-全場/大"
            />
        </>
    );
}

export default Minutes;

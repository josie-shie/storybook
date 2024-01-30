'use client';
import { useEffect, useState } from 'react';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import { useMatchFilterStore } from '../../matchFilterStore';
import style from './handicap.module.scss';
import BarChart from './components/barChart/barChart';
import '@/app/football/[matchId]/dataTable.scss';
import HandicapTable from './components/handicapTable/handicapTable';

interface TableDataType {
    topValue?: number[];
    middleValue?: number[];
    bottomValue: number[];
    topLabel?: string;
    middleLabel?: string;
    bottomLabel: string;
}

function Handicap() {
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();
    const handicapEchart = useAnalyticsResultStore.use.handicapEchart();

    const [tableData, setTableData] = useState<TableDataType[]>([]);

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    useEffect(() => {
        const newTableData = [
            {
                topValue: analysisRecord?.fullHandicapUpper || [],
                middleValue: analysisRecord?.fullOverUnderOver || [],
                bottomValue: analysisRecord?.fullTimeHomeWin || [],
                topLabel: '上',
                middleLabel: '大',
                bottomLabel: '主'
            },
            {
                topValue: analysisRecord?.fullHandicapLower || [],
                middleValue: analysisRecord?.fullOverUnderUnder || [],
                bottomValue: analysisRecord?.fullTimeAwayWin || [],
                topLabel: '下',
                middleLabel: '小',
                bottomLabel: '客'
            },
            {
                bottomValue: analysisRecord?.fullTimeDraw || [],
                bottomLabel: '和'
            }
        ];
        setTableData(newTableData);
    }, [
        analysisRecord?.fullHandicapLower,
        analysisRecord?.fullHandicapUpper,
        analysisRecord?.fullOverUnderOver,
        analysisRecord?.fullOverUnderUnder,
        analysisRecord?.fullTimeAwayWin,
        analysisRecord?.fullTimeDraw,
        analysisRecord?.fullTimeHomeWin,
        handicapEchart
    ]);

    return (
        <div className={style.handicap}>
            <BarChart chartData={handicapEchart.full.day} />
            <HandicapTable tableData={tableData} />
        </div>
    );
}

export default Handicap;

import { useCallback, useEffect, useState } from 'react';
import { getPredicativeAnalysisMatch } from 'data-center';
import type { GetPredicativeAnalysisMatch } from 'data-center';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import BaseDatePicker from '@/app/(list)/components/baseDatePicker/baseDatePicker';
import NoData from '@/components/baseNoData/noData';
import style from './aiHistory.module.scss';
import HistoryCard from './components/historyCard/historyCard';
import { useAiPredictStore } from './aiPredictStore';

function HistoryItem({ item }: { item: GetPredicativeAnalysisMatch }) {
    return (
        <Link className={style.historyRow} href={`/aiPredict/historyDetail/${item.matchId}`}>
            <HistoryCard item={item} />
        </Link>
    );
}

function AiHistory() {
    const [isLoading, setIsLoading] = useState(false);
    const aiHistoryList = useAiPredictStore.use.aiHistoryList();
    const setAiHistoryList = useAiPredictStore.use.setAiHistoryList();
    const [resultsDate, setResultsDate] = useState(Date.now());
    const handleDate = (date: Date) => {
        const dateFormat = date.getTime();
        setResultsDate(dateFormat);
    };

    const getPredicativeAnalysisList = useCallback(async () => {
        const res = await getPredicativeAnalysisMatch({
            matchId: 0,
            matchTime: 1709474400,
            // matchTime: resultsDate,
            isFinished: true
        });

        if (!res.success) {
            return new Error();
        }
        setAiHistoryList(res.data);

        setIsLoading(false);
    }, [resultsDate]);

    useEffect(() => {
        void getPredicativeAnalysisList();
    }, [getPredicativeAnalysisList]);

    if (isLoading)
        return (
            <div className={style.loadingBlock}>
                <CircularProgress size={24} />
            </div>
        );
    return (
        <>
            <BaseDatePicker
                defaultDate={new Date(Number(resultsDate))}
                direction="result"
                onDateChange={date => {
                    handleDate(date);
                }}
            />
            <div className={style.content}>
                {aiHistoryList.length === 0 ? (
                    <NoData text="暂无资料" />
                ) : (
                    aiHistoryList.map((item: GetPredicativeAnalysisMatch) => (
                        <HistoryItem item={item} key={item.matchId} />
                    ))
                )}
            </div>
        </>
    );
}

export default AiHistory;

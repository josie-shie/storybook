import { useCallback, useEffect, useState } from 'react';
import { getPredicativeAnalysisMatch } from 'data-center';
import type { GetPredicativeAnalysisMatch } from 'data-center';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import BaseDatePicker from '@/app/(list)/components/baseDatePicker/baseDatePicker';
import NoData from '@/components/baseNoData/noData';
import HistoryCard from '../components/historyCard/historyCard';
import { useAiPredictStore } from '../aiPredictStore';
import style from './aiHistory.module.scss';

function HistoryItem({ item }: { item: GetPredicativeAnalysisMatch }) {
    return (
        <Link className={style.historyRow} href={`/aiPredict/historyDetail/${item.matchId}`}>
            <HistoryCard item={item} />
        </Link>
    );
}

function ListContent() {
    const aiHistoryList = useAiPredictStore.use.aiHistoryList();

    return (
        <div className={style.content}>
            {aiHistoryList.length === 0 ? (
                <NoData text="暂无资料" />
            ) : (
                aiHistoryList.map((item: GetPredicativeAnalysisMatch) => (
                    <HistoryItem item={item} key={item.matchId} />
                ))
            )}
        </div>
    );
}

function AiHistory() {
    const [isLoading, setIsLoading] = useState(false);
    const setAiHistoryList = useAiPredictStore.use.setAiHistoryList();
    const [resultsDate, setResultsDate] = useState(Date.now());
    const handleDate = (date: Date) => {
        const dateFormat = date.getTime();
        setResultsDate(dateFormat);
    };

    const getPredicativeAnalysisList = useCallback(async () => {
        setIsLoading(true);
        const res = await getPredicativeAnalysisMatch({
            matchId: 0,
            matchTime: Math.floor(Number(resultsDate) / 1000),
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

    return (
        <>
            <BaseDatePicker
                defaultDate={new Date(Number(resultsDate))}
                direction="result"
                onDateChange={date => {
                    handleDate(date);
                }}
            />
            {isLoading ? (
                <div className={style.loadingBlock}>
                    <CircularProgress size={24} />
                </div>
            ) : (
                <ListContent />
            )}
        </>
    );
}

export default AiHistory;

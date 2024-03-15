import { useEffect, useState } from 'react';
import { getPredicativeAnalysisMatch } from 'data-center';
import type { GetPredicativeAnalysisMatch } from 'data-center';
import { CircularProgress } from '@mui/material';
import { timestampToString } from 'lib';
import Image from 'next/image';
import BaseDatePicker from '@/app/(list)/components/baseDatePicker/baseDatePicker';
import NoData from '@/components/baseNoData/noData';
import defaultTeamLogo from '@/app/football/[matchId]/img/defaultTeamLogo.png';
import style from './aiHistory.module.scss';
import Draw from './img/aiDraw.svg';
import Hit from './img/aiHit.svg';
import Miss from './img/aiMiss.svg';

function TeamDisplay({ name, logo, value }: { name: string; logo: string; value: number }) {
    return (
        <div className={style.team}>
            <div className={style.teamName}>
                <Image
                    alt=""
                    height={20}
                    src={logo === '0' ? defaultTeamLogo.src : logo}
                    width={20}
                />
                {name}
            </div>
            <span>{value}</span>
        </div>
    );
}

function HistoryItem({ item }: { item: GetPredicativeAnalysisMatch }) {
    const compareResult = (predictMatchResult: number, realMatchResult: number) => {
        if (!realMatchResult) return;
        if (predictMatchResult === 0) {
            if (realMatchResult === 3) return IconMap.WIN;
            if ([1, 2].includes(realMatchResult)) return IconMap.LOSE;
        }
        if (predictMatchResult === 1) {
            if (realMatchResult === 1) return IconMap.WIN; // Hit
            if (realMatchResult === 2) return IconMap.LOSE; // Miss
            if (realMatchResult === 3) return IconMap.DRAW; // Draw
        } else if (predictMatchResult === 2) {
            if (realMatchResult === 1) return IconMap.LOSE; // Miss
            if (realMatchResult === 2) return IconMap.WIN; // Hit
            if (realMatchResult === 3) return IconMap.DRAW; // Draw
        }
    };
    const IconMap = {
        WIN: <Hit />,
        DRAW: <Draw />,
        LOSE: <Miss />
    };
    return (
        <div className={style.historyRow}>
            <div className={style.top}>
                <div>
                    <span className={style.league} style={{ color: `${item.color}` }}>
                        {item.leagueChs}
                    </span>
                    <span> {timestampToString(item.matchTime)}</span>
                </div>
                <span> 160人解鎖</span>
            </div>
            <div className={style.bottom}>
                <div className={style.teamBox}>
                    {TeamDisplay({ name: item.homeChs, logo: item.homeLogo, value: 2 })}
                    {TeamDisplay({ name: item.awayChs, logo: item.awayLogo, value: 2 })}
                </div>
                <div className={style.icon}>
                    {compareResult(item.predictMatchResult, item.realMatchResult)}
                </div>
            </div>
        </div>
    );
}

function AiHistory() {
    const [isLoading, setIsLoading] = useState(false);
    const [aiHistoryList, setAiHistoryList] = useState<GetPredicativeAnalysisMatch[]>([]);
    const [resultsDate, setResultsDate] = useState(Date.now());
    const handleDate = (date: Date) => {
        const dateFormat = date.getTime();
        setResultsDate(dateFormat);
        setIsLoading(true);
    };

    useEffect(() => {
        const getPredicativeAnalysisList = async () => {
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
        };
        void getPredicativeAnalysisList();
    }, []);

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

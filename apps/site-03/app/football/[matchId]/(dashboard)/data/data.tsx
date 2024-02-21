'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type {
    GetRecentMatchResponse,
    GetRecentMatchScheduleResponse,
    GetHalfFullWinCountsResponse
} from 'data-center';
import { slickOption } from 'ui';
import { createDataStore } from '../../dataStore';
import style from './data.module.scss';
import TeamMatchHistoryDetail from './teamMatchHistory/teamMatchHistoryDetail';
import MatchSchedule from './matchSchedule/matchSchedule';
import HalfFullWinLose from './halfFullWinLose/halfFullWinLose';

function DetailsContainer() {
    return (
        <div className={style.detailsContainer}>
            <TeamMatchHistoryDetail />
            <MatchSchedule />
            <HalfFullWinLose />
        </div>
    );
}

function DataContainer() {
    const tabActive = {
        backgroundColor: '#4489FF',
        color: '#fff'
    };
    const tabDefault = {
        backgroundColor: '#f8f8f8',
        color: '#8d8d8d'
    };

    const tabList = [
        { title: '详情', value: 'details' },
        { title: '对比', value: 'compared' }
    ];
    const selectedMap = {
        details: <DetailsContainer />,
        compared: <p>对比</p>
    };

    const [selectedOption, setSelectedOption] = useState('details');

    const handleResetHeight = () => {
        slickOption.contestInfoResetHeight();
    };

    return (
        <div className={style.data}>
            <div className="minTabBar">
                {tabList.map(tab => (
                    <motion.div
                        animate={selectedOption === tab.value ? tabActive : tabDefault}
                        className="tab"
                        key={tab.value}
                        onAnimationComplete={() => {
                            handleResetHeight();
                        }}
                        onClick={() => {
                            setSelectedOption(tab.value);
                        }}
                    >
                        {tab.title}
                    </motion.div>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className={style.content}
                    exit={{ opacity: 0, y: -4 }}
                    initial={{ opacity: 0, y: 4 }}
                    key={selectedOption}
                    transition={{ duration: 0.16 }}
                >
                    {selectedMap[selectedOption]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function Data({
    recentMatchData,
    recentMatchSchedule,
    halfFullWinCounts
}: {
    recentMatchData: GetRecentMatchResponse;
    recentMatchSchedule: GetRecentMatchScheduleResponse;
    halfFullWinCounts: GetHalfFullWinCountsResponse;
}) {
    createDataStore({
        recentMatchData,
        recentMatchSchedule,
        halfFullWinCounts: halfFullWinCounts.data,
        halfFullWinTotal: halfFullWinCounts.total
    });
    return <DataContainer />;
}

export default Data;

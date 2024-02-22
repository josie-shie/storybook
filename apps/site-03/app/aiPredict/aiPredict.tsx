'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GetAiAnalyzeMatchResponse } from 'data-center';
import { timestampToString } from 'lib';
import { useAiPredictStore } from './aiPredictStore';
import style from './aiPredict.module.scss';
import AiAvatar from './img/aiAvatar.svg';
import AiAvatarSmall from './img/aiAvatarSmall.svg';
import Ai from './ai';
import Analyze from './analyze';
import Cornor from './cornor';

interface MatchTab {
    matchId: number;
    value: string;
}

function TypingText({ home, away }: { home: string; away: string }) {
    const [text, setText] = useState('');

    useEffect(() => {
        let currentText = '';
        const message = `以下是我分析即将进行的2024年1月23日亚洲杯足球赛中 ${home} 对 ${away} 的比赛。`;
        const type = () => {
            if (currentText.length < message.length) {
                currentText = message.substring(0, currentText.length + 1);
                setText(currentText);
                setTimeout(type, 50);
            }
        };

        type();
    }, [home, away]);
    return (
        <>
            {text}
            <span className={style.typing} />
        </>
    );
}

function MatchItem({
    match,
    handleSelectMatch
}: {
    match: GetAiAnalyzeMatchResponse;
    handleSelectMatch: (match: GetAiAnalyzeMatchResponse) => void;
}) {
    return (
        <div
            className={style.item}
            key={match.matchId}
            onClick={() => {
                handleSelectMatch(match);
            }}
        >
            <div className={style.league}>
                <span className={style.name}>{match.leagueChs}</span>
                <span className={style.time}>
                    {timestampToString(match.matchTime, 'MM-DD HH:mm')}
                </span>
            </div>
            <div className={style.team}>
                <span className={style.name}>{match.homeChs}</span>
                <span className={style.name}>VS {match.awayChs}</span>
            </div>
        </div>
    );
}

function AiPredict() {
    const contestListRef = useRef<HTMLDivElement | null>(null);
    const analyzeRef = useRef<HTMLDivElement | null>(null);

    const aiPredictList = useAiPredictStore.use.aiPredictList();

    const [isScrolledToRight, setIsScrolledToRight] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [selectedMatches, setSelectedMatches] = useState<GetAiAnalyzeMatchResponse[]>([]);
    const [matchTabs, setMatchTabs] = useState<MatchTab[]>([]);

    const handleSelectMatch = (match: GetAiAnalyzeMatchResponse) => {
        setSelectedMatches(prevSelectedMatches => [...prevSelectedMatches, match]);
        queueMicrotask(() => {
            analyzeRef.current?.scrollIntoView({ behavior: 'smooth' });
        });
    };

    const handleSetTabKey = (matchId: number, value: string) => {
        setMatchTabs(prev => {
            const index = prev.findIndex(tab => tab.matchId === matchId);
            if (index >= 0) {
                const newTabs = [...prev];
                newTabs[index] = { matchId, value };
                return newTabs;
            }
            return [...prev, { matchId, value }];
        });
    };

    const getMatchTabKey = (matchId: number) => {
        const matchTab = matchTabs.find(tab => tab.matchId === matchId);
        return matchTab ? matchTab.value : tabList[0].value;
    };

    useEffect(() => {
        const checkIfScrolledToRight = () => {
            if (contestListRef.current) {
                const { scrollWidth, clientWidth, scrollLeft } = contestListRef.current;
                const isRight = scrollWidth - Math.round(scrollLeft) === clientWidth;
                setIsScrolledToRight(isRight);
            }
        };

        contestListRef.current?.addEventListener('scroll', checkIfScrolledToRight);

        return () => {
            contestListRef.current?.removeEventListener('scroll', checkIfScrolledToRight);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChat(true);
        }, 2500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const halfLength = Math.ceil(aiPredictList.length / 2);
    const firstHalfMatches = aiPredictList.slice(0, halfLength);
    const secondHalfMatches = aiPredictList.slice(halfLength);

    const tabActive = {
        backgroundColor: '#4489FF',
        color: '#fff'
    };
    const tabDefault = {
        backgroundColor: '#f8f8f8',
        color: '#8d8d8d'
    };

    const tabList = [
        { title: 'AI 预测', value: 'ai' },
        { title: '战略分析', value: 'analyze' },
        { title: '战术角度', value: 'cornor' }
    ];

    const getSelectedComponent = (key: string, match: GetAiAnalyzeMatchResponse) => {
        const components: Record<string, JSX.Element> = {
            ai: <Ai match={match} />,
            analyze: <Analyze match={match} />,
            cornor: <Cornor match={match} />
        };
        return components[key];
    };

    return (
        <div className={style.aiPredict}>
            <div className={style.title}>FutureAI 2.0</div>
            <div className={style.content}>
                <div className={style.welcome}>
                    <AiAvatar />
                    <div className={style.text}>您好，为您推荐以下赛事预测分析：</div>
                </div>
                <div className={`${style.chat} ${showChat ? style.fadeIn : style.hidden}`}>
                    <div className={style.title}>精选赛事</div>
                    <div
                        className={`${style.wrapper} ${
                            isScrolledToRight ? style.scrolledToRight : ''
                        }`}
                    >
                        <div className={style.contestList} ref={contestListRef}>
                            <div className={style.row}>
                                {firstHalfMatches.map(match => (
                                    <MatchItem
                                        handleSelectMatch={handleSelectMatch}
                                        key={match.matchId}
                                        match={match}
                                    />
                                ))}
                            </div>
                            <div className={style.row}>
                                {secondHalfMatches.map(match => (
                                    <MatchItem
                                        handleSelectMatch={handleSelectMatch}
                                        key={match.matchId}
                                        match={match}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {selectedMatches.map(match => {
                    const currentTabKey = getMatchTabKey(match.matchId);
                    return (
                        <div className={style.analyze} key={match.matchId} ref={analyzeRef}>
                            <div className={style.teamTitle}>
                                <div className={style.time}>
                                    {timestampToString(match.matchTime, 'MM-DD HH:mm')}
                                </div>
                                <div className={style.name}>
                                    {match.homeChs} vs {match.awayChs}
                                </div>
                            </div>

                            <div className={style.message}>
                                <AiAvatarSmall className={style.icon} />
                                <div className={style.text}>
                                    <TypingText away={match.awayChs} home={match.homeChs} />
                                </div>
                            </div>

                            <div className={style.information}>
                                <div className={style.minTabBar}>
                                    {tabList.map(tab => (
                                        <motion.div
                                            animate={
                                                currentTabKey === tab.value ? tabActive : tabDefault
                                            }
                                            className={style.tab}
                                            key={tab.value}
                                            onClick={() => {
                                                handleSetTabKey(match.matchId, tab.value);
                                            }}
                                        >
                                            {tab.title}
                                        </motion.div>
                                    ))}
                                </div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        initial={{ opacity: 0, y: 4 }}
                                        key={currentTabKey}
                                        transition={{ duration: 0.16 }}
                                    >
                                        {getSelectedComponent(currentTabKey, match)}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AiPredict;

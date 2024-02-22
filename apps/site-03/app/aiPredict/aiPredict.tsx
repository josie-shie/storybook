'use client';
import { useEffect, useRef, useState, createRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { GetAiAnalyzeMatchResponse } from 'data-center';
import { timestampToString, timestampToStringCh } from 'lib';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import NormalDialog from '@/components/normalDialog/normalDialog';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import { useAiPredictStore } from './aiPredictStore';
import style from './aiPredict.module.scss';
import AiAvatar from './img/aiAvatar.svg';
import AiAvatarSmall from './img/aiAvatarSmall.svg';
import Ai from './ai';
import Analyze from './analyze';
import Cornor from './cornor';
import Wallet from './img/wallet.png';

interface MatchTab {
    matchId: number;
    value: string;
}

function TypingText({ matchTime, home, away }: { matchTime: number; home: string; away: string }) {
    const [text, setText] = useState('');
    useEffect(() => {
        let currentText = '';
        const message = `以下是我分析即将进行的${timestampToStringCh(
            matchTime,
            'YYYY年MM月DD日'
        )}亚洲杯足球赛中 ${home} 对 ${away} 的比赛。`;
        const type = () => {
            if (currentText.length < message.length) {
                currentText = message.substring(0, currentText.length + 1);
                setText(currentText);
                setTimeout(type, 50);
            }
        };

        type();
    }, [matchTime, home, away]);
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
    const matchRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({});

    const router = useRouter();

    const aiPredictList = useAiPredictStore.use.aiPredictList();
    const setPayLock = useAiPredictStore.use.setPayLock();

    const [openPaid, setOpenPaid] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();

    const [showChat, setShowChat] = useState(false);
    const [selectedMatches, setSelectedMatches] = useState<GetAiAnalyzeMatchResponse[]>([]);
    const [matchTabs, setMatchTabs] = useState<MatchTab[]>([]);

    const handleSelectMatch = (match: GetAiAnalyzeMatchResponse) => {
        setSelectedMatches(prevSelectedMatches => {
            const isMatchExists = prevSelectedMatches.some(
                existingMatch => existingMatch.matchId === match.matchId
            );

            if (!isMatchExists) {
                return [...prevSelectedMatches, match];
            }
            const matchRef = matchRefs.current[match.matchId];
            matchRef.current?.scrollIntoView({ behavior: 'smooth' });
            return prevSelectedMatches;
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
        const timer = setTimeout(() => {
            setShowChat(true);
        }, 2500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (selectedMatches.length > 0) {
            const latestMatch = selectedMatches[selectedMatches.length - 1];
            const matchRef = matchRefs.current[latestMatch.matchId];
            matchRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedMatches]);

    const handleUnlockArticle = (matchId: number) => {
        if (!isLogin) {
            setAuthQuery('login');
            setIsDrawerOpen(true);
            return;
        }
        setOpenPaid(true);
    };

    const onSubmit = () => {
        if (userInfo.balance < 80) {
            setOpenPaid(false);
            setOpenDialog(true);
            return;
        }
        setOpenPaid(false);
        setPayLock(false);
    };

    const goSubscribe = () => {
        setOpenDialog(false);
        router.push('/userInfo/subscribe');
    };

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
            ai: (
                <Ai
                    match={match}
                    onUnlockArticle={() => {
                        handleUnlockArticle(match.matchId);
                    }}
                />
            ),
            analyze: (
                <Analyze
                    match={match}
                    onUnlockArticle={() => {
                        handleUnlockArticle(match.matchId);
                    }}
                />
            ),
            cornor: (
                <Cornor
                    match={match}
                    onUnlockArticle={() => {
                        handleUnlockArticle(match.matchId);
                    }}
                />
            )
        };
        return components[key];
    };

    return (
        <>
            <div className={style.aiPredict}>
                <div className={style.title}>FutureAI 2.0</div>
                <div className={style.content}>
                    <div className={style.welcome}>
                        <AiAvatar />
                        <div className={style.text}>您好，为您推荐以下赛事预测分析：</div>
                    </div>
                    <div className={`${style.chat} ${showChat ? style.fadeIn : style.hidden}`}>
                        <div className={style.title}>精选赛事</div>
                        <div className={style.wrapper}>
                            <div className={style.contestList}>
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
                        matchRefs.current[match.matchId] = createRef<HTMLDivElement>();
                        return (
                            <div
                                className={style.analyze}
                                key={match.matchId}
                                ref={matchRefs.current[match.matchId]}
                            >
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
                                        <TypingText
                                            away={match.awayChs}
                                            home={match.homeChs}
                                            matchTime={match.matchTime}
                                        />
                                    </div>
                                </div>

                                <div className={style.information}>
                                    <div className={style.minTabBar}>
                                        {tabList.map(tab => (
                                            <motion.div
                                                animate={
                                                    currentTabKey === tab.value
                                                        ? tabActive
                                                        : tabDefault
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
                                            key={currentTabKey}
                                            transition={{ duration: 0.1 }}
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
            <ConfirmPayDrawer
                isOpen={openPaid}
                onClose={() => {
                    setOpenPaid(false);
                }}
                onOpen={() => {
                    setOpenPaid(true);
                }}
                onPay={onSubmit}
                price={80}
            />
            <NormalDialog
                confirmText="去充值"
                content={<div>余额不足，请充值</div>}
                onClose={() => {
                    setOpenDialog(false);
                }}
                onConfirm={goSubscribe}
                openDialog={openDialog}
                srcImage={Wallet}
            />
        </>
    );
}

export default AiPredict;

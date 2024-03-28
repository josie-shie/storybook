'use client';
import { useEffect, useRef, useState, createRef } from 'react';
// import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getPredicativeAnalysisMatch } from 'data-center';
import type { GetPredicativeAnalysisMatch } from 'data-center';
import { timestampToString, timestampToStringCh } from 'lib';
// import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
// import NormalDialog from '@/components/normalDialog/normalDialog';
// import { useUserStore } from '@/store/userStore';
// import { useAuthStore } from '@/store/authStore';
import TeamLogo from '@/components/teamLogo/teamLogo';
import { useAiPredictStore } from '../aiPredictStore';
import Ai from '../components/analyzeContent/ai';
import Analyze from '../components/analyzeContent/analyze';
import Cornor from '../components/analyzeContent/cornor';
// import Wallet from '../img/wallet.png';
import Win from '../(list)/img/aiHit.svg';
import Draw from '../(list)/img/aiDraw.svg';
import AiAvatarSmall from '../(list)/img/aiAvatarSmall.svg';
import AiAvatar from '../(list)/img/aiAvatar.svg';
import style from '../(list)/aiPredict.module.scss';
import Tutorial from '../components/turorial/turorial';

interface MatchTab {
    matchId: number;
    value: string;
}

function TypingText({
    matchTime,
    home,
    away,
    league,
    onTypingDone
}: {
    matchTime: number;
    home: string;
    away: string;
    league: string;
    onTypingDone: () => void;
}) {
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        const fullMessage = `以下是我分析即将进行的${timestampToStringCh(
            matchTime,
            'YYYY年MM月DD日'
        )}${league}足球赛中 ${home} 对 ${away} 的比赛。`;
        let currentText = '';
        let currentIndex = 0;

        const typeCharacter = () => {
            if (currentIndex < fullMessage.length) {
                currentText += fullMessage[currentIndex];
                setTypedText(currentText);
                currentIndex++;
                setTimeout(typeCharacter, 50);
            } else {
                onTypingDone();
            }
        };

        typeCharacter();
    }, [matchTime, home, away, league]);

    const parts = typedText.split(new RegExp(`(${home}|${away})`));

    return (
        <>
            {parts.map(part =>
                part === home || part === away ? (
                    <span key={part} style={{ color: '#4489ff' }}>
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
}

function MatchItem({
    match,
    handleSelectMatch
}: {
    match: GetPredicativeAnalysisMatch;
    handleSelectMatch: (match: GetPredicativeAnalysisMatch) => void;
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
                <span className={style.name}>
                    <TeamLogo alt={match.homeChs} height={20} src={match.homeLogo} width={20} />
                    {match.homeChs}
                </span>
                <span className={style.name}>VS {match.awayChs}</span>
            </div>
        </div>
    );
}

function AiPredictDetail({ params }: { params: { matchId: string } }) {
    const matchRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({});
    // const router = useRouter();

    const aiPredictList = useAiPredictStore.use.aiPredictList();
    const setAiPredictList = useAiPredictStore.use.setAiPredictList();

    // const [openPaid, setOpenPaid] = useState(false);
    // const [openDialog, setOpenDialog] = useState(false);
    // const userInfo = useUserStore.use.userInfo();
    // const isLogin = useUserStore.use.isLogin();
    // const setAuthQuery = useUserStore.use.setAuthQuery();
    // const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();

    const [showChat, setShowChat] = useState(false);
    const [showInformation, setShowInformation] = useState<Record<number, boolean>>({});
    const [selectedMatches, setSelectedMatches] = useState<
        Record<number, GetPredicativeAnalysisMatch>
    >({});
    const [matchTabs, setMatchTabs] = useState<MatchTab[]>([]);

    useEffect(() => {
        const getPredicativeAnalysisList = async () => {
            const res = await getPredicativeAnalysisMatch({
                matchId: 0,
                matchTime: 0,
                isFinished: true
            });

            if (!res.success) {
                return new Error();
            }
            setAiPredictList(res.data);
        };
        void getPredicativeAnalysisList();
    }, []);

    const handleSelectMatch = (match: GetPredicativeAnalysisMatch) => {
        if (Object.hasOwnProperty.call(selectedMatches, match.matchId)) {
            const matchRef = matchRefs.current[match.matchId];
            matchRef.current?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        setSelectedMatches(prevSelectedMatches => ({
            ...prevSelectedMatches,
            [match.matchId]: match
        }));
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

    // const handleUnlockArticle = (matchId: number) => {
    //     if (!isLogin) {
    //         setAuthQuery('login');
    //         setIsDrawerOpen(true);
    //         return;
    //     }
    //     setOpenPaid(true);
    // };

    // const onSubmit = () => {
    //     if (userInfo.balance < 80) {
    //         setOpenPaid(false);
    //         setOpenDialog(true);
    //         return;
    //     }
    //     setOpenPaid(false);
    //     setPayLock(false);
    // };

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

    const getSelectedComponent = (key: string, match: GetPredicativeAnalysisMatch) => {
        const components: Record<string, JSX.Element> = {
            ai: (
                <Ai
                    match={match}
                    // onUnlockArticle={() => {
                    //     handleUnlockArticle(match.matchId);
                    // }}
                />
            ),
            analyze: (
                <Analyze
                    match={match}
                    // onUnlockArticle={() => {
                    //     handleUnlockArticle(match.matchId);
                    // }}
                />
            ),
            cornor: (
                <Cornor
                    match={match}
                    // onUnlockArticle={() => {
                    //     handleUnlockArticle(match.matchId);
                    // }}
                />
            )
        };
        return components[key];
    };

    const handleTypingDone = (matchId: number) => {
        setShowInformation(prev => ({ ...prev, [matchId]: true }));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChat(true);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        const keys = Object.keys(selectedMatches);
        if (keys.length > 0) {
            const target = Number(keys[keys.length - 1]);
            const matchRef = matchRefs.current[target];
            matchRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedMatches]);

    useEffect(() => {
        const paramMatchId = parseInt(params.matchId);
        const matchedItem = aiPredictList.find(item => item.matchId === paramMatchId);

        if (matchedItem) {
            setTimeout(() => {
                setSelectedMatches(prevMatches => {
                    if (Object.hasOwnProperty.call(selectedMatches, paramMatchId)) {
                        return { ...prevMatches, [paramMatchId]: matchedItem };
                    }
                    return prevMatches;
                });
            }, 2500);
        }
    }, [params.matchId, aiPredictList]);

    return (
        <>
            <div className={style.aiPredict}>
                <div className={style.content}>
                    <div className={style.welcome}>
                        <div className={style.row}>
                            <AiAvatar />
                            <div className={style.title}>FutureAI</div>
                        </div>
                        <div className={style.text}>您好，为您推荐以下赛事预测分析：</div>
                    </div>

                    {Object.keys(selectedMatches).length > 0 ? (
                        <div className={style.start}>开始分析</div>
                    ) : null}

                    {Object.entries(selectedMatches).map(([matchId, match]) => {
                        const currentTabKey = getMatchTabKey(Number(matchId));
                        matchRefs.current[match.matchId] = createRef<HTMLDivElement>();
                        return (
                            <div
                                className={style.analyze}
                                key={match.matchId}
                                ref={matchRefs.current[match.matchId]}
                            >
                                <div className={style.message}>
                                    <AiAvatarSmall className={style.icon} />
                                    <div className={style.text}>
                                        <TypingText
                                            away={match.awayChs}
                                            home={match.homeChs}
                                            league={match.leagueChs}
                                            matchTime={match.matchTime}
                                            onTypingDone={() => {
                                                handleTypingDone(match.matchId);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`${style.teamTitle} ${
                                        showInformation[match.matchId] ? style.fadeIn : style.hidden
                                    }`}
                                >
                                    <div
                                        className={`${style.name} ${
                                            match.predictMatchResult === 1 ? style.win : ''
                                        } ${match.predictMatchResult === 0 ? style.active : ''}`}
                                    >
                                        {match.predictMatchResult === 1 ? (
                                            <Win className={style.icon} />
                                        ) : null}

                                        <TeamLogo
                                            alt={match.homeChs}
                                            height={30}
                                            src={match.homeLogo}
                                            width={30}
                                        />
                                        <span>{match.homeChs}</span>
                                    </div>
                                    {match.predictMatchResult === 0 ? (
                                        <Draw className={style.draw} />
                                    ) : null}
                                    <div
                                        className={`${style.name} ${
                                            match.predictMatchResult === 2 ? style.win : ''
                                        } ${match.predictMatchResult === 0 ? style.active : ''}`}
                                    >
                                        {match.predictMatchResult === 2 ? (
                                            <Win className={style.icon} />
                                        ) : null}
                                        <TeamLogo
                                            alt={match.awayChs}
                                            height={30}
                                            src={match.awayLogo}
                                            width={30}
                                        />
                                        <span>{match.awayChs}</span>
                                    </div>
                                </div>

                                <div
                                    className={`${style.information} ${
                                        showInformation[match.matchId] ? style.fadeIn : style.hidden
                                    }`}
                                >
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
                </div>
                <Tutorial />
            </div>
            {/* <NormalDialog
                confirmText="去充值"
                content={<div>余额不足，请充值</div>}
                onClose={() => {
                    setOpenDialog(false);
                }}
                onConfirm={goSubscribe}
                openDialog={openDialog}
                srcImage={Wallet}
            /> */}
        </>
    );
}

export default AiPredictDetail;

'use client';
import { useEffect, useRef, useState, createRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    getPredicativeAnalysisMatch,
    getPredicativeAnalysisMatchById,
    payForPost
} from 'data-center';
import type {
    GetPredicativeAnalysisMatch,
    GetPredicativeAnalysisMatchByIdResult
} from 'data-center';
import { timestampToString } from 'lib';
import { useUserStore } from '@/store/userStore';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import TeamLogo from '@/components/teamLogo/teamLogo';
import Win from '@/public/resultIcon/bigWin.svg';
import Draw from '@/public/resultIcon/bigDraw.svg';
import Ai from '../components/analyzeContent/ai';
import Analyze from '../components/analyzeContent/analyze';
import Cornor from '../components/analyzeContent/cornor';
import { useAiPredictStore } from '../aiPredictStore';
import Tutorial from '../components/turorial/turorial';
import AiAvatarSmall from './img/aiAvatarSmall.svg';
import style from './aiTodayMatches.module.scss';
import AiAvatar from './img/aiAvatar.svg';

interface MatchTab {
    id: number;
    value: string;
}

type ColorType = `#${string}`;

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
        const fullMessage = `以下是我分析即将进行的${timestampToString(
            matchTime,
            'YYYY年MM月DD日 HH:ss'
        )} ${league}足球赛中 ${home} 对 ${away} 的比赛。`;
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

    const parts = typedText.split(
        new RegExp(`(${league}足球赛|${timestampToString(matchTime, 'YYYY年MM月DD日 HH:ss')})`)
    );

    return (
        <>
            {parts.map(part =>
                part === `${league}足球赛` ||
                part === timestampToString(matchTime, 'YYYY年MM月DD日 HH:ss') ? (
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
    handleSelectMatch: (id: number) => void;
}) {
    return (
        <div
            className={style.item}
            key={match.matchId}
            onClick={() => {
                handleSelectMatch(match.id);
            }}
        >
            <div className={style.league}>
                <span className={style.name} style={{ color: match.color as ColorType }}>
                    {match.leagueChs}
                </span>
                <span className={style.time}>
                    {timestampToString(match.matchTime, 'MM/DD HH:mm')}
                </span>
            </div>
            <div className={style.team}>
                <span className={style.name}>
                    <TeamLogo alt={match.homeChs} height={20} src={match.homeLogo} width={20} />
                    {match.homeChs}
                </span>
                <span className={style.name}>
                    <TeamLogo alt={match.awayChs} height={20} src={match.awayLogo} width={20} />{' '}
                    {match.awayChs}
                </span>
            </div>
            <div className={style.lock}>{match.purchaseCount}人解锁</div>
        </div>
    );
}

function AiTodayMatches() {
    const aiPredictMatchId = useUserStore.use.aiPredictMatchId();
    const isLogin = useUserStore.use.isLogin();
    const matchRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({});
    const aiPredictList = useAiPredictStore.use.aiPredictList();
    const setAiPredictList = useAiPredictStore.use.setAiPredictList();
    const isOpenPayDrawer = useAiPredictStore.use.isOpenPayDrawer();
    const setIsOpenPayDrawer = useAiPredictStore.use.setIsOpenPayDrawer();
    const [showChat, setShowChat] = useState(false);
    const [selectedMatches, setSelectedMatches] = useState<
        Map<number, GetPredicativeAnalysisMatchByIdResult>
    >(new Map());
    const [showInformation, setShowInformation] = useState<Record<number, boolean>>({});
    const [matchTabs, setMatchTabs] = useState<MatchTab[]>([]);
    const [purchaseId, setPurchaseId] = useState<number>(0);

    const handleSelectMatch = async (id: number) => {
        setPurchaseId(id);
        if (selectedMatches.has(id)) {
            const matchRef = matchRefs.current[id];
            matchRef.current?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const res = await getPredicativeAnalysisMatchById({ id });
        if (!res.success) {
            throw new Error();
        }
        setSelectedMatches(prevSelectedMatches => {
            const updatedMatches = new Map(prevSelectedMatches);
            updatedMatches.set(id, res.data);
            return updatedMatches;
        });
    };

    const handleSetTabKey = (id: number, value: string) => {
        setMatchTabs(prev => {
            const index = prev.findIndex(tab => tab.id === id);
            if (index >= 0) {
                const newTabs = [...prev];
                newTabs[index] = { id, value };
                return newTabs;
            }
            return [...prev, { id, value }];
        });
    };

    const getMatchTabKey = (id: number) => {
        const matchTab = matchTabs.find(tab => tab.id === id);
        return matchTab ? matchTab.value : tabList[0].value;
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

    const getSelectedComponent = (key: string, match: GetPredicativeAnalysisMatchByIdResult) => {
        const components: Record<string, JSX.Element> = {
            ai: (
                <Ai
                    match={match}
                    setIsOpenPayDrawer={setIsOpenPayDrawer}
                    setPurchaseId={setPurchaseId}
                />
            ),
            analyze: (
                <Analyze
                    match={match}
                    setIsOpenPayDrawer={setIsOpenPayDrawer}
                    setPurchaseId={setPurchaseId}
                />
            ),
            cornor: (
                <Cornor
                    match={match}
                    setIsOpenPayDrawer={setIsOpenPayDrawer}
                    setPurchaseId={setPurchaseId}
                />
            )
        };
        return components[key];
    };

    const handleTypingDone = (matchId: number) => {
        setShowInformation(prev => ({ ...prev, [matchId]: true }));
    };

    const onPurchase = async () => {
        const res = await payForPost({ postId: purchaseId, purchaseType: 2 });
        if (!res.success) {
            return new Error();
        }
        const predicativeAnalysisDetail = await getPredicativeAnalysisMatchById({ id: purchaseId });
        if (!predicativeAnalysisDetail.success) {
            return new Error();
        }
        setIsOpenPayDrawer(false);
        setTimeout(() => {
            setSelectedMatches(prevSelectedMatches => {
                const updatedMatches = new Map(prevSelectedMatches);
                updatedMatches.set(purchaseId, predicativeAnalysisDetail.data);
                return updatedMatches;
            });
        }, 2500);
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
        if (selectedMatches.size > 0 && selectedMatches.has(purchaseId)) {
            const matchRef = matchRefs.current[purchaseId];
            matchRef.current?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        const lastKey = Array.from(selectedMatches.keys()).pop();
        if (lastKey) {
            const matchRef = matchRefs.current[lastKey];
            matchRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [purchaseId, selectedMatches]);

    useEffect(() => {
        const getPredicativeAnalysisList = async () => {
            const res = await getPredicativeAnalysisMatch({
                matchId: 0,
                matchTime: 0,
                isFinished: false
            });

            if (!res.success) {
                return new Error();
            }
            setAiPredictList(res.data);
            if (aiPredictMatchId) {
                const target = res.data.find(item => item.matchId === aiPredictMatchId);
                if (target) void handleSelectMatch(target.id);
            }
        };
        void getPredicativeAnalysisList();
    }, []);

    return (
        <>
            <div className={style.content}>
                <div className={style.welcome}>
                    <div className={style.row}>
                        <AiAvatar />
                        <div className={style.title}>FutureAI</div>
                    </div>
                    <div className={style.text}>您好，为您推荐以下赛事预测分析：</div>
                </div>
                <div className={`${style.chat} ${showChat ? style.fadeIn : style.hidden}`}>
                    <div className={style.title}>今日精选赛事</div>
                    <div className={style.wrapper}>
                        <div className={style.contestList}>
                            <div className={style.row}>
                                {firstHalfMatches.map(match => (
                                    <MatchItem
                                        handleSelectMatch={handleSelectMatch}
                                        key={match.id}
                                        match={match}
                                    />
                                ))}
                            </div>
                            <div className={style.row}>
                                {secondHalfMatches.map(match => (
                                    <MatchItem
                                        handleSelectMatch={handleSelectMatch}
                                        key={match.id}
                                        match={match}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {selectedMatches.size > 0 && <div className={style.start}>开始分析</div>}
                {Array.from(selectedMatches.values()).map(match => {
                    const isShow = isLogin && match.isMemberPurchased;
                    const currentTabKey = getMatchTabKey(match.id);
                    matchRefs.current[match.id] = createRef<HTMLDivElement>();
                    return (
                        <div
                            className={style.analyze}
                            key={match.id}
                            ref={matchRefs.current[match.id]}
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
                                        isShow && [1, 0].includes(match.predictMatchResult)
                                            ? style.win
                                            : ''
                                    } ${
                                        isShow && match.predictMatchResult === 0 ? style.active : ''
                                    }`}
                                >
                                    {isShow && match.predictMatchResult === 1 ? (
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
                                {isShow && match.predictMatchResult === 0 ? (
                                    <Draw className={style.draw} />
                                ) : null}
                                <div
                                    className={`${style.name} ${
                                        isShow && [2, 0].includes(match.predictMatchResult)
                                            ? style.win
                                            : ''
                                    } ${
                                        isShow && match.predictMatchResult === 0 ? style.active : ''
                                    }`}
                                >
                                    {isShow && match.predictMatchResult === 2 ? (
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
                                                currentTabKey === tab.value ? tabActive : tabDefault
                                            }
                                            className={style.tab}
                                            key={tab.value}
                                            onClick={() => {
                                                handleSetTabKey(match.id, tab.value);
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
                {selectedMatches.size > 0 ? (
                    <div className={`${style.chat} ${showChat ? style.fadeIn : style.hidden}`}>
                        <div className={style.title}>其他推荐赛事</div>
                        <div className={style.wrapper}>
                            <div className={style.contestList}>
                                <div className={style.row}>
                                    {firstHalfMatches.map(match => (
                                        <MatchItem
                                            handleSelectMatch={handleSelectMatch}
                                            key={match.id}
                                            match={match}
                                        />
                                    ))}
                                </div>
                                <div className={style.row}>
                                    {secondHalfMatches.map(match => (
                                        <MatchItem
                                            handleSelectMatch={handleSelectMatch}
                                            key={match.id}
                                            match={match}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <Tutorial />
            <ConfirmPayDrawer
                discount={0}
                hasDiscount
                isOpen={isOpenPayDrawer}
                onClose={() => {
                    setIsOpenPayDrawer(false);
                }}
                onOpen={() => {
                    setIsOpenPayDrawer(true);
                }}
                onPay={onPurchase}
                price={30}
                title="查看本场预测？"
            />
        </>
    );
}

export default AiTodayMatches;

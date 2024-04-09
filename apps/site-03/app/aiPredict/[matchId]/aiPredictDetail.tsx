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
import TeamLogo from '@/components/teamLogo/teamLogo';
import { useUserStore } from '@/store/userStore';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import { useNotificationStore } from '@/store/notificationStore';
import Win from '@/public/resultIcon/bigWin.svg';
import Draw from '@/public/resultIcon/bigDraw.svg';
import Ai from '../components/analyzeContent/ai';
import Analyze from '../components/analyzeContent/analyze';
import Cornor from '../components/analyzeContent/cornor';
import AiAvatarSmall from '../(list)/img/aiAvatarSmall.svg';
import style from '../(list)/aiTodayMatches.module.scss';
import Tutorial from '../components/turorial/turorial';

interface MatchTab {
    id: number;
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
            <div className={style.lock}>{match.purchaseCount}人解鎖</div>
        </div>
    );
}

function AiPredictDetail({ params }: { params: { matchId: string } }) {
    const isLogin = useUserStore.use.isLogin();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const matchRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({});
    const [aiPredictList, setAiPredictList] = useState<GetPredicativeAnalysisMatch[]>([]);
    const [showChat, setShowChat] = useState(false);
    const [showInformation, setShowInformation] = useState<Record<number, boolean>>({});
    const [selectedMatches, setSelectedMatches] = useState<
        Map<number, GetPredicativeAnalysisMatchByIdResult>
    >(new Map());
    const [matchTabs, setMatchTabs] = useState<MatchTab[]>([]);
    const [purchaseId, setPurchaseId] = useState<number>(0);
    const [isOpenPayDrawer, setIsOpenPayDrawer] = useState(false);

    const handleSelectMatch = async (id: number) => {
        if (selectedMatches.has(id)) {
            const matchRef = matchRefs.current[id];
            matchRef.current?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const res = await getPredicativeAnalysisMatchById({ id });
        if (!res.success) {
            return new Error();
        }
        setSelectedMatches(prevSelectedMatches => {
            const updatedMatches = new Map(prevSelectedMatches);
            updatedMatches.set(id, res.data);
            return updatedMatches;
        });
        setPurchaseId(id);
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

    const getSelectedComponent = (key: string, match: GetPredicativeAnalysisMatch) => {
        const components: Record<string, JSX.Element> = {
            ai: <Ai match={match} setIsOpenPayDrawer={setIsOpenPayDrawer} />,
            analyze: <Analyze match={match} setIsOpenPayDrawer={setIsOpenPayDrawer} />,
            cornor: <Cornor match={match} setIsOpenPayDrawer={setIsOpenPayDrawer} />
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
        const predicativeAnalysisDetail = await getPredicativeAnalysisMatchById({
            id: purchaseId
        });
        if (!predicativeAnalysisDetail.success) {
            return new Error();
        }
        setPurchaseId(purchaseId);
        setSelectedMatches(prevSelectedMatches => {
            const updatedMatches = new Map(prevSelectedMatches);
            updatedMatches.set(purchaseId, predicativeAnalysisDetail.data);
            return updatedMatches;
        });
        setIsOpenPayDrawer(false);
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
        if (selectedMatches.size > 0) {
            const lastKey = Array.from(selectedMatches.keys()).pop();
            if (lastKey) {
                const matchRef = matchRefs.current[lastKey];
                matchRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [selectedMatches]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getPredicativeAnalysisMatch({
                matchId: 0,
                matchTime: 0,
                isFinished: false
            });

            if (!res.success) {
                throw new Error();
            }
            setAiPredictList(res.data);
            const matchedItem = res.data.find(item => item.matchId === parseInt(params.matchId));
            if (!matchedItem) {
                setIsVisible('该场赛事可能已经结束,可以前往AI预测历史查看', 'error');
                return;
            }
            const articleRes = await getPredicativeAnalysisMatchById({
                id: matchedItem.id
            });
            if (!articleRes.success) {
                throw new Error();
            }
            const target = articleRes.data;
            setPurchaseId(target.id);
            setSelectedMatches(prevSelectedMatches => {
                const updatedMatches = new Map(prevSelectedMatches);
                updatedMatches.set(target.id, articleRes.data);
                return updatedMatches;
            });
        };

        void fetchData();
    }, []);

    return (
        <>
            <div className={style.aiPredictDetail}>
                <div className={style.content}>
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
                                    } ${isShow && style.hasMinHeight}`}
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
                price={80}
                title="获得智能盘路分析？"
            />
        </>
    );
}

export default AiPredictDetail;

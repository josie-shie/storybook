'use client';
import { useEffect, useRef, useState, createRef } from 'react';
// import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getPredicativeAnalysisMatch, getPredicativeAnalysisMatchById } from 'data-center';
import type {
    GetPredicativeAnalysisMatch,
    GetPredicativeAnalysisMatchByIdResult
} from 'data-center';
import { timestampToString } from 'lib';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
// import NormalDialog from '@/components/normalDialog/normalDialog';
// import { useUserStore } from '@/store/userStore';
// import { useAuthStore } from '@/store/authStore';
import TeamLogo from '@/components/teamLogo/teamLogo';
import Win from '@/public/resultIcon/bigWin.svg';
import Draw from '@/public/resultIcon/bigDraw.svg';
import { useUserStore } from '@/store/userStore';
import Ai from '../components/analyzeContent/ai';
import Analyze from '../components/analyzeContent/analyze';
import Cornor from '../components/analyzeContent/cornor';
import { useAiPredictStore } from '../aiPredictStore';
import Tutorial from '../components/turorial/turorial';
import AiAvatarSmall from './img/aiAvatarSmall.svg';
import style from './aiTodayMatches.module.scss';
import AiAvatar from './img/aiAvatar.svg';
// import Wallet from './img/wallet.png';

const fake = {
    id: 60006,
    matchId: 4084029,
    matchTime: 1711565100,
    leagueId: 615,
    leagueEn: 'KSA Division 1',
    leagueChs: '沙特甲',
    leagueCht: '沙特甲',
    leagueType: 1,
    color: '#2cb116',
    homeId: 22391,
    homeEn: 'Al Najma(KSA)',
    homeChs: '阿尔纳泽马',
    homeCht: '阿爾納澤馬',
    awayId: 48912,
    awayEn: 'Al Bukayriyah',
    awayChs: '布凯里耶',
    awayCht: '布凱里耶',
    homeLogo: 'https://cdn.sportnanoapi.com/football/team/fde877e452f79f75955ad4e4f326c654.png',
    awayLogo: 'https://cdn.sportnanoapi.com/football/team/608b8974ad512df1293585825bef3cee.png',
    predict:
        '考虑到阿尔纳泽马与布凯里耶在沙特甲联赛中的表现，此场比赛预计将呈现高竞争性。阿尔纳泽马拥有主场优势，而布凯里耶则不容小觑。初盘显示没有明显的让球优势和总进球数预测，表明比赛有可能十分接近。',
    summary:
        '综合来看，阿尔纳泽马与布凯里耶的比赛预计将非常激烈，两队都有机会取得胜利。虽然主场优势可能对阿尔纳泽马有所帮助，但布凯里耶的坚韧不拔不应被低估。预计是一场充满战术较量的比赛，最终可能以平局告终或微弱优势取胜。',
    homeStrategicAnalysis:
        '阿尔纳泽马的战略可能会集中在利用主场优势和控球策略。他们倾向于在主场展现出更强的侵略性和进攻欲望，可能会尝试从比赛一开始就对布凯里耶施加压力，利用快速边路突破和中场的紧密配合来创造进球机会。',
    awayStrategicAnalysis:
        '布凯里耶则可能采取更加谨慎的战略，重点放在防守反击上。作为客场作战的一方，他们可能会布置紧密的防守阵型，试图限制阿尔纳泽马的进攻空间，同时依靠快速前锋的反击机会寻求进球。',
    homeTacticalPerspective:
        '从战术层面看，阿尔纳泽马或许会强调中场控制，寻找创造进球的机会。他们可能会利用高位逼抢来回收球权，并通过快速的一触传球突破对手的防线。',
    awayTacticalPerspective:
        '布凯里耶在战术上可能更侧重于防守稳固和快速转换。他们的防守球员需要保持高度集中，同时中场球员的快速下沉协助防守也是关键。在抢回球权后，通过长传和边路突破来发起反击将是他们的主要策略之一。',
    predictResult: '平局',
    predictMatchResult: 0,
    realMatchResult: 1,
    homeScore: 3,
    awayScore: 1,
    purchaseCount: 1,
    isPurchase: false,
    updatedAt: 1711523521
};

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
        new RegExp(`(${league}足球赛中|${timestampToString(matchTime, 'YYYY年MM月DD日 HH:ss')})`)
    );

    return (
        <>
            {parts.map(part =>
                part === `${league}足球赛中` ||
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
            <div className={style.lock}>{match.purchaseCount}人解鎖</div>
        </div>
    );
}

function AiTodayMatches() {
    const matchRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({});
    const isLogin = useUserStore.use.isLogin();

    // const router = useRouter();

    const aiPredictList = useAiPredictStore.use.aiPredictList();
    const setAiPredictList = useAiPredictStore.use.setAiPredictList();
    const isOpenPayDrawer = useAiPredictStore.use.isOpenPayDrawer();
    const setIsOpenPayDrawer = useAiPredictStore.use.setIsOpenPayDrawer();
    // const setPayLock = useAiPredictStore.use.setPayLock();

    // const [openPaid, setOpenPaid] = useState(false);
    // const [openDialog, setOpenDialog] = useState(false);
    // const userInfo = useUserStore.use.userInfo();
    // const isLogin = useUserStore.use.isLogin();
    // const setAuthQuery = useUserStore.use.setAuthQuery();
    // const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();

    const [showChat, setShowChat] = useState(false);
    const [selectedMatches, setSelectedMatches] = useState<
        Record<number, GetPredicativeAnalysisMatchByIdResult>
    >({});
    const [showInformation, setShowInformation] = useState<Record<number, boolean>>({});
    const [matchTabs, setMatchTabs] = useState<MatchTab[]>([]);
    const [purchaseId, setPurchaseId] = useState<number>(0);

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
        };
        void getPredicativeAnalysisList();
    }, []);

    const handleSelectMatch = (match: GetPredicativeAnalysisMatch) => {
        if (Object.hasOwnProperty.call(selectedMatches, match.id)) {
            const matchRef = matchRefs.current[match.id];
            matchRef.current?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        // const res = await getPredicativeAnalysisMatchById({ id: match.id });

        // if (!res.success) {
        //     return new Error();
        // }
        // setSelectedMatches(prevSelectedMatches => ({
        //     ...prevSelectedMatches,
        //     [match.id]: match
        // }));
        setPurchaseId(match.id);
        setSelectedMatches(prevSelectedMatches => ({
            ...prevSelectedMatches,
            [match.id]: fake
        }));
        setPurchaseId(fake.id);
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChat(true);
        }, 2500);

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

    const getSelectedComponent = (key: string, match: GetPredicativeAnalysisMatchByIdResult) => {
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

    const onPurchase = async () => {
        const res = await getPredicativeAnalysisMatchById({ id: purchaseId });
        if (!res.success) {
            return new Error();
        }
        // 會不會買的瞬間完賽？
        setSelectedMatches(prevSelectedMatches => ({
            ...prevSelectedMatches,
            [purchaseId]: res.data
        }));
    };

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
                                        key={`${match.id}`}
                                        match={match}
                                    />
                                ))}
                            </div>
                            <div className={style.row}>
                                {secondHalfMatches.map(match => (
                                    <MatchItem
                                        handleSelectMatch={handleSelectMatch}
                                        key={`${match.matchId}-${match.leagueType}`}
                                        match={match}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {Object.keys(selectedMatches).length > 0 ? (
                    <div className={style.start}>开始分析</div>
                ) : null}
                {Object.entries(selectedMatches).map(([id, match]) => {
                    const currentTabKey = getMatchTabKey(match.id);
                    matchRefs.current[match.id] = createRef<HTMLDivElement>();
                    return (
                        <div
                            className={style.analyze}
                            key={id}
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
                                        [1, 0].includes(match.predictMatchResult) ? style.win : ''
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
                                        [2, 0].includes(match.predictMatchResult) ? style.win : ''
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
                                } ${isLogin && style.hasMinHeight}`}
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
                {Object.keys(selectedMatches).length > 0 ? (
                    <div className={`${style.chat} ${showChat ? style.fadeIn : style.hidden}`}>
                        <div className={style.title}>其他推荐赛事</div>
                        <div className={style.wrapper}>
                            <div className={style.contestList}>
                                <div className={style.row}>
                                    {firstHalfMatches.map(match => (
                                        <MatchItem
                                            handleSelectMatch={handleSelectMatch}
                                            key={`${match.matchId}-${match.leagueType}`}
                                            match={match}
                                        />
                                    ))}
                                </div>
                                <div className={style.row}>
                                    {secondHalfMatches.map(match => (
                                        <MatchItem
                                            handleSelectMatch={handleSelectMatch}
                                            key={`${match.matchId}-${match.leagueType}`}
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
                price={80}
                title="获得智能盘路分析？"
            />
        </>
    );
}

export default AiTodayMatches;

'use client';
import { useState, useEffect, useRef } from 'react';
import { getGuessProportion, addGuess } from 'data-center';
import { useParams } from 'next/navigation';
import { ProgressBar } from 'ui';
import { useUserStore } from '@/app/userStore';
import { useAuthStore } from '@/app/(auth)/authStore';
import style from './guessBar.module.scss';
import { useContestDetailStore } from './contestDetailStore';
import GuessDialog from './components/guessDialog/guessDialog';

interface GuessProps {
    isLogin: boolean;
    play: 'HANDICAP' | 'OVERUNDER';
}

const calculatePercentage = (a: number, b: number) => {
    if (a === 0 && b === 0) return 50;
    const percentage = Math.round((a / (a + b)) * 100);
    return percentage;
};

const guessTypeLabel = {
    HANDICAP: { left: '主', right: '客' },
    OVERUNDER: { left: '大', right: '小' }
};

function Guess({ play, isLogin }: GuessProps) {
    const userInfo = useUserStore.use.userInfo();
    const matchId = Number(useParams().matchId);
    const [direction, setDirection] = useState<'left' | 'right'>('left');
    const [openGuessDialog, setOpenGuessDialog] = useState(false);

    const guessProportion = useContestDetailStore.use.guessProportion();
    const matchDetail = useContestDetailStore.use.matchDetail();

    const setGuessProportion = useContestDetailStore.use.setGuessProportion();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();

    const noGuess =
        play === 'HANDICAP'
            ? guessProportion.home.itemType === ''
            : guessProportion.over.itemType === '';
    const leftBox = play === 'HANDICAP' ? guessProportion.home : guessProportion.over;
    const rightBox = play === 'HANDICAP' ? guessProportion.away : guessProportion.under;
    const guessLabel =
        play === 'HANDICAP'
            ? guessProportion.handicapInChinese
            : guessProportion.overUnder.toString();

    const leftPercent = calculatePercentage(leftBox.peopleNum, rightBox.peopleNum);
    const rightPercent = 100 - leftPercent;

    const handleAddGuess = (direct: 'left' | 'right') => {
        if (!isLogin) {
            setAuthQuery('login');
            setIsDrawerOpen(true);
            return;
        }
        setDirection(direct);
        setOpenGuessDialog(true);
    };

    const confirmGuess = async () => {
        if (play === 'HANDICAP') {
            const guessWay = direction === 'left' ? 'HOME' : 'AWAY';
            const res = await addGuess({ matchId, predictedPlay: guessWay });
            if (res.success) {
                void fetchGuessProportion();
            } else {
                // TODO : 競猜錯誤
            }
        } else {
            const guessWay = direction === 'left' ? 'OVER' : 'UNDER';
            const res = await addGuess({ matchId, predictedPlay: guessWay });
            if (res.success) {
                void fetchGuessProportion();
            } else {
                // TODO : 競猜錯誤
            }
        }
        setOpenGuessDialog(false);
    };

    const fetchGuessProportion = async () => {
        const newGuessProportion = await getGuessProportion({ matchId, memberId: userInfo.uid });
        if (newGuessProportion.success) setGuessProportion(newGuessProportion.data);
    };

    return (
        <div className={style.box}>
            <GuessDialog
                awayTeamName={matchDetail.awayChs}
                handicap={guessLabel}
                homeTeamName={matchDetail.homeChs}
                onClose={() => {
                    setOpenGuessDialog(false);
                }}
                onConfirm={confirmGuess}
                openPaid={openGuessDialog}
                play={guessTypeLabel[play][direction]}
            />
            <div
                className={`${style.team} ${leftBox.itemType === 'selected' ? style.selected : ''}`}
                onClick={() => {
                    if (leftBox.itemType === '') handleAddGuess('left');
                }}
            >
                <div>{guessTypeLabel[play].left}</div>
                {noGuess ? null : <div className={style.percentage}>{leftPercent}%</div>}
            </div>
            <div className={style.middle}>
                <p className={style.lable}>{guessLabel}</p>
                {noGuess ? (
                    <div className={style.lineBar} />
                ) : (
                    <ProgressBar
                        background="#8D8D8D"
                        fill="#fff"
                        gapSize="small"
                        height={5}
                        radius
                        value={leftPercent}
                    />
                )}
            </div>
            <div
                className={`${style.team} ${
                    rightBox.itemType === 'selected' ? style.selected : ''
                }`}
                onClick={() => {
                    if (rightBox.itemType === '') handleAddGuess('right');
                }}
            >
                <div>{guessTypeLabel[play].right}</div>
                {noGuess ? null : <div className={style.percentage}>{rightPercent}%</div>}
            </div>
        </div>
    );
}

function GuessBar() {
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();
    const matchId = Number(useParams().matchId);

    const setGuessProportion = useContestDetailStore.use.setGuessProportion();
    const setCoveredType = useContestDetailStore.use.setCoveredType();
    const liveBarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let init = true;
        async function fetchGuessProportion() {
            const guessProportion = await getGuessProportion({ matchId, memberId: userInfo.uid });
            if (!init) return;
            if (guessProportion.success) {
                setGuessProportion(guessProportion.data);
            }
        }
        if (isLogin) void fetchGuessProportion();

        return () => {
            init = false;
        };
    }, [isLogin, matchId, setGuessProportion, userInfo.uid]);

    useEffect(() => {
        const currentRef = liveBarRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setCoveredType(entry.isIntersecting);
            },
            {
                threshold: 0.3
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [setCoveredType]);

    return (
        <div className={style.guessBar} ref={liveBarRef}>
            <Guess isLogin={isLogin} play="HANDICAP" />
            <Guess isLogin={isLogin} play="OVERUNDER" />
        </div>
    );
}

export default GuessBar;

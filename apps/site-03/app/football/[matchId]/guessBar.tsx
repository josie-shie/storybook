'use client';
import { useEffect, useRef } from 'react';
import { getGuessProportion, addGuess } from 'data-center';
import { useParams } from 'next/navigation';
import { ProgressBar } from 'ui';
import style from './guessBar.module.scss';
import { useContestDetailStore } from './contestDetailStore';
import { useUserStore } from '@/app/userStore';
import { useAuthStore } from '@/app/(auth)/authStore';

interface GuessProps {
    isLogin: boolean;
    play: 'HANDICAP' | 'OVERUNDER';
}

const calculatePercentage = (a: number, b: number) => {
    if (b === 0) {
        return 0;
    }
    const percentage = Math.round((a / (a + b)) * 100);
    return percentage;
};

function Guess({ play, isLogin }: GuessProps) {
    const matchId = Number(useParams().matchId);
    const guessTypeLabel = {
        HANDICAP: { left: '主', play: '半/ㄧ', right: '客' },
        OVERUNDER: { left: '大', play: '2/2.5', right: '小' }
    };
    const guessProportion = useContestDetailStore.use.guessProportion();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();

    const noGuess =
        play === 'HANDICAP'
            ? guessProportion.home.itemType === ''
            : guessProportion.over.itemType === '';
    const leftBox = play === 'HANDICAP' ? guessProportion.home : guessProportion.over;
    const rightBox = play === 'HANDICAP' ? guessProportion.away : guessProportion.under;

    const leftPercent = calculatePercentage(leftBox.peopleNum, rightBox.peopleNum);
    const rightPercent = 100 - leftPercent;

    const handleAddGuess = async (direction: 'left' | 'right') => {
        if (!isLogin) {
            setAuthQuery('login');
            setIsDrawerOpen(true);
            return;
        }
        if (play === 'HANDICAP') {
            const guessWay = direction === 'left' ? 'HOME' : 'AWAY';
            const res = await addGuess({ matchId, predictedPlay: guessWay });
            if (res.success) {
                // set global remainingGuessTimes
            } else {
                // TODO : 競猜錯誤
            }
        } else {
            const guessWay = direction === 'left' ? 'OVER' : 'UNDER';
            const res = await addGuess({ matchId, predictedPlay: guessWay });
            if (res.success) {
                // set global remainingGuessTimes
            } else {
                // TODO : 競猜錯誤
            }
        }
    };

    return (
        <div className={style.box}>
            <div
                className={`${style.team} ${leftBox.itemType === 'selected' ? style.selected : ''}`}
                onClick={() => {
                    if (leftBox.itemType === '') void handleAddGuess('left');
                }}
            >
                <div>{guessTypeLabel[play].left}</div>
                {noGuess ? null : <div className={style.percentage}>{leftPercent}%</div>}
            </div>
            <div className={style.middle}>
                <p className={style.lable}>{guessTypeLabel[play].play}</p>
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
                    if (rightBox.itemType === '') void handleAddGuess('right');
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
        async function fetchGuessProportion() {
            const guessProportion = await getGuessProportion({ matchId, memberId: userInfo.uid });
            if (guessProportion.success) {
                setGuessProportion(guessProportion.data);
            }
        }
        if (isLogin) void fetchGuessProportion();
    }, [isLogin, matchId, userInfo.uid]);

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

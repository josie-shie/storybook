'use client';
import { useState, useEffect } from 'react';
import { getGuessProportion, addGuess } from 'data-center';
import { useParams } from 'next/navigation';
import { ProgressBar } from 'ui';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import Notification from '@/components/notification/notification';
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

    const setShowNotification = useContestDetailStore.use.setShowNotification();
    const setNotificationMessage = useContestDetailStore.use.setNotificationMessage();
    const setGuessProportion = useContestDetailStore.use.setGuessProportion();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();

    const isMatchStart = [1, 2, 3, 4, 5, -1, -12, -13].includes(matchDetail.state);
    const isShowGuessPercent =
        guessProportion.home.itemType !== '' ||
        guessProportion.over.itemType !== '' ||
        isMatchStart;
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
        if (isShowGuessPercent) {
            const isHomeAwayGuessed = play === 'HANDICAP' && guessProportion.home.itemType !== '';
            const isBigSmallGuessed = play !== 'HANDICAP' && guessProportion.over.itemType !== '';

            if (isHomeAwayGuessed || isBigSmallGuessed) {
                return;
            }
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
                setNotificationMessage(res.error);
                setShowNotification(true);
            }
        } else {
            const guessWay = direction === 'left' ? 'OVER' : 'UNDER';
            const res = await addGuess({ matchId, predictedPlay: guessWay });
            if (res.success) {
                void fetchGuessProportion();
            } else {
                setNotificationMessage(res.error);
                setShowNotification(true);
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
                {isShowGuessPercent ? <div className={style.percentage}>{leftPercent}%</div> : null}
            </div>
            <div className={style.middle}>
                <p className={style.lable}>{guessLabel}</p>
                {isShowGuessPercent ? (
                    <ProgressBar
                        background="#8D8D8D"
                        fill="#fff"
                        gapSize="small"
                        height={5}
                        radius
                        value={leftPercent}
                    />
                ) : (
                    <div className={style.lineBar} />
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
                {isShowGuessPercent ? (
                    <div className={style.percentage}>{rightPercent}%</div>
                ) : null}
            </div>
        </div>
    );
}

function GuessBar() {
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();
    const matchId = Number(useParams().matchId);
    const [isShowGuessBar, setIsShowGuessBar] = useState(true);

    const showNotification = useContestDetailStore.use.showNotification();
    const notificationMessage = useContestDetailStore.use.notificationMessage();
    const setGuessProportion = useContestDetailStore.use.setGuessProportion();
    const setShowNotification = useContestDetailStore.use.setShowNotification();

    useEffect(() => {
        async function fetchGuessProportion() {
            const guessProportion = await getGuessProportion({
                matchId,
                memberId: isLogin ? userInfo.uid : 1
            });
            if (guessProportion.success) {
                setGuessProportion(guessProportion.data);
                setIsShowGuessBar(
                    guessProportion.data.handicapInChinese !== '平手' ||
                        guessProportion.data.overUnder.toString() !== '0'
                );
            }
        }
        void fetchGuessProportion();
    }, [isLogin, matchId, setGuessProportion, userInfo.uid]);

    return isShowGuessBar ? (
        <div className={style.guessBar}>
            <Notification
                handleClose={() => {
                    setShowNotification(false);
                }}
                isVisible={showNotification}
                message={notificationMessage}
                type="error"
            />
            <Guess isLogin={isLogin} play="HANDICAP" />
            <Guess isLogin={isLogin} play="OVERUNDER" />
        </div>
    ) : null;
}

export default GuessBar;

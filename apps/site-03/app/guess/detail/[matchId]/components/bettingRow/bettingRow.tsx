import { ProgressBar } from 'ui/stories/progressBar/progressBar';
import { useState } from 'react';
import { addGuess } from 'data-center';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import { useGuessContestListStore } from '@/app/guess/(list)/contest/contestStore';
import selectDecoration from '../../img/select.png';
import GuessDialog from '../guessDialog/guessDialog';
import type { DetailType } from '../../guessDetailStore';
import { useGuessDetailStore } from '../../guessDetailStore';
import style from './bettingRow.module.scss';

interface BettingProps {
    detail: DetailType;
    leftLabel: string;
    rightLabel: string;
}

const calculatePercentage = (a: number, b: number) => {
    if (a === 0 && b === 0) return 50;
    const percentage = Math.round((a / (a + b)) * 100);
    return percentage;
};

function BettingRow({ detail, leftLabel, rightLabel }: BettingProps) {
    const matchId = useParams().matchId;
    const [openGuessDialog, setOpenGuessDialog] = useState(false);
    const [direction, setDirection] = useState<'right' | 'left'>('left');
    const [isShowGuessingLoading, setIsShowGuessingLoading] = useState(false);

    const leftPercent =
        leftLabel === '主'
            ? calculatePercentage(detail.home, detail.away)
            : calculatePercentage(detail.big, detail.small);
    const rightPercent = 100 - leftPercent;
    const playWay = direction === 'left' ? leftLabel : rightLabel;
    const guessLabel = leftLabel === '主' ? detail.handicapInChinese : detail.overUnder.toString();
    const guessStatus = leftLabel === '主' ? detail.guessHomeAway : detail.guessBigSmall;
    const isShowGuessPercent = detail.guessHomeAway !== 'none' || detail.guessBigSmall !== 'none';

    const isLogin = useUserStore.use.isLogin();
    const highWinRateTrend = useGuessDetailStore.use.highWinRateTrend();
    const setTotalNum =
        typeof useGuessContestListStore === 'object'
            ? useGuessContestListStore.use.setTotalNum()
            : () => {
                  /* 不執行 set function */
              };

    const setGuessDetail = useGuessDetailStore.use.setDetail();
    const setGuessesLeft = useGuessDetailStore.use.setGuessesLeft();
    const setHighWinRateTrend = useGuessDetailStore.use.setHighWinRateTrend();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();

    const handleGuess = (guessDirection: 'left' | 'right') => {
        if (!isLogin) {
            setAuthQuery('login');
            setIsDrawerOpen(true);
            return;
        }

        if (isShowGuessPercent) {
            const isHomeAwayGuessed = leftLabel === '主' && detail.guessHomeAway !== 'none';
            const isBigSmallGuessed = leftLabel !== '主' && detail.guessBigSmall !== 'none';

            if (isHomeAwayGuessed || isBigSmallGuessed) {
                return;
            }
        }
        setOpenGuessDialog(true);
        setDirection(guessDirection);
    };

    const handleClickClose = () => {
        setOpenGuessDialog(false);
    };

    const handleConfirmGuess = async () => {
        setOpenGuessDialog(false);
        setIsShowGuessingLoading(true);
        if (leftLabel === '主') {
            const betting = direction === 'left' ? 'home' : 'away';
            const newDetail: DetailType = {
                ...detail,
                guessHomeAway: betting,
                [betting]: detail[betting] + 1
            };
            const res = await addGuess({
                matchId: Number(matchId),
                predictedPlay: betting.toUpperCase() as 'HOME' | 'AWAY',
                needProDistrib: true
            });
            if (res.success) {
                setGuessesLeft(res.data.remainingGuessTimes);
                newDetail.participants = res.data.guessNum;
                setTotalNum({ matchId: Number(matchId), totalNum: res.data.guessNum });
                if (res.data.enoughProData) {
                    const newProDistrib = {
                        ...highWinRateTrend,
                        home: res.data.home || 0,
                        away: res.data.away || 0,
                        over: res.data.over || 0,
                        under: res.data.under || 0,
                        proMemberNum: res.data.proMemberNum || 0,
                        memberPermission: true
                    };
                    setHighWinRateTrend(newProDistrib);
                }
            }
            setGuessDetail({ ...newDetail });
        } else {
            const betting = direction === 'left' ? 'over' : 'under';
            const convertKey = betting === 'over' ? 'big' : 'small';
            const newDetail: DetailType = {
                ...detail,
                guessBigSmall: betting,
                [convertKey]: detail[convertKey] + 1
            };
            const res = await addGuess({
                matchId: Number(matchId),
                predictedPlay: betting.toUpperCase() as 'OVER' | 'UNDER',
                needProDistrib: true
            });
            if (res.success) {
                setGuessesLeft(res.data.remainingGuessTimes);
                newDetail.participants = res.data.guessNum;
                setTotalNum({ matchId: Number(matchId), totalNum: res.data.guessNum });
                if (res.data.enoughProData) {
                    const newProDistrib = {
                        ...highWinRateTrend,
                        home: res.data.home || 0,
                        away: res.data.away || 0,
                        over: res.data.over || 0,
                        under: res.data.under || 0,
                        proMemberNum: res.data.proMemberNum || 0,
                        memberPermission: true
                    };
                    setHighWinRateTrend(newProDistrib);
                }
            }
            setGuessDetail({ ...newDetail });
        }
        setIsShowGuessingLoading(false);
    };

    return (
        <div className={style.bettingRow}>
            <GuessDialog
                awayTeamName={detail.awayTeamName}
                handicap={guessLabel}
                homeTeamName={detail.homeTeamName}
                onClose={handleClickClose}
                onConfirm={handleConfirmGuess}
                openPaid={openGuessDialog}
                play={playWay}
            />
            {isShowGuessPercent ? (
                <div className={style.unLock}>
                    <div
                        className={`${style.button} ${
                            guessStatus === 'away' || guessStatus === 'under' ? style.noSelect : ''
                        }`}
                    >
                        <span
                            className={style.team}
                            onClick={() => {
                                handleGuess('left');
                            }}
                        >
                            {leftLabel}
                        </span>
                        {isShowGuessingLoading ? (
                            <div className={style.loadingBox}>
                                <CircularProgress size={12} style={{ color: '#b3c4d5' }} />
                            </div>
                        ) : (
                            <span className={style.user}>{leftPercent}%</span>
                        )}
                        {(guessStatus === 'home' || guessStatus === 'over') && (
                            <Image alt="" height={20} src={selectDecoration} width={20} />
                        )}
                    </div>
                    <div className={style.progress}>
                        <div className={style.play}>
                            <span className={style.home}>
                                {leftLabel === '主' ? detail.home : detail.big}
                            </span>
                            <span className={style.ing}>{guessLabel}</span>
                            <span className={style.away}>
                                {leftLabel === '主' ? detail.away : detail.small}
                            </span>
                        </div>
                        <ProgressBar
                            background="#FFFFFF4D"
                            fill="#fff"
                            height={8}
                            radius
                            value={leftPercent}
                        />
                    </div>
                    <div
                        className={`${style.button} ${
                            guessStatus === 'home' || guessStatus === 'over' ? style.noSelect : ''
                        }`}
                    >
                        <span
                            className={style.team}
                            onClick={() => {
                                handleGuess('right');
                            }}
                        >
                            {rightLabel}
                        </span>
                        {isShowGuessingLoading ? (
                            <div className={style.loadingBox}>
                                <CircularProgress size={12} style={{ color: '#b3c4d5' }} />
                            </div>
                        ) : (
                            <span className={style.user}>{rightPercent}%</span>
                        )}
                        {(guessStatus === 'away' || guessStatus === 'under') && (
                            <Image alt="" height={20} src={selectDecoration} width={20} />
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className={style.button}
                        onClick={() => {
                            handleGuess('left');
                        }}
                    >
                        {leftLabel}
                    </div>
                    <div className={style.progress}>
                        <div className={style.play}>{guessLabel}</div>
                        <ProgressBar
                            background="#9FC2FF"
                            fill="#9FC2FF"
                            height={8}
                            radius
                            value={50}
                        />
                    </div>
                    <div
                        className={style.button}
                        onClick={() => {
                            handleGuess('right');
                        }}
                    >
                        {rightLabel}
                    </div>
                </>
            )}
        </div>
    );
}

export default BettingRow;

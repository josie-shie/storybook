'use client';
import Image from 'next/image';
import { ProgressBar } from 'ui/stories/progressBar/progressBar';
import { useEffect, useState } from 'react';
import { getMatchDetail, getGuessProportion, addGuess } from 'data-center';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import defaultTeamLogo from '@/app/football/[matchId]/img/defaultTeamLogo.png';
import { useGuessDetailStore } from './guessDetailStore';
import style from './vsBox.module.scss';
import selectDecoration from './img/select.png';
import GuessDialog from './components/guessDialog/guessDialog';
import type { DetailType } from './guessDetailStore';

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

function BettingColumn({ detail, leftLabel, rightLabel }: BettingProps) {
    const matchId = useParams().matchId;
    const [openGuessDialog, setOpenGuessDialog] = useState(false);
    const [direction, setDirection] = useState<'right' | 'left'>('left');

    const leftPercent =
        leftLabel === '主'
            ? calculatePercentage(detail.home, detail.away)
            : calculatePercentage(detail.big, detail.small);
    const rightPercent = 100 - leftPercent;
    const playWay = direction === 'left' ? leftLabel : rightLabel;
    const guessLabel = leftLabel === '主' ? detail.handicapInChinese : detail.overUnder.toString();
    const guessStatus = leftLabel === '主' ? detail.guessHomeAway : detail.guessBigSmall;

    const isLogin = useUserStore.use.isLogin();
    const setGuessDetail = useGuessDetailStore.use.setDetail();
    const setGuessesLeft = useGuessDetailStore.use.setGuessesLeft();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();

    const handleGuess = (guessDirection: 'left' | 'right') => {
        if (!isLogin) {
            setAuthQuery('login');
            setIsDrawerOpen(true);
            return;
        }
        setOpenGuessDialog(true);
        setDirection(guessDirection);
    };

    const handleClickClose = () => {
        setOpenGuessDialog(false);
    };

    const handleConfirmGuess = async () => {
        setOpenGuessDialog(false);
        if (leftLabel === '主') {
            const betting = direction === 'left' ? 'home' : 'away';
            const newDetail: DetailType = {
                ...detail,
                guessHomeAway: betting,
                [betting]: detail[betting] + 1
            };
            const res = await addGuess({
                matchId: Number(matchId),
                predictedPlay: betting.toUpperCase() as 'HOME' | 'AWAY'
            });
            if (res.success) {
                setGuessesLeft(res.data.remainingGuessTimes);
                newDetail.participants = res.data.guessNum;
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
                predictedPlay: betting.toUpperCase() as 'OVER' | 'UNDER'
            });
            if (res.success) {
                setGuessesLeft(res.data.remainingGuessTimes);
                newDetail.participants = res.data.guessNum;
            }
            setGuessDetail({ ...newDetail });
        }
    };

    return (
        <div className={style.column}>
            <GuessDialog
                awayTeamName={detail.awayTeamName}
                handicap={guessLabel}
                homeTeamName={detail.homeTeamName}
                onClose={handleClickClose}
                onConfirm={handleConfirmGuess}
                openPaid={openGuessDialog}
                play={playWay}
            />
            {guessStatus === 'none' ? (
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
                        <div className={style.line} />
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
            ) : (
                <div className={style.unLock}>
                    <div
                        className={`${style.button} ${
                            guessStatus === 'away' || guessStatus === 'under' ? style.noSelect : ''
                        }`}
                    >
                        <span className={style.team}>{leftLabel}</span>
                        <span className={style.user}>{leftPercent}%</span>
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
                        <span className={style.team}>{rightLabel}</span>
                        <span className={style.user}>{rightPercent}%</span>
                        {(guessStatus === 'away' || guessStatus === 'under') && (
                            <Image alt="" height={20} src={selectDecoration} width={20} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function VsBox() {
    const matchId = useParams().matchId;
    const isLogin = useUserStore.use.isLogin();
    const userInfo = useUserStore.use.userInfo();
    const detailInfo = useGuessDetailStore.use.detail();
    const setDetailInfo = useGuessDetailStore.use.setDetail();
    const setGuessesLeft = useGuessDetailStore.use.setGuessesLeft();

    const covertGuessStatus = (isHandicap: boolean, status: 'selected' | 'unselected' | '') => {
        const statusMapping = {
            selected: isHandicap ? 'home' : 'over',
            unselected: isHandicap ? 'away' : 'under',
            '': 'none'
        };
        return statusMapping[status] || 'none';
    };
    const timestampToDateString = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${month}-${day} ${hours}:${minutes}`;
    };

    useEffect(() => {
        async function fetchMatchDetail() {
            const matchDetail = await getMatchDetail(Number(matchId));
            const guessProportion = await getGuessProportion({
                matchId: Number(matchId),
                memberId: isLogin ? userInfo.uid : 1
            });
            if (matchDetail.success && guessProportion.success) {
                const baseData = matchDetail.data;
                const guessData = guessProportion.data;
                setDetailInfo({
                    leagueName: baseData.leagueChsShort,
                    dateTime: baseData.matchTime,
                    homeTeamLogo: baseData.homeLogo,
                    homeTeamName: baseData.homeChs,
                    awayTeamLogo: baseData.awayLogo,
                    awayTeamName: baseData.awayChs,
                    participants: guessData.guessNum,
                    handicap: guessData.handicap,
                    handicapInChinese: guessData.handicapInChinese,
                    overUnder: guessData.overUnder,
                    guessHomeAway: covertGuessStatus(true, guessData.home.itemType) as
                        | 'home'
                        | 'away'
                        | 'none',
                    guessBigSmall: covertGuessStatus(false, guessData.over.itemType) as
                        | 'over'
                        | 'under'
                        | 'none',
                    home: guessData.home.peopleNum,
                    away: guessData.away.peopleNum,
                    big: guessData.over.peopleNum,
                    small: guessData.under.peopleNum
                });
                setGuessesLeft(guessData.remainingGuessTimes);
            }
        }
        void fetchMatchDetail();
    }, [matchId, isLogin, userInfo.uid]);

    return (
        <div className={style.vsBox}>
            <div className={style.title}>
                {detailInfo.leagueName} {timestampToDateString(detailInfo.dateTime)}
            </div>
            <div className={style.clubInfo}>
                <div className={style.team}>
                    <Image
                        alt=""
                        height={48}
                        src={
                            detailInfo.homeTeamLogo === '0'
                                ? defaultTeamLogo.src
                                : detailInfo.homeTeamLogo
                        }
                        width={48}
                    />
                    <div className={style.name}>{detailInfo.homeTeamName}</div>
                </div>
                <div className={style.fight}>VS</div>
                <div className={style.team}>
                    <Image
                        alt=""
                        height={48}
                        src={
                            detailInfo.awayTeamLogo === '0'
                                ? defaultTeamLogo.src
                                : detailInfo.awayTeamLogo
                        }
                        width={48}
                    />
                    <div className={style.name}>{detailInfo.awayTeamName}</div>
                </div>
            </div>
            <div className={style.join}>
                <span className={style.text}>
                    {detailInfo.participants}人参与競猜，点击预测后查看风向
                </span>
            </div>
            <div className={style.betting}>
                <BettingColumn detail={detailInfo} leftLabel="主" rightLabel="客" />
                <BettingColumn detail={detailInfo} leftLabel="大" rightLabel="小" />
            </div>
        </div>
    );
}

export default VsBox;

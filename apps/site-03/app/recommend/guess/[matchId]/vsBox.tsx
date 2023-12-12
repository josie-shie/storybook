'use client';
import Image from 'next/image';
import { ProgressBar } from 'ui/stories/progressBar/progressBar';
import { useEffect, useState } from 'react';
import { getMatchDetail, getGuessProportion, addGuess } from 'data-center';
import { useParams } from 'next/navigation';
import NorthBangKokClubIcon from './img/northBangkokClubIcon.png';
import ThaiUniversityClubIcon from './img/thaiUniversityClubIcon.png';
import { useGuessDetailStore } from './guessDetailStore';
import style from './vsBox.module.scss';
import selectDecoration from './img/select.png';
import GuessDialog from './components/guessDialog/guessDialog';
import type { DetailType } from './guessDetailStore';

interface BettingProps {
    play: string;
    detail: DetailType;
    homeType: string;
    awayType: string;
}

function BettingColumn({ play, detail, homeType, awayType }: BettingProps) {
    const matchId = useParams().matchId;
    const [openGuessDialog, setOpenGuessDialog] = useState(false);
    const [direction, setDirection] = useState('left');
    const calculatePercentage = (a: number, b: number) => {
        if (b === 0) {
            return 0;
        }
        const percentage = Math.round((a / (a + b)) * 100);
        return percentage;
    };
    const leftPercent =
        homeType === '主'
            ? calculatePercentage(detail.home, detail.away)
            : calculatePercentage(detail.big, detail.small);
    const rightPercent = 100 - leftPercent;
    const guessStatus = homeType === '主' ? detail.guessHomeAway : detail.guessBigSmall;
    const guessTeam = direction === 'left' ? detail.homeTeamName : detail.awayTeamName;

    const guessesLeft = useGuessDetailStore.use.guessesLeft();
    const setGuessDetail = useGuessDetailStore.use.setDetail();
    const setGuessesLeft = useGuessDetailStore.use.setGuessesLeft();

    const handleGuess = (guessDirection: 'left' | 'right') => {
        setOpenGuessDialog(true);
        setDirection(guessDirection);
    };
    const handleClickClose = () => {
        setOpenGuessDialog(false);
    };
    const handleConfirmGuess = async () => {
        //  API addGuess
        setOpenGuessDialog(false);
        if (homeType === '主') {
            const betting = direction === 'left' ? 'home' : 'away';
            const newDetail: DetailType = { ...detail, guessHomeAway: betting };
            await addGuess({
                matchId: Number(matchId),
                predictedPlay: betting.toUpperCase() as 'HOME' | 'AWAY'
            });
            setGuessDetail({ ...newDetail });
            setGuessesLeft(guessesLeft - 1);
        } else {
            const betting = direction === 'left' ? 'over' : 'under';
            const newDetail: DetailType = { ...detail, guessBigSmall: betting };
            await addGuess({
                matchId: Number(matchId),
                predictedPlay: betting.toUpperCase() as 'OVER' | 'UNDER'
            });
            setGuessDetail({ ...newDetail });
            setGuessesLeft(guessesLeft - 1);
        }
    };

    return (
        <div className={style.column}>
            <GuessDialog
                handicap="让一球/球半"
                onClose={handleClickClose}
                onConfirm={handleConfirmGuess}
                openPaid={openGuessDialog}
                play="让分"
                teamName={guessTeam}
            />
            {guessStatus === 'none' ? (
                <>
                    <div
                        className={style.button}
                        onClick={() => {
                            handleGuess('left');
                        }}
                    >
                        {homeType}
                    </div>
                    <div className={style.progress}>
                        <div className={style.play}>{play}</div>
                        <div className={style.line} />
                    </div>
                    <div
                        className={style.button}
                        onClick={() => {
                            handleGuess('right');
                        }}
                    >
                        {awayType}
                    </div>
                </>
            ) : (
                <div className={style.unLock}>
                    <div
                        className={`${style.button} ${
                            guessStatus === 'away' || guessStatus === 'under' ? style.noSelect : ''
                        }`}
                    >
                        <span className={style.team}>{homeType}</span>
                        <span className={style.user}>{leftPercent}%</span>
                        {(guessStatus === 'home' || guessStatus === 'over') && (
                            <Image alt="" height={20} src={selectDecoration} width={20} />
                        )}
                    </div>
                    <div className={style.progress}>
                        <div className={style.play}>
                            <span className={style.home}>
                                {homeType === '主' ? detail.home : detail.big}
                            </span>
                            <span className={style.ing}>{play}</span>
                            <span className={style.away}>
                                {homeType === '主' ? detail.away : detail.small}
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
                        <span className={style.team}>{awayType}</span>
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
    const timestampToDateString = timestamp => {
        const date = new Date(timestamp * 1000); // 将时间戳转换为毫秒
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 获取月份并补零
        const day = String(date.getDate()).padStart(2, '0'); // 获取日期并补零
        const hours = String(date.getHours()).padStart(2, '0'); // 获取小时并补零
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 获取分钟并补零

        return `${month}-${day} ${hours}:${minutes}`;
    };

    useEffect(() => {
        async function fetchMatchDetail() {
            const matchDetail = await getMatchDetail(Number(matchId));
            const guessProportion = await getGuessProportion({
                matchId: Number(matchId),
                memberId: 16 // TODO: memberId 從 useInfo Store
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
                    participants: 1276, // 參與競猜人數(getGuessProportion API 欄位待新增)
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
    }, [matchId]);

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
                        src={detailInfo.homeTeamLogo || ThaiUniversityClubIcon}
                        width={48}
                    />
                    <div className={style.name}>{detailInfo.homeTeamName}</div>
                </div>
                <div className={style.fight}>VS</div>
                <div className={style.team}>
                    <Image
                        alt=""
                        height={48}
                        src={detailInfo.awayTeamLogo || NorthBangKokClubIcon}
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
                <BettingColumn awayType="客" detail={detailInfo} homeType="主" play="一球/球半" />
                <BettingColumn awayType="小" detail={detailInfo} homeType="大" play="一球/球半" />
            </div>
        </div>
    );
}

export default VsBox;

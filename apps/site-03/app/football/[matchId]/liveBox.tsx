'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { GetSingleMatchResponse, ContestInfo } from 'data-center';
import { GameStatus } from 'ui';
import { motion } from 'framer-motion';
import { useLiveContestStore } from '@/store/liveContestStore';
import { createContestDetailStore, useContestDetailStore } from './contestDetailStore';
import TeamLogo from './components/teamLogo';
import Header from './header';
import style from './liveBox.module.scss';
import bgImage from './img/bg.jpg';
import BackIcon from './img/back.png';
import Football from './img/football.png';

const statusStyleMap = {
    '0': 'notYet',
    '1': 'midfielder',
    '2': 'midfielder',
    '3': 'midfielder',
    '4': 'playOff',
    '5': 'playOff',
    '-1': 'finish',
    '-10': 'notYet',
    '-11': 'notYet',
    '-12': 'notYet',
    '-13': 'notYet',
    '-14': 'notYet'
};

interface InterceptDataType {
    awayChs: string;
    awayHalfScore: number;
    awayScore: number;
    countryCn: string;
    homeChs: string;
    homeHalfScore: number;
    homeScore: number;
    isFamous: boolean;
    leagueChsShort: string;
    leagueId: number;
    leagueLevel: number;
    matchId: number;
    startTime: number;
    [key: string]: number | string | boolean;
}

function GameDetail({
    matchId,
    interceptData
}: {
    matchId: number;
    interceptData?: InterceptDataType | ContestInfo;
}) {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const globalStore = useLiveContestStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    const liveState = syncData.state || matchDetail.state || (interceptData?.state as number);

    return (
        <div className={style.gameStatus}>
            {liveState < 1 && liveState !== -1 && <p className={style.vsText}>VS</p>}
            <div className={style.gameScore}>
                <GameStatus
                    className={`gameTime ${
                        statusStyleMap[matchDetail.state || (interceptData?.state as number)]
                    }`}
                    startTime={matchDetail.startTime || interceptData?.startTime || 0}
                    status={liveState}
                />

                <div className={style.homeScore}>
                    {syncData.homeScore || matchDetail.homeScore || interceptData?.homeScore}
                </div>
                <div className={style.awayScore}>
                    {syncData.awayScore || matchDetail.awayScore || interceptData?.awayScore}
                </div>
            </div>

            <div className={style.textHolder}>
                <p className={style.text}>
                    半場 {matchDetail.homeHalfScore || interceptData?.homeHalfScore}-
                    {matchDetail.awayHalfScore || interceptData?.awayHalfScore}
                </p>
            </div>
        </div>
    );
}

function Animate() {
    const showAnimate = useContestDetailStore.use.showAnimate();
    const setShowAnimate = useContestDetailStore.use.setShowAnimate();

    const back = () => {
        setShowAnimate('');
    };

    return (
        <>
            {showAnimate ? (
                <div className={style.animateBox}>
                    <iframe src={showAnimate} title="sport animate" />
                    <Image
                        alt="back_icon"
                        className={style.backIcon}
                        height={24}
                        onClick={back}
                        src={BackIcon}
                        width={24}
                    />
                </div>
            ) : null}
        </>
    );
}

function GoalAnimation({
    contestDetail,
    matchId
}: {
    contestDetail: GetSingleMatchResponse;
    matchId: number;
}) {
    const globalStore = useLiveContestStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};
    const [homeScoreKeep, setHomeScoreKeep] = useState(
        syncData.homeScore || contestDetail.homeScore
    );
    const [awayScoreKeep, setAwayScoreKeep] = useState(
        syncData.awayScore || contestDetail.awayScore
    );

    useEffect(() => {
        if (syncData.homeScore && syncData.homeScore !== homeScoreKeep) {
            setTimeout(() => {
                syncData.homeScore && setHomeScoreKeep(syncData.homeScore);
            }, 2000);
        }
        if (syncData.awayScore && syncData.awayScore !== awayScoreKeep) {
            setTimeout(() => {
                syncData.awayScore && setAwayScoreKeep(syncData.awayScore);
            }, 2000);
        }
    }, [syncData.awayScore, syncData.homeScore]);

    return (
        <>
            <motion.div
                animate={
                    syncData.homeScore && homeScoreKeep !== syncData.homeScore
                        ? { x: 0 }
                        : { opacity: 0 }
                }
                className={`${style.goalAnimation} ${
                    syncData.homeScore && homeScoreKeep !== syncData.homeScore && style.homeGoal
                }`}
                initial={{ x: '-100%' }}
                transition={{ duration: 0.1 }}
            >
                <div className={style.gradient}>
                    <div className={style.goalBar}>
                        <Image alt="football" height={18} src={Football} width={18} />
                        <p>进球 !</p>
                    </div>
                </div>
            </motion.div>
            <motion.div
                animate={
                    syncData.awayScore && awayScoreKeep !== syncData.awayScore
                        ? { x: 0 }
                        : { opacity: 0 }
                }
                className={`${style.goalAnimation} ${
                    syncData.homeScore && homeScoreKeep !== syncData.homeScore && style.awayGoal
                }`}
                initial={{ x: '100%' }}
                transition={{ duration: 0.1 }}
            >
                <div className={style.gradient}>
                    <div className={style.goalBar}>
                        <Image alt="football" height={18} src={Football} width={18} />
                        <p>进球 !</p>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

function LiveBox({
    contestDetail,
    backHistory,
    matchId,
    interceptData
}: {
    contestDetail: GetSingleMatchResponse;
    backHistory?: boolean;
    matchId: number;
    interceptData?: InterceptDataType | ContestInfo;
}) {
    createContestDetailStore({ matchDetail: contestDetail });
    const matchDetail = useContestDetailStore.use.matchDetail();
    const router = useRouter();

    const back = () => {
        if (backHistory) {
            router.back();
        } else {
            router.push('/');
        }
    };

    return (
        <div className={style.liveBox} style={{ backgroundImage: `url(${bgImage.src})` }}>
            <Header back={back} interceptData={interceptData} matchId={matchId} />
            <div className={style.scoreboard}>
                <div className={style.gameInfo}>
                    <div className={style.team}>
                        <div className={style.circleBg}>
                            <TeamLogo
                                alt={matchDetail.homeChs}
                                height={46}
                                src={matchDetail.homeLogo}
                                width={46}
                            />
                        </div>
                        <p className={style.teamName}>
                            {matchDetail.homeChs || interceptData?.homeChs}
                        </p>
                    </div>
                    <div className={style.score}>
                        <GameDetail interceptData={interceptData} matchId={matchId} />
                    </div>
                    <div className={style.team}>
                        <div className={style.circleBg}>
                            <TeamLogo
                                alt={matchDetail.awayChs}
                                height={46}
                                src={matchDetail.awayLogo}
                                width={46}
                            />
                        </div>
                        <p className={style.teamName}>
                            {matchDetail.awayChs || interceptData?.awayChs}
                        </p>
                    </div>
                </div>
            </div>
            <Animate />
            <GoalAnimation contestDetail={contestDetail} matchId={matchId} />
        </div>
    );
}

export default LiveBox;

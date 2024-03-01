'use client';

import type { ContestInfo, ContestInfoType } from 'data-center';
import { GameStatus } from 'ui';
import { motion } from 'framer-motion';
import { parseMatchInfo, handicapResult, convertHandicap } from 'lib';
import Link from 'next/link';
import Image from 'next/image';
import type { MouseEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useFormattedTime } from '@/hooks/useFormattedTime';
import { useLiveContestStore } from '@/store/liveContestStore';
import { useInterceptPassStore } from '@/store/interceptPassStore';
import { useContestListStore } from '../contestListStore';
import style from './gameCard.module.scss';
import { CompareOdds } from './compareOdds';
import Soccer from './img/soccer.png';
import VideoIcon from './img/video.svg';
import CornerIcon from './img/corner.svg';
import UpIcon from './img/up.svg';

type Status = 'all' | 'progress' | 'schedule' | 'result';

enum ResultName {
    Lose = 'lose',
    Minus = 'minus',
    Win = 'win',
    Victory = 'victory',
    Go = 'go',
    Tie = 'tie',
    Goal = 'goal',
    Miss = 'miss',
    Big = 'big',
    Small = 'small'
}

const resultNameMap = {
    [ResultName.Lose]: '输',
    [ResultName.Minus]: '负',
    [ResultName.Win]: '赢',
    [ResultName.Victory]: '胜',
    [ResultName.Go]: '走',
    [ResultName.Tie]: '平',
    [ResultName.Goal]: '进',
    [ResultName.Miss]: '失',
    [ResultName.Big]: '大',
    [ResultName.Small]: '小'
};

function ExtraInfo({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useLiveContestStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    if (!syncData.extraExplain && !contestInfo.extraExplain) return null;

    const extraObj = parseMatchInfo(syncData.extraExplain || contestInfo.extraExplain);

    return (
        <div className={style.extraInfo}>
            {extraObj.regularTime?.minutes ? `${extraObj.regularTime.minutes} 分钟` : ''} [
            {extraObj.regularTime?.score}]
            {extraObj.extraTime?.type ? `${extraObj.extraTime.type},` : ''}
            {extraObj.extraTime?.score ? `, 现在比分[${extraObj.extraTime.score}]` : ''}
        </div>
    );
}

function AnimateLine({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useLiveContestStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};
    const [homeScoreKeep, setHomeScoreKeep] = useState(syncData.homeScore || contestInfo.homeScore);
    const [awayScoreKeep, setAwayScoreKeep] = useState(syncData.awayScore || contestInfo.awayScore);
    const [showHomeContent, setShowHomeContent] = useState(false);
    const [showAwayContent, setShowAwayContent] = useState(false);

    useEffect(() => {
        if (syncData.homeScore !== homeScoreKeep) {
            setShowHomeContent(true);
            setTimeout(() => {
                syncData.homeScore && setHomeScoreKeep(syncData.homeScore);

                setTimeout(() => {
                    setShowHomeContent(false);
                }, 1000);
            }, 4500);
        }
        if (syncData.awayScore !== awayScoreKeep) {
            setShowAwayContent(true);
            setTimeout(() => {
                syncData.awayScore && setAwayScoreKeep(syncData.awayScore);

                setTimeout(() => {
                    setShowAwayContent(false);
                }, 1000);
            }, 4500);
        }
    }, [syncData.awayScore, syncData.homeScore]);

    return (
        <div className={style.animateLine}>
            <div className={style.holder}>
                <div
                    className={`${style.homeAnimate} ${
                        syncData.homeScore && homeScoreKeep !== syncData.homeScore
                            ? style.active
                            : ''
                    } ${style.bg}`}
                >
                    {showHomeContent ? (
                        <>
                            <span className={style.goal}>进球！</span>
                            <Image alt="soccer" height={16} src={Soccer} width={16} />
                        </>
                    ) : null}
                </div>
            </div>
            <div className={style.midHolder} />
            <div className={style.holder}>
                <div
                    className={`${style.awayAnimate} ${
                        syncData.awayScore && awayScoreKeep !== syncData.awayScore
                            ? style.active
                            : ''
                    } ${style.bg}`}
                >
                    {showAwayContent ? (
                        <>
                            <Image alt="soccer" height={16} src={Soccer} width={16} />
                            <span className={style.goal}>进球！</span>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

function OddsInfo({
    contestInfo,
    matchId,
    status
}: {
    contestInfo: ContestInfo;
    matchId: number;
    status: Status;
}) {
    const globalStore = useLiveContestStore.use.contestInfo();
    const pinnedContest = useContestListStore.use.pinnedContest();
    const setPinnedContest = useContestListStore.use.setPinnedContest();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    const handlePinToTop = (event: MouseEvent) => {
        event.preventDefault();
        setPinnedContest({ matchId });
    };

    const HandicapIsClose =
        (typeof syncData.handicapClosed !== 'undefined' && syncData.handicapClosed) ||
        contestInfo.handicapClosed;
    const OverUnderIsClose =
        (typeof syncData.overUnderClosed !== 'undefined' && syncData.overUnderClosed) ||
        contestInfo.overUnderClosed;

    return (
        <div className={style.oddsInfo}>
            <div className={`${style.oddBox} ${style.left}`}>
                <div className={style.IconHolder}>
                    {status === 'all' && (
                        <motion.button
                            aria-label="置顶"
                            className={style.pinToTop}
                            onClick={event => {
                                handlePinToTop(event);
                            }}
                            type="button"
                            whileTap={{ scale: 0.9 }}
                        >
                            <UpIcon
                                className={`${style.pinIcon} ${
                                    pinnedContest.includes(matchId) && style.active
                                }`}
                            />
                        </motion.button>
                    )}
                </div>
                <div
                    className={`${style.odd} ${HandicapIsClose && style.closeOdd}`}
                    suppressHydrationWarning
                >
                    {!contestInfo.hasHandicapOdd && (
                        <>
                            {HandicapIsClose ? (
                                <>
                                    <p>-</p>
                                    <p>封</p>
                                    <p>-</p>
                                </>
                            ) : (
                                <>
                                    <CompareOdds
                                        value={
                                            syncData.handicapHomeCurrentOdds ||
                                            contestInfo.handicapHomeCurrentOdds
                                        }
                                    />
                                    <CompareOdds
                                        defaultColor="blue"
                                        value={
                                            syncData.handicapCurrent || contestInfo.handicapCurrent
                                        }
                                    />
                                    <CompareOdds
                                        value={
                                            syncData.handicapAwayCurrentOdds ||
                                            contestInfo.handicapAwayCurrentOdds
                                        }
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className={style.mid}>
                <p className={style.halfScore} suppressHydrationWarning>
                    {(syncData.state || contestInfo.state) < 0 ||
                    (syncData.state || contestInfo.state) > 2 ? (
                        <>
                            {syncData.homeHalfScore || contestInfo.homeHalfScore}-
                            {syncData.awayHalfScore || contestInfo.awayHalfScore}
                        </>
                    ) : null}
                </p>
            </div>
            <div className={`${style.oddBox} ${style.right}`}>
                <div
                    className={`${style.odd} ${OverUnderIsClose && style.closeOdd}`}
                    suppressHydrationWarning
                >
                    {!contestInfo.hasOverUnderOdd && (
                        <>
                            {OverUnderIsClose ? (
                                <>
                                    <p>-</p>
                                    <p>封</p>
                                    <p>-</p>
                                </>
                            ) : (
                                <>
                                    <CompareOdds
                                        value={
                                            syncData.overUnderOverCurrentOdds ||
                                            contestInfo.overUnderOverCurrentOdds
                                        }
                                    />
                                    <CompareOdds
                                        defaultColor="blue"
                                        value={
                                            syncData.overUnderCurrent ||
                                            contestInfo.overUnderCurrent
                                        }
                                    />
                                    <CompareOdds
                                        value={
                                            syncData.overUnderUnderCurrentOdds ||
                                            contestInfo.overUnderUnderCurrentOdds
                                        }
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className={style.IconHolder} />
            </div>
        </div>
    );
}

function TeamInfo({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useLiveContestStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    return (
        <div className={style.teamInfo}>
            <div className={`${style.homeTeam} ${style.team}`}>
                <div className={style.cards}>
                    {(syncData.homeRed && syncData.homeRed > 0) || contestInfo.homeRed > 0 ? (
                        <p className={`${style.redCard} ${style.card}`}>
                            {syncData.homeRed || contestInfo.homeRed}
                        </p>
                    ) : null}
                    {(syncData.homeYellow && syncData.homeYellow > 0) ||
                    contestInfo.homeYellow > 0 ? (
                        <p className={`${style.yellowCard} ${style.card}`}>
                            {syncData.homeYellow || contestInfo.homeYellow}
                        </p>
                    ) : null}
                </div>
                <div className={style.teamName} suppressHydrationWarning>
                    {contestInfo.homeChs}
                </div>
            </div>
            <div
                className={`${style.score} ${
                    syncData.state === -1 || (contestInfo.state === -1 && style.finishScore)
                } ui-game-card-score`}
            >
                {(syncData.state || contestInfo.state) !== 0 ? (
                    <>
                        {syncData.homeScore || contestInfo.homeScore}-
                        {syncData.awayScore || contestInfo.awayScore}
                    </>
                ) : (
                    <p className={style.noYet}>VS</p>
                )}
            </div>
            <div className={`${style.awayTeam} ${style.team}`}>
                <div className={style.teamName} suppressHydrationWarning>
                    {contestInfo.awayChs}
                </div>
                <div className={style.cards}>
                    {(syncData.awayRed && syncData.awayRed > 0) || contestInfo.awayRed > 0 ? (
                        <p className={`${style.redCard} ${style.card}`} suppressHydrationWarning>
                            {syncData.awayRed || contestInfo.awayRed}
                        </p>
                    ) : null}
                    {(syncData.awayYellow && syncData.awayYellow > 0) ||
                    contestInfo.awayYellow > 0 ? (
                        <p className={`${style.yellowCard} ${style.card}`} suppressHydrationWarning>
                            {syncData.awayYellow || contestInfo.awayYellow}
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

function TopArea({
    contestInfo,
    matchId,
    status
}: {
    contestInfo: ContestInfo;
    matchId: number;
    status: Status;
}) {
    const globalStore = useLiveContestStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};
    const currentMatchTime = useFormattedTime({
        timeStamp: contestInfo.matchTime,
        formattedString: 'HH:mm'
    });

    const matchState = syncData.state || contestInfo.state;
    const matchStartTime = syncData.startTime || contestInfo.startTime;
    const matchHalfStartTime = syncData.halfStartTime || contestInfo.halfStartTime;

    return (
        <div className={style.topArea}>
            <div className={style.left}>
                <div
                    className={style.league}
                    style={{ color: contestInfo.color }}
                    suppressHydrationWarning
                >
                    {contestInfo.leagueChsShort}
                </div>
                <div className={`${style.time}  ui-game-card-time`}>
                    {contestInfo.matchTime ? currentMatchTime : null}
                </div>
                {status === 'result' && (
                    <div className={style.halfScore} suppressHydrationWarning>
                        {contestInfo.homeHalfScore}-{contestInfo.awayHalfScore}
                    </div>
                )}
            </div>
            <div className={style.mid}>
                <div className={style.status}>
                    <GameStatus
                        startTime={matchState === 1 ? matchStartTime : matchHalfStartTime}
                        status={syncData.state || contestInfo.state}
                    />
                </div>
            </div>
            <div className={style.right}>
                {(matchState > 0 || matchState === -1) && (
                    <div className={style.corner}>
                        <CornerIcon className={style.cornerIcon} />
                        <span className={style.ratio} suppressHydrationWarning>
                            {syncData.homeCorner || contestInfo.homeCorner}
                        </span>
                        -
                        <span className={style.ratio} suppressHydrationWarning>
                            {syncData.awayCorner || contestInfo.awayCorner}
                        </span>
                    </div>
                )}

                {status === 'result' ? (
                    <div
                        className={`${style.resultBar} ${
                            style[
                                handicapResult(
                                    contestInfo.homeScore,
                                    contestInfo.awayScore,
                                    contestInfo.handicapInit
                                )
                            ]
                        }`}
                    >
                        {contestInfo.hasHandicapInit ? null : (
                            <>
                                <p className={style.handicap}>
                                    {convertHandicap(contestInfo.handicapInit)}
                                </p>
                                <p className={style.result}>
                                    {
                                        resultNameMap[
                                            handicapResult(
                                                contestInfo.homeScore,
                                                contestInfo.awayScore,
                                                contestInfo.handicapInit
                                            )
                                        ]
                                    }
                                </p>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <div className={style.information} suppressHydrationWarning>
                            {contestInfo.hasLineup !== '0' ? (
                                <div className={style.text} suppressHydrationWarning>
                                    阵容
                                </div>
                            ) : null}
                            {contestInfo.hasLineup !== '0' && contestInfo.hasIntelligence ? (
                                <div className={style.line} suppressHydrationWarning />
                            ) : null}
                            {contestInfo.hasIntelligence ? (
                                <div className={style.text} suppressHydrationWarning>
                                    情报
                                </div>
                            ) : null}
                        </div>
                        {contestInfo.hasAnimation ? (
                            <VideoIcon className={style.videoIcon} suppressHydrationWarning />
                        ) : null}
                    </>
                )}
            </div>
        </div>
    );
}

function GameCard({
    matchId,
    status,
    children
}: {
    matchId: number;
    status: Status;
    children?: ReactNode;
}) {
    const contestInfo = useContestListStore.use.contestInfo();
    const resultContestInfo = useContestListStore.use.resultContestInfo();
    const scheduleContestInfo = useContestListStore.use.scheduleContestInfo();

    let targetContestList: ContestInfoType;
    if (status === 'result') {
        targetContestList = resultContestInfo;
    } else if (status === 'schedule') {
        targetContestList = scheduleContestInfo;
    } else {
        targetContestList = contestInfo;
    }

    const targetContestInfo = targetContestList[matchId];
    const setInterceptData = useInterceptPassStore.use.setInterceptData();

    return (
        <li className={`${style.gameCard} ui-game-card`}>
            <Link
                className={style.gameCardLink}
                href={`/football/${matchId}`}
                onClick={() => {
                    setInterceptData(targetContestInfo);
                }}
            >
                <TopArea contestInfo={targetContestInfo} matchId={matchId} status={status} />
                <TeamInfo contestInfo={targetContestInfo} matchId={matchId} />
                {status !== 'result' && (
                    <>
                        <OddsInfo
                            contestInfo={targetContestInfo}
                            matchId={matchId}
                            status={status}
                        />
                        {targetContestInfo.state !== 0 && (
                            <AnimateLine contestInfo={targetContestInfo} matchId={matchId} />
                        )}
                        <ExtraInfo contestInfo={targetContestInfo} matchId={matchId} />
                    </>
                )}
            </Link>
            {children}
        </li>
    );
}

export default GameCard;

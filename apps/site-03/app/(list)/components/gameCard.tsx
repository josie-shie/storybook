import type { ContestInfo } from 'data-center';
import { GameStatus } from 'ui';
import { parseMatchInfo } from 'lib';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormattedTime } from '@/hooks/useFormattedTime';
import { useContestInfoStore } from '@/app/contestInfoStore';
import { useContestListStore } from '../contestListStore';
import style from './gameCard.module.scss';
import { CompareOdds } from './compareOdds';
import Soccer from './img/soccer.png';
import Video from './img/video.jpg';

function ExtraInfo({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    if (!syncData.extraExplain && !contestInfo.extraExplain) return null;

    const extraObj = parseMatchInfo(syncData.extraExplain || contestInfo.extraExplain);

    return (
        <div className={style.extraInfo}>
            {extraObj.regularTime?.minutes ? `${extraObj.regularTime.minutes} 分钟` : ''} [
            {extraObj.regularTime?.score}]{' '}
            {extraObj.extraTime?.type ? `${extraObj.extraTime.type},` : ''}
            {extraObj.extraTime?.score ? `, 现在比分[${extraObj.extraTime.score}]` : ''}
        </div>
    );
}

function AnimateLine({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};
    const [homeScoreKeep, setHomeScoreKeep] = useState(syncData.homeScore || contestInfo.homeScore);
    const [awayScoreKeep, setAwayScoreKeep] = useState(syncData.awayScore || contestInfo.awayScore);

    useEffect(() => {
        if (syncData.homeScore !== homeScoreKeep) {
            setTimeout(() => {
                syncData.homeScore && setHomeScoreKeep(syncData.homeScore);
            }, 3000);
        }
        if (syncData.awayScore !== awayScoreKeep) {
            setTimeout(() => {
                syncData.awayScore && setAwayScoreKeep(syncData.awayScore);
            }, 3000);
        }
    }, [syncData.awayScore, syncData.homeScore]);

    return (
        <div className={style.animateLine}>
            <div className={style.holder}>
                {syncData.homeScore && homeScoreKeep !== syncData.homeScore ? (
                    <div className={`${style.homeAnimate} ${style.bg}`}>
                        <span className={style.goal}>进球！</span>
                        <Image alt="soccer" height={16} src={Soccer} width={16} />
                    </div>
                ) : null}
            </div>
            <div className={style.corner}>
                角:
                <span className={style.ratio}>{syncData.homeCorner || contestInfo.homeCorner}</span>
                -
                <span className={style.ratio}>{syncData.awayCorner || contestInfo.awayCorner}</span>
            </div>
            <div className={style.holder}>
                {syncData.awayScore && awayScoreKeep !== syncData.awayScore ? (
                    <div className={`${style.awayAnimate} ${style.bg}`}>
                        <Image alt="soccer" height={16} src={Soccer} width={16} />
                        <span className={style.goal}>进球！</span>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function OddsInfo({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    return (
        <div className={style.oddsInfo}>
            <span className={`${style.odd} ${style.left}`}>
                {syncData.handicapHomeCurrentOdds ||
                syncData.handicapAwayCurrentOdds ||
                contestInfo.handicapHomeCurrentOdds ||
                contestInfo.handicapAwayCurrentOdds ? (
                    <>
                        <CompareOdds
                            value={
                                syncData.handicapHomeCurrentOdds ||
                                contestInfo.handicapHomeCurrentOdds
                            }
                        />
                        <CompareOdds
                            defaultColor="blue"
                            value={syncData.handicapCurrent || contestInfo.handicapCurrent}
                        />
                        <CompareOdds
                            value={
                                syncData.handicapAwayCurrentOdds ||
                                contestInfo.handicapAwayCurrentOdds
                            }
                        />
                    </>
                ) : null}
            </span>
            <span className={style.mid}>
                <p className={style.halfScore}>
                    {(syncData.state || contestInfo.state) < 0 ||
                    (syncData.state || contestInfo.state) > 2 ? (
                        <>
                            {syncData.homeHalfScore || contestInfo.homeHalfScore} -{' '}
                            {syncData.awayHalfScore || contestInfo.awayHalfScore}
                        </>
                    ) : null}
                </p>
            </span>
            <span className={style.odd}>
                {syncData.overUnderUnderCurrentOdds ||
                syncData.overUnderOverCurrentOdds ||
                contestInfo.overUnderUnderCurrentOdds ||
                contestInfo.overUnderOverCurrentOdds ? (
                    <>
                        <CompareOdds
                            value={
                                syncData.overUnderUnderCurrentOdds ||
                                contestInfo.overUnderUnderCurrentOdds
                            }
                        />
                        <CompareOdds
                            defaultColor="blue"
                            value={syncData.overUnderCurrent || contestInfo.overUnderCurrent}
                        />
                        <CompareOdds
                            value={
                                syncData.overUnderOverCurrentOdds ||
                                contestInfo.overUnderOverCurrentOdds
                            }
                        />
                    </>
                ) : null}
            </span>
        </div>
    );
}

function TeamInfo({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useContestInfoStore.use.contestInfo();
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
                {contestInfo.homeChs}
            </div>
            <div className={style.score}>
                {(syncData.state || contestInfo.state) !== 0 ? (
                    <>
                        {syncData.homeScore || contestInfo.homeScore} -{' '}
                        {syncData.awayScore || contestInfo.awayScore}
                    </>
                ) : (
                    '-'
                )}
            </div>
            <div className={`${style.awayTeam} ${style.team}`}>
                {contestInfo.awayChs}
                <div className={style.cards}>
                    {(syncData.awayRed && syncData.awayRed > 0) || contestInfo.awayRed > 0 ? (
                        <p className={`${style.redCard} ${style.card}`}>
                            {syncData.awayRed || contestInfo.awayRed}
                        </p>
                    ) : null}
                    {(syncData.awayYellow && syncData.awayYellow > 0) ||
                    contestInfo.awayYellow > 0 ? (
                        <p className={`${style.yellowCard} ${style.card}`}>
                            {syncData.awayYellow || contestInfo.awayYellow}
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

function TopArea({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};
    const currentMatchTime = useFormattedTime({
        timeStamp: contestInfo.matchTime,
        formattedString: 'HH:mm'
    });
    return (
        <div className={style.topArea}>
            <div className={style.left}>
                <div className={style.league} style={{ color: contestInfo.color }}>
                    {contestInfo.leagueChsShort}
                </div>
                <div className={style.time}>{contestInfo.matchTime ? currentMatchTime : null}</div>
            </div>
            <div className={style.mid}>
                <div className={style.status}>
                    <GameStatus
                        startTime={contestInfo.startTime}
                        status={syncData.state || contestInfo.state}
                    />
                </div>
            </div>
            <div className={style.video}>
                {contestInfo.hasAnimation ? (
                    <Image alt="animate" className={style.videoIcon} src={Video} />
                ) : null}
            </div>
        </div>
    );
}

function GameCard({ matchId }: { matchId: number }) {
    const contestInfo = useContestListStore.use.contestInfo()[matchId];

    return (
        <li className={style.gameCard}>
            <Link href={`/football/${matchId}`}>
                <div>
                    <TopArea contestInfo={contestInfo} matchId={matchId} />
                    <TeamInfo contestInfo={contestInfo} matchId={matchId} />
                    <OddsInfo contestInfo={contestInfo} matchId={matchId} />
                    {contestInfo.state !== 0 && (
                        <AnimateLine contestInfo={contestInfo} matchId={matchId} />
                    )}
                    <ExtraInfo contestInfo={contestInfo} matchId={matchId} />
                </div>
            </Link>
        </li>
    );
}

export default GameCard;

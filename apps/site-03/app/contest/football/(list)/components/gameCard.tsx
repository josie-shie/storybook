import type { ContestInfo } from 'data-center';
import Image from 'next/image';
import { GameStatus } from 'ui';
import { parseMatchInfo } from 'lib';
import Link from 'next/link';
import { useContestListStore } from '../contestListStore';
import style from './gameCard.module.scss';
import Flag from './img/flag.png';
import { CompareOdds } from './compareOdds';
import { useFormattedTime } from '@/hooks/useFormattedTime';
import { useContestInfoStore } from '@/app/contestInfoStore';

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
                <p>
                    {(syncData.state || contestInfo.state) < 0 ||
                    (syncData.state || contestInfo.state) > 2 ? (
                        <>
                            ({syncData.homeHalfScore || contestInfo.homeHalfScore} -{' '}
                            {syncData.awayHalfScore || contestInfo.awayHalfScore})
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
                <div className={style.corner}>
                    <Image alt="flag" height={12} src={Flag.src} width={12} />{' '}
                    <span className={style.ratio}>
                        {syncData.homeCorner || contestInfo.homeCorner}
                    </span>
                </div>
                <div className={style.status}>
                    <GameStatus
                        startTime={contestInfo.startTime}
                        status={syncData.state || contestInfo.state}
                    />
                </div>
                <div className={style.corner}>
                    <Image alt="flag" height={12} src={Flag.src} width={12} />{' '}
                    <span className={style.ratio}>
                        {syncData.awayCorner || contestInfo.awayCorner}
                    </span>
                </div>
            </div>
            <div className={style.video} />
        </div>
    );
}

function GameCard({ matchId }: { matchId: number }) {
    const contestInfo = useContestListStore.use.contestInfo()[matchId];

    return (
        <li className={style.gameCard}>
            <Link href={`/contest/football/${matchId}`}>
                <div>
                    <TopArea contestInfo={contestInfo} matchId={matchId} />
                    <TeamInfo contestInfo={contestInfo} matchId={matchId} />
                    <OddsInfo contestInfo={contestInfo} matchId={matchId} />
                    <ExtraInfo contestInfo={contestInfo} matchId={matchId} />
                </div>
            </Link>
        </li>
    );
}

export default GameCard;

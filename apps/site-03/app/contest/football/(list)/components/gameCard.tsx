import type { ContestInfo } from 'data-center';
import Image from 'next/image';
import { GameStatus } from 'ui';
import { useContestListStore } from '../contestListStore';
import style from './gameCard.module.scss';
import Flag from './img/flag.png';
import { useContestInfoStore } from '@/app/contestInfoStore';

/**
 * extraExplain: ";|90,1-0;1-1;;3-2;1",matchId: 2496035
 */

// function ExtraInfo({ contestInfo }: { contestInfo: ContestInfo }) {
//     return <div className={style.extraInfo}>90 分鐘 [0-0], 加時中,現在比分[1-1]</div>;
// } // TODO: game extra info

function OddsInfo({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};
    return (
        <div className={style.oddsInfo}>
            <span className={`${style.odd} ${style.left}`}>
                <p>0.85</p>
                <p className={style.blue}>0/0.5</p>
                <p>1.00</p>
            </span>
            <span className={style.mid}>
                <p>
                    ({syncData.homeHalfScore || contestInfo.homeHalfScore} -{' '}
                    {syncData.awayHalfScore || contestInfo.awayHalfScore})
                </p>
            </span>
            <span className={style.odd}>
                <p>0.85</p>
                <p className={style.blue}>2</p>
                <p>1.00</p>
            </span>
        </div>
    );
}

function TeamInfo({ contestInfo, matchId }: { contestInfo: ContestInfo; matchId: number }) {
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};
    if (syncData.matchId)
        // eslint-disable-next-line -- test info
        console.log(syncData, contestInfo.awayChs, contestInfo.homeChs, '此賽事更新');
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
                {syncData.homeScore || contestInfo.homeScore} -{' '}
                {syncData.awayScore || contestInfo.awayScore}
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

    return (
        <div className={style.topArea}>
            <div className={style.left}>
                <div className={style.league} style={{ color: contestInfo.color }}>
                    {contestInfo.leagueChsShort}
                </div>
                <div className={style.time}>
                    {contestInfo.matchTime ? contestInfo.matchTime.slice(-5) : null}
                </div>
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
            <TopArea contestInfo={contestInfo} matchId={matchId} />
            <TeamInfo contestInfo={contestInfo} matchId={matchId} />
            <OddsInfo contestInfo={contestInfo} matchId={matchId} />
            {/* <ExtraInfo contestInfo={contestInfo} /> */}
        </li>
    );
}

export default GameCard;

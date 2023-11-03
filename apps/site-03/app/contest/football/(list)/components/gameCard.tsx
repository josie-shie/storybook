import type { ContestInfo } from 'data-center';
import Image from 'next/image';
import { GameStatus } from 'ui';
import { useContestListStore } from '../contestListStore';
import style from './gameCard.module.scss';
import Video from './img/video.png';
import Flag from './img/flag.png';

// function ExtraInfo({ contestInfo }: { contestInfo: ContestInfo }) {
//     return <div className={style.extraInfo}>90 分鐘 [0-0], 加時中,現在比分[1-1]</div>;
// } // TODO: game extra info

function OddsInfo({ contestInfo }: { contestInfo: ContestInfo }) {
    return (
        <div className={style.oddsInfo}>
            <span className={`${style.odd} ${style.left}`}>
                <p>0.85</p>
                <p className={style.blue}>0/0.5</p>
                <p>1.00</p>
            </span>
            <span className={style.mid}>
                <p>
                    ({contestInfo.homeHalfScore} - {contestInfo.awayHalfScore})
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

function TeamInfo({ contestInfo }: { contestInfo: ContestInfo }) {
    return (
        <div className={style.teamInfo}>
            <div className={`${style.homeTeam} ${style.team}`}>
                <div className={style.cards}>
                    {contestInfo.homeRed > 0 && (
                        <p className={`${style.redCard} ${style.card}`}>{contestInfo.homeRed}</p>
                    )}
                    {contestInfo.homeYellow > 0 && (
                        <p className={`${style.yellowCard} ${style.card}`}>
                            {contestInfo.homeYellow}
                        </p>
                    )}
                </div>
                {contestInfo.homeChs}
            </div>
            <div className={style.score}>
                {contestInfo.homeScore} - {contestInfo.awayScore}
            </div>
            <div className={`${style.awayTeam} ${style.team}`}>
                {contestInfo.awayChs}
                <div className={style.cards}>
                    {contestInfo.awayRed > 0 && (
                        <p className={`${style.redCard} ${style.card}`}>{contestInfo.awayRed}</p>
                    )}
                    {contestInfo.awayYellow > 0 && (
                        <p className={`${style.yellowCard} ${style.card}`}>
                            {contestInfo.awayYellow}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function TopArea({ contestInfo }: { contestInfo: ContestInfo }) {
    return (
        <div className={style.topArea}>
            <div className={style.left}>
                <div className={style.league} style={{ color: contestInfo.color }}>
                    {contestInfo.leagueChsShort}
                </div>
                <div className={style.time}>{contestInfo.matchTime}</div>
            </div>
            <div className={style.mid}>
                <div className={style.corner}>
                    <Image alt="flag" src={Flag} />{' '}
                    <span className={style.ratio}>{contestInfo.homeCorner}</span>
                </div>
                <div className={style.status}>
                    <GameStatus startTime={contestInfo.startTime} status={contestInfo.state} />
                </div>
                <div className={style.corner}>
                    <Image alt="flag" src={Flag} />{' '}
                    <span className={style.ratio}>{contestInfo.awayCorner}</span>
                </div>
            </div>
            <div className={style.video}>
                <Image alt="video" className={style.videoIcon} src={Video} />
            </div>
        </div>
    );
}

function GameCard({ matchId }: { matchId: number }) {
    const contestInfo = useContestListStore.use.contestInfo()[matchId];

    return (
        <li className={style.gameCard}>
            <TopArea contestInfo={contestInfo} />
            <TeamInfo contestInfo={contestInfo} />
            <OddsInfo contestInfo={contestInfo} />
            {/* <ExtraInfo contestInfo={contestInfo} /> */}
        </li>
    );
}

export default GameCard;

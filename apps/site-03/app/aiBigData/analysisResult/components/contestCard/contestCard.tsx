import Link from 'next/link';
import { handleGameTime, timestampToString } from 'lib';
import type { GetFootballStatsMatch } from 'data-center';
import style from './contestCard.module.scss';
import CornerIcon from './img/corner.svg';

function ContestCard({ match }: { match: GetFootballStatsMatch }) {
    return (
        <Link href={`/football/${match.matchId}/analyze`}>
            <div className={`contestList ${style.contestList}`}>
                <div className={style.gameDetail}>
                    <div className={style.leftInfo}>
                        <div className={style.leagueShort} style={{ color: match.color }}>
                            {match.leagueChsShort}
                        </div>
                        <div className={style.timeDetail}>
                            <div className={style.time}>
                                {timestampToString(match.matchTime, 'YYYY-MM-DD')}
                            </div>
                        </div>
                    </div>
                    <div className={style.state}>
                        {handleGameTime(match.startTime, match.state).text}
                    </div>
                    <div className={style.rightInfo}>
                        <div className={style.halfScore}>
                            {match.homeHalfScore}-{match.awayHalfScore}
                        </div>
                        <div className={style.corner}>
                            <CornerIcon />
                            {match.homeCorner}-{match.awayCorner}
                        </div>
                    </div>
                </div>
                <div className={style.teamDetail}>
                    <div className={`${style.team} ${style.home}`}>
                        {match.homeRed ? (
                            <div className={`${style.card} ${style.redCard}`}>{match.homeRed}</div>
                        ) : null}
                        {match.homeYellow ? (
                            <div className={`${style.card} ${style.yellowCard}`}>
                                {match.homeYellow}
                            </div>
                        ) : null}

                        <div className={style.name}>{match.homeChs}</div>
                    </div>
                    <div className={style.contest}>
                        <span className={`${style.status} ${style.ing}`}>
                            {match.homeScore}-{match.awayScore}
                        </span>
                    </div>
                    <div className={`${style.team} ${style.away}`}>
                        <div className={style.name}>{match.awayChs}</div>
                        {match.awayYellow ? (
                            <div className={`${style.card} ${style.yellowCard}`}>
                                {match.awayYellow}
                            </div>
                        ) : null}
                        {match.awayRed ? (
                            <div className={`${style.card} ${style.redCard}`}>{match.awayRed}</div>
                        ) : null}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ContestCard;

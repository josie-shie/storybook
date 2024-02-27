'use client';

import type { MatchScheduleInfo } from 'data-center';
import { timestampToString, daysFromToday } from 'lib';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import { useDataStore } from '@/app/football/[matchId]/dataDetailStore';
import TeamLogo from '@/components/teamLogo/teamLogo';
import style from './matchSchedule.module.scss';

function ScheduleTable({
    thisMatchId,
    thisMatchTime,
    matchList,
    teamName,
    teamLogo
}: {
    thisMatchId: number;
    thisMatchTime: number;
    matchList: MatchScheduleInfo[];
    teamName: string;
    teamLogo: string;
}) {
    return (
        <div className={style.scheduleTable}>
            <div className={style.teamInfo}>
                <TeamLogo
                    alt={teamName}
                    className={style.teamLogo}
                    height={24}
                    src={teamLogo}
                    width={24}
                />
                <p className={style.teamName}>{teamName}</p>
            </div>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">日期/赛事</div>
                        <div className="th">
                            <p>主队</p>
                            <p>比分</p>
                            <p>客队</p>
                        </div>
                        <div className="th">相隔</div>
                    </div>
                </div>
                <div className="tableBody">
                    {matchList.length > 0 &&
                        matchList.map((match, idx) => (
                            <div
                                className={`tr ${match.matchId === thisMatchId && 'thisMatch'}`}
                                key={`${match.matchId}${idx.toString()}`}
                            >
                                <div className="td">
                                    <p>{timestampToString(match.matchTime, 'YYYY/MM/DD')}</p>
                                    <p>{match.leagueChs}</p>
                                </div>
                                <div className="td">
                                    <p className={`homeName `}>{match.homeChs}</p>
                                    <p className="scoreBox">
                                        {match.status === -1
                                            ? `${match.homeScore}-${match.awayScore}`
                                            : 'VS'}
                                    </p>
                                    <p className="awayName">{match.awayChs}</p>
                                </div>
                                <div className="td">
                                    {match.matchId === thisMatchId
                                        ? '本场'
                                        : daysFromToday(match.matchTime, thisMatchTime)}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

function MatchSchedule() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const recentMatchSchedule = useDataStore.use.recentMatchSchedule();
    return (
        <div className={style.matchSchedule}>
            <div className="topBar">
                <h6 className="title">近期赛程</h6>
            </div>
            <ScheduleTable
                matchList={recentMatchSchedule.home}
                teamLogo={matchDetail.homeLogo}
                teamName={matchDetail.homeChs}
                thisMatchId={matchDetail.matchId}
                thisMatchTime={matchDetail.matchTime}
            />
            <ScheduleTable
                matchList={recentMatchSchedule.away}
                teamLogo={matchDetail.awayLogo}
                teamName={matchDetail.awayChs}
                thisMatchId={matchDetail.matchId}
                thisMatchTime={matchDetail.matchTime}
            />
        </div>
    );
}

export default MatchSchedule;

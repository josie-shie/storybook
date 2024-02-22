'use client';
import { useDataStore } from '@/app/football/[matchId]/dataDetailStore';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import TeamLogo from '@/components/teamLogo/teamLogo';
import style from './leaguePointsRank.module.scss';

function LeagueRankTables() {
    const leaguePointsRank = useDataStore.use.leaguePointsRank();

    return (
        <div className={style.leaguePointsRankDetail}>
            <div className="topBar">
                <h6 className="title">积分排名</h6>
            </div>
            {typeof leaguePointsRank !== 'undefined' && (
                <>
                    <LeagueRankTable isHome />
                    <LeagueRankTable isHome={false} />
                </>
            )}
        </div>
    );
}

function LeagueRankTable({ isHome }: { isHome: boolean }) {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const leaguePointsRank = useDataStore.use.leaguePointsRank();
    const leagueData = isHome ? leaguePointsRank.homeTeam : leaguePointsRank.awayTeam;

    const rows: { desc: string; target: 'total' | 'home' | 'away' | 'recent' }[] = [
        { desc: '总', target: 'total' },
        { desc: '主', target: 'home' },
        { desc: '客', target: 'away' },
        { desc: '近', target: 'recent' }
    ];

    return (
        <div className={style.leagueRankTables}>
            <div className={style.teamInfo}>
                <TeamLogo
                    alt={isHome ? matchDetail.homeChs : matchDetail.awayChs}
                    className={style.teamLogo}
                    height={24}
                    src={isHome ? matchDetail.homeLogo : matchDetail.awayLogo}
                    width={24}
                />
                <p className={style.teamName}>{matchDetail.leagueChsShort}</p>
            </div>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">
                            {isHome ? matchDetail.homeChs : matchDetail.awayChs}
                        </div>
                        <div className="th">赛</div>
                        <div className="th">胜/平/负</div>
                        <div className="th">进/失</div>
                        <div className="th">积分</div>
                        <div className="th">排名</div>
                    </div>
                </div>
                <div className="tableBody greyRow">
                    {rows.map(
                        (item, idx) =>
                            typeof leagueData[item.target] !== 'undefined' && (
                                <div className="tr" key={`league_rank_${idx.toString()}`}>
                                    <div className="td">{item.desc}</div>
                                    <div className="td">
                                        {leagueData[item.target].totalCount || '-'}
                                    </div>
                                    <div className="td">
                                        <p>
                                            {leagueData[item.target].winCount || '-'}/
                                            {leagueData[item.target].drawCount || '-'}/
                                            {leagueData[item.target].loseCount || '-'}
                                        </p>
                                    </div>
                                    <div className="td">
                                        <p>
                                            {leagueData[item.target].getScore || '-'}/
                                            {leagueData[item.target].loseScore || '-'}
                                        </p>
                                    </div>
                                    <div className="td">
                                        {leagueData[item.target].integral || '-'}
                                    </div>
                                    <div className={`td ${style.highlight}`}>
                                        {leagueData[item.target].rank || '-'}
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>
    );
}

export default LeagueRankTables;

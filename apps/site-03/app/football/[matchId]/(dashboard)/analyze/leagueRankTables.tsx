import type { LeaguePointsRank } from 'data-center';
import { useAnalyzeStore } from '../../analyzeStore';
import style from './leagueRankTables.module.scss';
import TableSkeleton from './components/tableSkeleton/tableSkeleton';

interface LeagueRankTableProps {
    teamName: string;
    tableData: LeaguePointsRank;
}

function LeagueRankTables() {
    const teamInfo = useAnalyzeStore.use.teamInfo();
    const leaguePointsRankData = useAnalyzeStore.use.leaguePointsRankData();

    return (
        <div className={style.leagueRankTables}>
            <div className="topBar">
                <h6 className="title">联赛积分排名</h6>
            </div>
            <LeagueRankTable
                tableData={leaguePointsRankData.homeTeam}
                teamName={teamInfo.homeChs || '-'}
            />
            <LeagueRankTable
                tableData={leaguePointsRankData.awayTeam}
                teamName={teamInfo.awayChs || '-'}
            />
        </div>
    );
}

function LeagueRankTable({ teamName, tableData }: LeagueRankTableProps) {
    const loading = useAnalyzeStore.use.leaguePointsRankLoading();
    const rows = [
        { desc: '总', ...tableData.total },
        { desc: '主', ...tableData.home },
        { desc: '客', ...tableData.away },
        { desc: '近', ...tableData.recent }
    ];

    return (
        <div className={style.leagueRankTables}>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th teamName">{loading ? null : teamName}</div>
                    </div>
                </div>
                <div className="tableBody greyRow">
                    <div className="tr">
                        <div
                            className="td"
                            key="league_rank_title"
                            style={{ flex: 'initial', width: '45px' }}
                        >
                            全场
                        </div>
                        <div className="td">赛</div>
                        <div className="td">胜</div>
                        <div className="td">平</div>
                        <div className="td">负</div>
                        <div className="td">得</div>
                        <div className="td">失</div>
                        <div className="td">净</div>
                        <div className="td">积分</div>
                        <div className="td">排名</div>
                        <div className="td">胜率</div>
                    </div>
                    {loading ? (
                        <TableSkeleton rowNumber={3} />
                    ) : (
                        rows.map((item, idx) => (
                            <div className="tr" key={`league_rank_${idx.toString()}`}>
                                <div className="td" style={{ flex: 'initial', width: '45px' }}>
                                    {item.desc}
                                </div>
                                <div className="td">{item.totalCount || '-'}</div>
                                <div className="td">{item.winCount || '-'}</div>
                                <div className="td">{item.drawCount || '-'}</div>
                                <div className="td">{item.loseCount || '-'}</div>
                                <div className="td">{item.getScore || '-'}</div>
                                <div className="td">{item.loseScore || '-'}</div>
                                <div className="td">{item.goalDifference || '-'}</div>
                                <div className={`td ${style.highlight}`}>
                                    {item.integral || '-'}
                                </div>
                                <div className="td">{item.rank || '-'}</div>
                                <div className={`td ${style.highlight}`}>
                                    {item.winRate ? `${item.winRate}%` : '-'}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default LeagueRankTables;

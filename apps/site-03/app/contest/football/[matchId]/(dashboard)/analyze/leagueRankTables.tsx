import { useAnalyzeStore } from './analyzeStore';
import style from './leagueRankTables.module.scss';

interface LeagueRankTableProps {
    teamName: string;
}

function LeagueRankTables() {
    const teamInfo = useAnalyzeStore.use.teamInfo();

    return (
        <div className={style.leagueRankTables}>
            <div className="topBar">
                <h6 className="title">联赛积分排名</h6>
            </div>
            <LeagueRankTable teamName={teamInfo.homeChs || '-'} />
            <LeagueRankTable teamName={teamInfo.awayChs || '-'} />
        </div>
    );
}

function LeagueRankTable({ teamName }: LeagueRankTableProps) {
    const rows = [
        { desc: '总', qty: '-', unit: '-' },
        { desc: '主', qty: '-', unit: '-' },
        { desc: '客', qty: '-', unit: '-' },
        { desc: '近', qty: '-', unit: '-' }
    ];
    return (
        <div className={style.leagueRankTable}>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">{teamName}</div>
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
                    {rows.map((item, idx) => (
                        <div className="tr" key={`league_rank_${idx.toString()}`}>
                            <div className="td" style={{ flex: 'initial', width: '45px' }}>
                                {item.desc}
                            </div>
                            <div className="td">{item.qty}</div>
                            <div className="td">{item.unit}</div>
                            <div className="td">{item.unit}</div>
                            <div className="td">{item.unit}</div>
                            <div className="td">{item.unit}</div>
                            <div className="td">{item.unit}</div>
                            <div className="td">{item.unit}</div>
                            <div className="td">{item.unit}</div>
                            <div className="td">{item.unit}</div>
                            <div className="td">{item.unit}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LeagueRankTables;

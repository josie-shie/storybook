import { useAnalyzeStore } from '../../analyzeStore';
import style from './winLoseCountTable.module.scss';

function WinLoseCountTable() {
    const tableData = useAnalyzeStore.use.winLoseCountData();

    const totalCount = tableData.totalCount;

    const totalCountNumber =
        totalCount.awayAway + totalCount.awayHome + totalCount.homeAway + totalCount.homeHome;

    return (
        <div className={style.winLoseCountTable}>
            <div className="topBar">
                <h6 className="title">半场/全场胜负统计(近两赛季)</h6>
            </div>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">{`主场${
                            isNaN(totalCount.homeHome) ? '' : `(${totalCount.homeHome})`
                        }`}</div>
                        <div className="th">{`客场${
                            isNaN(totalCount.homeAway) ? '' : `(${totalCount.homeAway})`
                        }`}</div>
                        <div className="th" />
                        <div className="th">{`主场${
                            isNaN(totalCount.awayHome) ? '' : `(${totalCount.awayHome})`
                        }`}</div>
                        <div className="th">{`客场${
                            isNaN(totalCount.awayAway) ? '' : `(${totalCount.awayAway})`
                        }`}</div>
                    </div>
                </div>
                <div className="tableBody">
                    {totalCountNumber > 0 ? (
                        tableData.data.map(item => (
                            <div className="tr" key={`league_rank_${item.label}`}>
                                <div className="td">{item.homeHome || '-'}</div>
                                <div className="td">{item.homeAway || '-'}</div>
                                <div className="td">{item.name}</div>
                                <div className="td">{item.awayHome || '-'}</div>
                                <div className="td">{item.awayAway || '-'}</div>
                            </div>
                        ))
                    ) : (
                        <div className="tr" key="league_rank_default">
                            <div className="td">-</div>
                            <div className="td">-</div>
                            <div className="td">-</div>
                            <div className="td">-</div>
                            <div className="td">-</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WinLoseCountTable;

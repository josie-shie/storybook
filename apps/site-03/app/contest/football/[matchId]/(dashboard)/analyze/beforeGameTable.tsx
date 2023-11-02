'use client';
import style from './beforeGameTable.module.scss';
import { useAnalyzeStore } from './analyzeStore';

const compareValueStyle = (a: number, b: number) => {
    if (a === b) {
        return '';
    }
    if (a > b) {
        return 'greenText';
    }
    if (a < b) {
        return 'redText';
    }
};

function BeforeGameTable() {
    const companyDetailAnalyze = useAnalyzeStore.use.companyDetailAnalyze();
    return (
        <div className={style.beforeGameTable}>
            <div className="topBar">
                <h6 className="title">赛前指数</h6>
            </div>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th" />
                        <div className="th">初</div>
                        <div className="th">封</div>
                    </div>
                </div>
                <div className="tableBody">
                    {companyDetailAnalyze.map((item, idx) => (
                        <div className="tr" key={`technic_${idx.toString()}`}>
                            <div className="td">{item.label}</div>
                            <div className="td" style={{ display: 'flex' }}>
                                <div className="tableCell">{item.initHome || '-'}</div>
                                <div className="tableCell redText">{item.init || '-'}</div>
                                <div className="tableCell">{item.initAway || '-'}</div>
                            </div>
                            <div className="td">
                                <div
                                    className={`tableCell ${compareValueStyle(
                                        item.initHome,
                                        item.currentHome
                                    )}`}
                                >
                                    {item.currentHome || '-'}
                                </div>
                                <div
                                    className={`tableCell ${compareValueStyle(
                                        item.init,
                                        item.current
                                    )}`}
                                >
                                    {item.current || '-'}
                                </div>
                                <div
                                    className={`tableCell ${compareValueStyle(
                                        item.initAway,
                                        item.currentAway
                                    )}`}
                                >
                                    {item.currentAway || '-'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BeforeGameTable;

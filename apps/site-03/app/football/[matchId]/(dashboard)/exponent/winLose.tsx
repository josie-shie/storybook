import { useContestDetailStore } from '../../contestDetailStore';
import { useExponentStore } from '../../exponentStore';
import style from './exponent.module.scss';

const getOddsClassName = (initialOdds: number, currentOdds: number): string => {
    if (initialOdds === currentOdds) return '';
    return initialOdds > currentOdds ? 'greenText' : 'redText';
};

function NoData() {
    return (
        <div className={style.handicap}>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">公司</div>
                        <div className="th" />
                        <div className="th">主胜</div>
                        <div className="th">平局</div>
                        <div className="th">客胜</div>
                    </div>
                </div>
                <div className="tableBody">
                    <div className="tr">
                        <div className="td" style={{ width: '100%' }}>
                            暂无数据
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Victory() {
    const exponentData = useExponentStore.use.exponentData();
    const totalGoalsRadio = useExponentStore.use.totalGoalsRadio();
    const companyNameMap = useContestDetailStore.use.companyNameMap();

    const dataList = exponentData?.winLoseData[totalGoalsRadio];

    if (!dataList || dataList.list.length === 0) return <NoData />;

    return (
        <div className={style.winLose}>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">公司</div>
                        <div className="th" />
                        <div className="th">主勝</div>
                        <div className="th">平局</div>
                        <div className="th">客勝</div>
                    </div>
                </div>
                <div className="tableBody">
                    {dataList.list.map(companyId => (
                        <div className="company" key={companyId}>
                            <div className="tr">
                                <div className="td">{companyNameMap[companyId]}</div>
                                <div className="td">初</div>
                                <div className="td">{dataList.info[companyId].initialHomeOdds}</div>
                                <div className="td">{dataList.info[companyId].initialDrawOdds}</div>
                                <div className="td">{dataList.info[companyId].initialAwayOdds}</div>
                            </div>
                            <div className="tr">
                                <div className="td" />
                                <div className="td">即</div>
                                <div
                                    className={`td ${getOddsClassName(
                                        dataList.info[companyId].initialHomeOdds,
                                        dataList.info[companyId].currentHomeOdds
                                    )}`}
                                >
                                    {dataList.info[companyId].currentHomeOdds}
                                </div>
                                <div
                                    className={`td ${getOddsClassName(
                                        dataList.info[companyId].initialDrawOdds,
                                        dataList.info[companyId].currentDrawOdds
                                    )}`}
                                >
                                    {dataList.info[companyId].currentDrawOdds}
                                </div>
                                <div
                                    className={`td ${getOddsClassName(
                                        dataList.info[companyId].initialDrawOdds,
                                        dataList.info[companyId].initialAwayOdds
                                    )}`}
                                >
                                    {dataList.info[companyId].currentAwayOdds}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Victory;

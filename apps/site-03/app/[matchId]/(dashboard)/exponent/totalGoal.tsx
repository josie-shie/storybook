import { handicapToString } from 'lib';
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
                        <div className="th">初</div>
                        <div className="th">即</div>
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

function TotalGoal() {
    const exponentData = useExponentStore.use.exponentData();
    const totalGoalsRadio = useExponentStore.use.totalGoalsRadio();
    const companyNameMap = useContestDetailStore.use.companyNameMap();

    const dataList = exponentData?.totalGoalData[totalGoalsRadio];

    if (!dataList || dataList.list.length === 0) return <NoData />;

    return (
        <div className={style.totalGoal}>
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">公司</div>
                        <div className="th">初</div>
                        <div className="th">即</div>
                    </div>
                </div>
                <div className="tableBody">
                    {dataList.list.map(companyId => (
                        <div className="tr" key={companyId}>
                            <div className="td">{companyNameMap[companyId]}</div>
                            <div className="td">
                                {(dataList.info[companyId].overInitialOdds, 2)}
                            </div>
                            <div className="td">
                                {handicapToString(dataList.info[companyId].initialHandicap)}
                            </div>
                            <div className="td">{dataList.info[companyId].underInitialOdds}</div>
                            <div
                                className={`td ${getOddsClassName(
                                    dataList.info[companyId].overInitialOdds,
                                    dataList.info[companyId].overCurrentOdds
                                )}`}
                            >
                                {dataList.info[companyId].overCurrentOdds}
                            </div>
                            <div
                                className={`td ${getOddsClassName(
                                    dataList.info[companyId].overInitialOdds,
                                    dataList.info[companyId].initialHandicap
                                )}`}
                            >
                                {handicapToString(dataList.info[companyId].currentHandicap)}
                            </div>
                            <div
                                className={`td ${getOddsClassName(
                                    dataList.info[companyId].overInitialOdds,
                                    dataList.info[companyId].underInitialOdds
                                )}`}
                            >
                                {dataList.info[companyId].underCurrentOdds}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TotalGoal;

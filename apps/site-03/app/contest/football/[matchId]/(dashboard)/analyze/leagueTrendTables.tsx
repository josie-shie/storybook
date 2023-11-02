'use client';
import type { HomeTrend } from 'data-center';
import style from './leagueTrendTables.module.scss';
import { useAnalyzeStore } from './analyzeStore';

const getStyleResult = (char: string) => {
    if (char === '输' || char === '小') {
        return 'greenText';
    }
    if (char === '走') {
        return 'blueText';
    }
    if (char === '赢' || char === '大') {
        return 'redText';
    }
};

const lastSixResultFullTime = {
    name: '',
    played: 0,
    handicapResult: '赢输赢输赢输',
    handicapWinRate: 0,
    overUnderResult: '大小大小大小'
};

// const teamMapping = {
//     totalFullTime: '总',
//     homeFullTime: '主',
//     awayFullTime: '客'
// }

// 全场 赛 胜 平 负 得 失 净 积分 排名 胜率
function LeagueTrendTable({
    leagueTrendData,
    teamName
}: {
    leagueTrendData: HomeTrend[];
    teamName?: string;
}) {
    if (JSON.stringify(leagueTrendData) === '{}') {
        return <div>無資料</div>;
    }

    return (
        <div className="dataTable">
            <div className="tableHead">
                <div className="tr">
                    <div className="th">{teamName || '-'}</div>
                </div>
            </div>
            <div className="tableBody greyRow">
                <div className="tr">
                    <div className="td" style={{ flex: 'initial', width: '45px' }}>
                        全场
                    </div>
                    <div className="td">赛</div>
                    <div className="td">走水</div>
                    <div className="td">输</div>
                    <div className="td">赢%</div>
                    <div className="td">大</div>
                    <div className="td">大%</div>
                    <div className="td">小</div>
                    <div className="td">小%</div>
                </div>
                {leagueTrendData.map((item, idx) => (
                    <div className="tr" key={`league_rank_${idx.toString()}`}>
                        <div className="td" style={{ flex: 'initial', width: '45px' }}>
                            {/* {teamMapping[item.label]} */}
                        </div>
                        <div className="td">{item.played}</div>
                        <div className="td">{item.handicapDraw}</div>
                        <div className="td">{item.handicapLose}</div>
                        <div className="td">{`${item.handicapWinRate}%`}</div>
                        <div className="td">{item.overUnderOver}</div>
                        <div className="td">{`${item.overUnderOverRate}%`}</div>
                        <div className="td">{item.overUnderUnder}</div>
                        <div className="td">{`${item.overUnderUnderRate}%`}</div>
                    </div>
                ))}
                <div className="tr" key="league_rank_bottom">
                    <div className="td" style={{ flex: 'initial', width: '45px' }}>
                        近6
                    </div>
                    <div className="td" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {lastSixResultFullTime.handicapResult.length > 0
                            ? lastSixResultFullTime.handicapResult.split('').map((char, index) => {
                                  return (
                                      <span
                                          className={getStyleResult(char)}
                                          key={`handicap_${index.toString()}`}
                                      >
                                          {char}
                                      </span>
                                  );
                              })
                            : '-'}
                    </div>
                    <div className="td" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {lastSixResultFullTime.overUnderResult.length > 0
                            ? lastSixResultFullTime.overUnderResult.split('').map((char, index) => {
                                  return (
                                      <span
                                          className={getStyleResult(char)}
                                          key={`overUnder_${index.toString()}`}
                                      >
                                          {char}
                                      </span>
                                  );
                              })
                            : '-'}
                    </div>
                </div>
            </div>
        </div>
    );
}

function LeagueTrendTables() {
    const leagueTrendData = useAnalyzeStore.use.leagueTrendData();
    const teamInfo = useAnalyzeStore.use.teamInfo();

    if (JSON.stringify(leagueTrendData) === '{}') {
        return <div>沒有資料</div>;
    }
    return (
        <div className={style.leagueTrendTableContainer}>
            <div className="topBar">
                <h6 className="title">联赛走勢</h6>
            </div>
            <div className={style.leagueTrendTables}>
                <LeagueTrendTable
                    leagueTrendData={leagueTrendData.homeTrendList}
                    teamName={teamInfo.homeChs || '-'}
                />
                <LeagueTrendTable
                    leagueTrendData={leagueTrendData.awayTrendList}
                    teamName={teamInfo.awayChs || '-'}
                />
            </div>
        </div>
    );
}

export default LeagueTrendTables;

'use client';
import type { HomeTrend } from 'data-center';
import { useAnalyzeStore } from '../../analyzeStore';
import style from './leagueTrendTables.module.scss';
import TableSkeleton from './components/tableSkeleton/tableSkeleton';

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

const teamMapping = {
    totalFullTime: '总',
    homeFullTime: '主',
    awayFullTime: '客'
};

// 全场 赛 胜 平 负 得 失 净 积分 排名 胜率
function LeagueTrendTable({
    leagueTrendData,
    teamName,
    teamResult
}: {
    leagueTrendData: HomeTrend[];
    teamName?: string;
    teamResult: { handicap: string; overUnder: string };
}) {
    const loading = useAnalyzeStore.use.analysisDataLoading();
    if (!Object.keys(leagueTrendData).length) {
        return <div>無資料</div>;
    }

    return (
        <div className="dataTable">
            <div className="tableHead">
                <div className="tr">
                    <div className="th teamName">{loading ? null : teamName || '-'}</div>
                </div>
            </div>
            <div className="tableBody greyRow">
                <div className="tr">
                    <div className="td" style={{ flex: 'initial', width: '45px' }}>
                        全场
                    </div>
                    <div className="td">赢</div>
                    <div className="td">走水</div>
                    <div className="td">输</div>
                    <div className="td">赢%</div>
                    <div className="td">大</div>
                    <div className="td">大%</div>
                    <div className="td">小</div>
                    <div className="td">小%</div>
                </div>
                {loading ? (
                    <TableSkeleton rowNumber={4} />
                ) : (
                    <>
                        {leagueTrendData.map((item, idx) => (
                            <div className="tr" key={`league_rank_${idx.toString()}`}>
                                <div className="td" style={{ flex: 'initial', width: '45px' }}>
                                    {teamMapping[item.label]}
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
                            <div
                                className="td"
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                {teamResult.handicap.length > 0
                                    ? teamResult.handicap.split('').map((char, index) => {
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
                            <div
                                className="td"
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                {teamResult.overUnder.length > 0
                                    ? teamResult.overUnder.split('').map((char, index) => {
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
                    </>
                )}
            </div>
        </div>
    );
}

function LeagueTrendTables() {
    const leagueTrendData = useAnalyzeStore.use.leagueTrendData();
    const teamInfo = useAnalyzeStore.use.teamInfo();

    if (!Object.keys(leagueTrendData).length) {
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
                    teamResult={leagueTrendData.homeResult}
                />
                <LeagueTrendTable
                    leagueTrendData={leagueTrendData.awayTrendList}
                    teamName={teamInfo.awayChs || '-'}
                    teamResult={leagueTrendData.awayResult}
                />
            </div>
        </div>
    );
}

export default LeagueTrendTables;

'use client';
import style from './leagueTrendTables.module.scss';
import { useAnalyzeStore } from './analyzeStore';
import type { HomeAwayOdds } from '@/types/analyze';

interface Rows {
    name: string;
    label: 'totalFullTime' | 'homeFullTime' | 'awayFullTime';
}

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

// 全场 赛 胜 平 负 得 失 净 积分 排名 胜率
function LeagueTrendTable({
    leagueTrendData,
    teamName
}: {
    leagueTrendData: HomeAwayOdds;
    teamName?: string;
}) {
    const rows: Rows[] = [
        { name: '总', label: 'totalFullTime' },
        { name: '主', label: 'homeFullTime' },
        { name: '客', label: 'awayFullTime' }
    ];

    const rowsData = rows.map(item => {
        return {
            ...item,
            played: leagueTrendData[item.label].played,
            handicapDraw: leagueTrendData[item.label].handicapDraw,
            handicapLose: leagueTrendData[item.label].handicapLose,
            handicapWinRate: leagueTrendData[item.label].HandicapWinRate,
            overUnderOver: leagueTrendData[item.label].overUnderOver,
            overUnderOverRate: leagueTrendData[item.label].overUnderOverRate,
            overUnderUnder: leagueTrendData[item.label].overUnderUnder,
            overUnderUnderRate: leagueTrendData[item.label].overUnderUnderRate
        };
    });

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
                {rowsData.map((item, idx) => (
                    <div className="tr" key={`league_rank_${idx.toString()}`}>
                        <div className="td" style={{ flex: 'initial', width: '45px' }}>
                            {item.name}
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
                        {leagueTrendData.lastSixResultFullTime.handicapResult.length > 0
                            ? leagueTrendData.lastSixResultFullTime.handicapResult
                                  .split('')
                                  .map((char, index) => {
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
                        {leagueTrendData.lastSixResultFullTime.overUnderResult.length > 0
                            ? leagueTrendData.lastSixResultFullTime.overUnderResult
                                  .split('')
                                  .map((char, index) => {
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
    const matchTeamName = {
        homeEn: 'KA Akureyri',
        homeChs: 'KA阿古雷利',
        homeCht: '阿古雷利',
        awayEn: 'Breidablik',
        awayChs: '贝雷达比历克',
        awayCht: '比達比歷',
        homeId: 1639,
        awayId: 4052
    };
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
                    leagueTrendData={leagueTrendData.homeOdds}
                    teamName={matchTeamName.homeChs || '-'}
                />
                <LeagueTrendTable
                    leagueTrendData={leagueTrendData.awayOdds}
                    teamName={matchTeamName.awayChs || '-'}
                />
            </div>
        </div>
    );
}

export default LeagueTrendTables;

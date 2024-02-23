'use client';
import { getRecentBattleMatch } from 'data-center';
import type { RecentMatch, RecentMatchDashboardInfo } from 'data-center';
import { timestampToString, formatNumberWithPercent, handicapToString } from 'lib';
import { useEffect, useState } from 'react';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import TeamLogo from '@/components/teamLogo/teamLogo';
import { useDataStore } from '@/app/football/[matchId]/dataDetailStore';
import SameOptionBar from '../components/sameOptionBar';
import MatchCountOptionBar from '../components/matchCountOptionBar';
import style from './teamHistoryBattle.module.scss';

enum ResultName {
    Lose = 'lose',
    Minus = 'minus',
    Win = 'win',
    Victory = 'victory',
    Go = 'go',
    Tie = 'tie',
    Goal = 'goal',
    Miss = 'miss',
    Big = 'big',
    Small = 'small'
}

const resultNameMap = {
    [ResultName.Lose]: '输',
    [ResultName.Minus]: '负',
    [ResultName.Win]: '赢',
    [ResultName.Victory]: '胜',
    [ResultName.Go]: '走',
    [ResultName.Tie]: '平',
    [ResultName.Goal]: '进',
    [ResultName.Miss]: '失',
    [ResultName.Big]: '大',
    [ResultName.Small]: '小'
};

function DashboardCard({ title, rate, details }) {
    return (
        <div className={style.dashboardCard}>
            <p className={style.rateBox}>
                {title}
                <span className={style.rate}>
                    {rate}
                    {title !== '进失' && '%'}
                </span>
            </p>
            <p className={style.totalBox}>{details}</p>
        </div>
    );
}

function Dashboard({ dashboard, count }: { dashboard: RecentMatchDashboardInfo; count: number }) {
    const { goalMissRate, victoryMinusRate, winLoseRate, bigSmallRate } = dashboard;
    return (
        <div className={style.dashboard}>
            <div className={style.countBox}>
                <p className={style.text}>近</p>
                <p className={style.count}>{count}场</p>
            </div>
            <DashboardCard
                details={`进${goalMissRate.goal}失${goalMissRate.miss}`}
                rate={goalMissRate.goal + goalMissRate.miss}
                title="进失"
            />
            <DashboardCard
                details={`${victoryMinusRate.victory}胜${victoryMinusRate.tie}平${victoryMinusRate.minus}负`}
                rate={formatNumberWithPercent(victoryMinusRate.victory, count)}
                title="胜率"
            />
            <DashboardCard
                details={`${winLoseRate.win}赢${winLoseRate.go}走${winLoseRate.lose}输`}
                rate={formatNumberWithPercent(winLoseRate.win, count)}
                title="赢率"
            />
            <DashboardCard
                details={`${bigSmallRate.big}大${bigSmallRate.go}走${bigSmallRate.small}小`}
                rate={formatNumberWithPercent(bigSmallRate.big, count)}
                title="大率"
            />
        </div>
    );
}

function TableHead() {
    return (
        <div className="tableHead">
            <div className="tr">
                <div className="th">日期/赛事</div>
                <div className="th">
                    <p>主队</p>
                    <p>比分</p>
                    <p>客队</p>
                </div>
                <div className="th">走势</div>
                <div className="th">进球</div>
                <div className="th">角球</div>
            </div>
        </div>
    );
}

function TableRow({ match, homeName }: { match: RecentMatch; homeName: string }) {
    return (
        <div className="tr">
            <div className="td">
                <p>{timestampToString(match.matchTime, 'YYYY/MM/DD')}</p>
                <p>{match.leagueChs}</p>
            </div>
            <div className="td">
                <p className={`homeName ${match.homeChs === homeName && 'isHome'}`}>
                    {match.homeChs}
                </p>
                <p className="scoreBox">
                    <span className={`score ${match.matchResult}`}>
                        {match.homeScore}-{match.awayScore}
                    </span>
                    <span className="halfScore">
                        ({match.homeHalfScore}-{match.awayHalfScore})
                    </span>
                </p>
                <p className={`awayName ${match.awayChs === homeName && 'isHome'}`}>
                    {match.awayChs}
                </p>
            </div>
            <div className={`td ${match.handicapResult}`}>
                <p>{handicapToString(match.handicapInit)}</p>
                <p>{resultNameMap[match.handicapResult as ResultName]}</p>
            </div>
            <div className={`td ${match.overUnderResult}`}>
                <p>{match.overUnderInit}</p>
                <p>{resultNameMap[match.overUnderResult as ResultName]}</p>
            </div>
            <div className="td">{match.homeCorner + match.awayCorner}</div>
        </div>
    );
}

function BattleHistory() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const matchOption = useDataStore.use.recentBattleMatchOption();
    const matchList = useDataStore.use.recentBattleMatch().matchList;
    const dashboard = useDataStore.use.recentBattleMatch().dashboard;
    const setRecentBattleMatchOption = useDataStore.use.setRecentBattleMatchOption();
    const setRecentBattleMatch = useDataStore.use.setRecentBattleMatch();
    const { matchId, homeId } = matchDetail;
    const { leagueId, homeAway, dataCount } = matchOption;
    const [secondRender, setSecondRender] = useState(false);

    const handleOptionChange = (
        target: 'homeAway' | 'leagueId' | 'dataCount',
        newValue: number
    ) => {
        setRecentBattleMatchOption({ target, newValue });
    };

    const fetchRecentMatchData = async () => {
        const res = await getRecentBattleMatch({
            matchId,
            homeId,
            leagueId,
            homeAway,
            dataCount
        });
        if (res.success) {
            setRecentBattleMatch({ recentBattleMatch: res.data });
        }
    };

    useEffect(() => {
        if (secondRender) {
            void fetchRecentMatchData();
        } else {
            setSecondRender(true);
        }
    }, [leagueId, homeAway, dataCount]);

    return (
        <>
            <div className={style.option}>
                <TeamLogo
                    alt={matchDetail.homeChs}
                    className={style.teamLogo}
                    height={28}
                    src={matchDetail.homeLogo}
                    width={28}
                />
                <SameOptionBar
                    league={leagueId}
                    leagueActiveValue={matchDetail.leagueId}
                    setLeague={newLeague => {
                        handleOptionChange('leagueId', newLeague);
                    }}
                    setTeam={newTeam => {
                        handleOptionChange('homeAway', newTeam);
                    }}
                    team={homeAway}
                    teamActiveValue={1}
                />
                <div className={style.full}>
                    <MatchCountOptionBar
                        count={dataCount}
                        option={[6, 10, 20]}
                        setCount={newCount => {
                            handleOptionChange('dataCount', newCount);
                        }}
                    />
                </div>
            </div>
            <Dashboard count={matchList.length} dashboard={dashboard} />
            <div className="dataTable">
                <TableHead />
                <div className="tableBody">
                    {matchList.length > 0 &&
                        matchList.map((match, idx) => (
                            <TableRow
                                homeName={matchDetail.homeChs}
                                key={`${match.matchId}${idx.toString()}`}
                                match={match}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}

function TeamMatchHistoryDetail() {
    const matchList = useDataStore.use.recentBattleMatch().matchList;

    if (typeof matchList === 'undefined' || matchList.length === 0) return null;

    return (
        <div className={style.teamMatchHistoryDetail}>
            <div className="topBar">
                <h6 className="title">历史交锋</h6>
            </div>
            <BattleHistory />
        </div>
    );
}

export default TeamMatchHistoryDetail;

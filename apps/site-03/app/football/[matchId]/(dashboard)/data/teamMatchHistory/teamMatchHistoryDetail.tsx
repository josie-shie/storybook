'use client';
import { getRecentMatchData } from 'data-center';
import type { RecentMatch, RecentMatchDashboardInfo } from 'data-center';
import { timestampToString, formatNumberWithPercent, handicapToString } from 'lib';
import { useEffect, useState } from 'react';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import TeamLogo from '@/components/teamLogo/teamLogo';
import { useDataStore } from '@/app/football/[matchId]/dataDetailStore';
import SameOptionBar from '../components/sameOptionBar';
import MatchCountOptionBar from '../components/matchCountOptionBar';
import style from './teamMatchHistory.module.scss';

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
                <p>{handicapToString(match.handicapCurrent)}</p>
                <p>{resultNameMap[match.handicapResult as ResultName]}</p>
            </div>
            <div className={`td ${match.overUnderResult}`}>
                <p>{match.overUnderCurrent}</p>
                <p>{resultNameMap[match.overUnderResult as ResultName]}</p>
            </div>
            <div className="td">{match.homeCorner + match.awayCorner}</div>
        </div>
    );
}

function HomeHistory() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const homeOption = useDataStore.use.recentMatchOption().homeOption;
    const homeMatch = useDataStore.use.recentMatchData().homeMatch;
    const dashboard = useDataStore.use.recentMatchData().dashboard.home;
    const setRecentMatchOption = useDataStore.use.setRecentMatchOption();
    const setRecentMatchData = useDataStore.use.setRecentMatchData();
    const { matchId, homeId, awayId } = matchDetail;
    const { leagueId, homeAway, dataCount } = homeOption;
    const [secondRender, setSecondRender] = useState(false);

    const handleOptionChange = (
        target: 'homeAway' | 'leagueId' | 'dataCount',
        newValue: number
    ) => {
        setRecentMatchOption({ team: 'homeOption', target, newValue });
    };

    const fetchRecentMatchData = async () => {
        const res = await getRecentMatchData({
            matchId,
            homeId,
            awayId,
            leagueId,
            homeAway,
            dataCount
        });
        if (res.success) {
            setRecentMatchData({ target: 'home', matchData: res.data });
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
            <Dashboard count={dataCount} dashboard={dashboard} />
            <div className="dataTable">
                <TableHead />
                <div className="tableBody">
                    {homeMatch.length > 0 &&
                        homeMatch.map((match, idx) => (
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

function AwayHistory() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const awayOption = useDataStore.use.recentMatchOption().awayOption;
    const setRecentMatchOption = useDataStore.use.setRecentMatchOption();
    const awayMatch = useDataStore.use.recentMatchData().awayMatch;
    const dashboard = useDataStore.use.recentMatchData().dashboard.away;
    const setRecentMatchData = useDataStore.use.setRecentMatchData();
    const { matchId, homeId, awayId } = matchDetail;
    const { leagueId, homeAway, dataCount } = awayOption;
    const [secondRender, setSecondRender] = useState(false);

    const handleOptionChange = (
        target: 'homeAway' | 'leagueId' | 'dataCount',
        newValue: number
    ) => {
        setRecentMatchOption({ team: 'awayOption', target, newValue });
    };

    const fetchRecentMatchData = async () => {
        const res = await getRecentMatchData({
            matchId,
            homeId,
            awayId,
            leagueId,
            homeAway,
            dataCount
        });
        if (res.success) {
            setRecentMatchData({ target: 'away', matchData: res.data });
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
                    alt={matchDetail.awayChs}
                    className={style.teamLogo}
                    height={28}
                    src={matchDetail.awayLogo}
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
                    teamActiveValue={2}
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
            <Dashboard count={dataCount} dashboard={dashboard} />
            <div className="dataTable">
                <TableHead />
                <div className="tableBody">
                    {awayMatch.length > 0 &&
                        awayMatch.map((match, idx) => (
                            <TableRow
                                homeName={matchDetail.awayChs}
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
    return (
        <div className={style.teamMatchHistoryDetail}>
            <div className="topBar">
                <h6 className="title">近期战绩</h6>
            </div>
            <HomeHistory />
            <AwayHistory />
        </div>
    );
}

export default TeamMatchHistoryDetail;

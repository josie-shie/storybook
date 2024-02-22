'use client';
import { getBattleMatchCompare } from 'data-center';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import TeamLogo from '@/components/teamLogo/teamLogo';
import { useDataComparedStore } from '@/app/football/[matchId]/dataComparedStore';
import SameOptionBar from '../components/sameOptionBar';
import MatchCountOptionBar from '../components/matchCountOptionBar';
import style from './teamHistoryBattleCompared.module.scss';

function TeamHistoryBattleCompared() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const battleMatchCompare = useDataComparedStore.use.battleMatchCompare();
    const matchOption = useDataComparedStore.use.battleMatchCompareOption();
    const setBattleMatchCompareOption = useDataComparedStore.use.setBattleMatchCompareOption();
    const setBattleMatchCompare = useDataComparedStore.use.setBattleMatchCompare();
    const { leagueId, homeAway, dataCount } = matchOption;
    const [secondRender, setSecondRender] = useState(false);

    const handleOptionChange = (
        target: 'homeAway' | 'leagueId' | 'dataCount',
        newValue: number
    ) => {
        setBattleMatchCompareOption({ target, newValue });
    };

    const fetchRecentMatchData = async () => {
        const res = await getBattleMatchCompare({
            matchId: matchDetail.matchId,
            leagueId,
            homeAway,
            dataCount
        });
        if (res.success) {
            setBattleMatchCompare({ battleMatchCompare: res.data });
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
        <div className={style.teamHistoryBattleCompared}>
            <div className="topBar">
                <h6 className="title">历史交锋</h6>
            </div>
            <div className={style.option}>
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
            <div className={style.teamInfo}>
                <div className={`${style.team} ${style.home}`}>
                    <TeamLogo
                        alt={matchDetail.homeChs}
                        className={style.teamLogo}
                        height={24}
                        src={matchDetail.homeLogo}
                        width={24}
                    />
                    <p className={style.teamName}>{matchDetail.homeChs}</p>
                </div>
                <div className={`${style.team} ${style.away}`}>
                    <p className={style.teamName}>{matchDetail.awayChs}</p>
                    <TeamLogo
                        alt={matchDetail.awayChs}
                        className={style.teamLogo}
                        height={24}
                        src={matchDetail.awayLogo}
                        width={24}
                    />
                </div>
            </div>

            <div>
                <LinearProgress value={80} variant="determinate" />
            </div>

            <div className={style.pointChart}>
                <div className={style.pointCard}>
                    <div className={style.pointTop}>
                        <p className={style.title}>走势</p>
                        <p className={style.subTitle}>（近{dataCount}场，由近及远）</p>
                    </div>
                    <div className={style.pointBar}>
                        {battleMatchCompare.handicapTrend.map(
                            (point, idx) =>
                                point.length > 0 && (
                                    <div
                                        className={`${style.point} ${style[point]}`}
                                        key={`${point}_${idx.toString()}`}
                                    />
                                )
                        )}
                    </div>
                </div>
                <div className={style.pointCard}>
                    <div className={style.pointTop}>
                        <p className={style.title}>进球</p>
                        <p className={style.subTitle}>（近{dataCount}场，由近及远）</p>
                    </div>
                    <div className={style.pointBar}>
                        {battleMatchCompare.overUnderTrend.map(
                            (point, idx) =>
                                point.length > 0 && (
                                    <div
                                        className={`${style.point} ${style[point]}`}
                                        key={`${point}_${idx.toString()}`}
                                    />
                                )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamHistoryBattleCompared;

'use client';

import { useState, useEffect } from 'react';
import { getHalfFullWinCounts } from 'data-center';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import { useDataStore } from '@/app/football/[matchId]/dataDetailStore';
import TeamLogo from '@/components/teamLogo/teamLogo';
import SameOptionBar from '../components/sameOptionBar';
import MatchCountOptionBar from '../components/matchCountOptionBar';
import style from './halfFullWinLose.module.scss';

const typeList = [
    'victoryVictory',
    'victoryDraw',
    'victoryDefeat',
    'drawVictory',
    'drawDraw',
    'drawDefeat',
    'defeatVictory',
    'defeatDraw',
    'defeatDefeat'
];

const typeListMap = {
    victoryVictory: '胜胜',
    victoryDraw: '胜平',
    victoryDefeat: '胜负',
    drawVictory: '平胜',
    drawDraw: '平平',
    drawDefeat: '平负',
    defeatVictory: '负胜',
    defeatDraw: '负平',
    defeatDefeat: '负负'
};

const teamList = ['homeField', 'awayField', 'allField'];

type TeamListType = 'homeField' | 'awayField' | 'allField';

function HalfFullWinLose() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const halfFullWinCounts = useDataStore.use.halfFullWinCounts();
    const halfFullWinTotal = useDataStore.use.halfFullWinTotal();
    const setHalfFullWinCountsOption = useDataStore.use.setHalfFullWinCountsOption();
    const setHalfFullWinCounts = useDataStore.use.setHalfFullWinCounts();
    const setHalfFullWinTotal = useDataStore.use.setHalfFullWinTotal();
    const { leagueId, dataCount, homeAway } = useDataStore.use.halfFullWinCountsOption();
    const [secondRender, setSecondRender] = useState(false);

    const handleOptionChange = (
        target: 'homeAway' | 'leagueId' | 'dataCount',
        newValue: number
    ) => {
        setHalfFullWinCountsOption({ target, newValue });
    };

    const fetchRecentMatchData = async () => {
        const res = await getHalfFullWinCounts({
            matchId: matchDetail.matchId,
            leagueId,
            homeAway,
            dataCount
        });
        if (res.success) {
            setHalfFullWinCounts({ newValue: res.data.data });
            setHalfFullWinTotal({ newValue: res.data.total });
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
        <div className={style.matchSchedule}>
            <div className="topBar">
                <h6 className="title">半全场胜负</h6>
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
                        option={[10, 20]}
                        setCount={newCount => {
                            handleOptionChange('dataCount', newCount);
                        }}
                    />
                </div>
            </div>
            <div className={style.scheduleTable}>
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
                <div className="dataTable">
                    <div className="tableHead">
                        {typeof halfFullWinTotal !== 'undefined' && (
                            <div className="tr">
                                <div className="th">主({halfFullWinTotal.home.homeField})</div>
                                <div className="th">客({halfFullWinTotal.home.awayField})</div>
                                <div className="th">总({halfFullWinTotal.home.allField})</div>
                                <div className="th">全场</div>
                                <div className="th">主({halfFullWinTotal.away.homeField})</div>
                                <div className="th">客({halfFullWinTotal.away.awayField})</div>
                                <div className="th">总({halfFullWinTotal.away.allField})</div>
                            </div>
                        )}
                    </div>
                    <div className="tableBody">
                        <div className="tr">
                            {teamList.map((team: TeamListType) => (
                                <div className="td" key={`home_${team}`}>
                                    {typeof halfFullWinCounts !== 'undefined' &&
                                        typeList.map(type => (
                                            <div className="block" key={`home_${team}_${type}`}>
                                                {halfFullWinCounts.home[team][type]}
                                            </div>
                                        ))}
                                </div>
                            ))}
                            <div className="td">
                                {typeList.map(type => (
                                    <div className="block" key={`home_${type}`}>
                                        {typeListMap[type]}
                                    </div>
                                ))}
                            </div>
                            {teamList.map((team: TeamListType) => (
                                <div className="td" key={`home_${team}`}>
                                    {typeof halfFullWinCounts !== 'undefined' &&
                                        typeList.map(type => (
                                            <div className="block" key={`home_${team}_${type}`}>
                                                {halfFullWinCounts.away[team][type]}
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HalfFullWinLose;

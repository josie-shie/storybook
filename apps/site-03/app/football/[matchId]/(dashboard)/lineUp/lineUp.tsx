'use client';
import type { GetLineUpInfoResponse } from 'data-center';
import Image from 'next/image';
import NoData from '@/components/baseNoData/noData';
import TeamLogo from '@/components/teamLogo/teamLogo';
import { useContestDetailStore } from '../../contestDetailStore';
import Place from './img/place.svg';
import CocahIcon from './img/coachIcon.svg';
import CocahDefault from './img/coach.png';
import GroundBg from './img/groundBg.png';
import CourtTop from './img/courtTop.png';
import CourtBottom from './img/courtBottom.png';
import style from './lineUp.module.scss';
import Player from './player';
import PlayerList from './playerList';
import PlayerIconList from './playerIconList';

interface CoachInfoProps {
    coachName: string;
    coachLogo: string;
}

interface Team {
    coachNameZh?: string;
    coachNameZht?: string;
    coachNameEn?: string;
}

function CoachInfo({ coachName, coachLogo }: CoachInfoProps) {
    return (
        <div className={style.coach}>
            <Image
                alt=""
                className={style.cocahBg}
                height={32}
                src={coachLogo !== '0' ? coachLogo : CocahDefault.src}
                width={32}
            />
            <div className={style.info}>
                <div className={style.name}>{coachName}</div>
                <div className={style.work}>教练</div>
            </div>
        </div>
    );
}

function LineUp({ lineUpData }: { lineUpData: GetLineUpInfoResponse }) {
    const matchDetail = useContestDetailStore.use.matchDetail();

    const homeStarters = lineUpData.teams.home.players.filter(
        player => player.playerStatus === 'STARTER'
    );
    const awayStarters = lineUpData.teams.away.players.filter(
        player => player.playerStatus === 'STARTER'
    );

    const homeBackUp = lineUpData.teams.home.players.filter(
        player => player.playerStatus === 'BACKUP'
    );
    const awayBackUp = lineUpData.teams.away.players.filter(
        player => player.playerStatus === 'BACKUP'
    );

    const homeFormation = lineUpData.teams.home.arrayFormat;
    const awayFormation = lineUpData.teams.away.arrayFormat;

    const getCoachName = (team: Team) => {
        const coachNameZh = team.coachNameZh;
        const coachNameZht = team.coachNameZht;
        const coachNameEn = team.coachNameEn;

        return (
            (coachNameZh && coachNameZh !== '0' && coachNameZh) ||
            (coachNameZht && coachNameZht !== '0' && coachNameZht) ||
            coachNameEn
        );
    };

    const homeCoachName = getCoachName(lineUpData.teams.home);
    const awayCoachName = getCoachName(lineUpData.teams.away);
    const homeCoachLogo =
        lineUpData.teams.home.coachLogo !== '0'
            ? lineUpData.teams.home.coachLogo
            : CocahDefault.src;
    const awayCoachLogo =
        lineUpData.teams.away.coachLogo !== '0'
            ? lineUpData.teams.away.coachLogo
            : CocahDefault.src;

    const shouldRenderCoaches = homeCoachName && awayCoachName;

    return (
        <>
            {lineUpData.teams.home.players.length && lineUpData.teams.away.players.length ? (
                <div className={style.lineUp}>
                    <div className={style.title}>
                        <h6>首发阵容</h6>
                        <p>（点击球员/教练/裁判查看数据）</p>
                    </div>
                    <div
                        className={style.ground}
                        style={{ backgroundImage: `url(${GroundBg.src})` }}
                    >
                        {/* <div className={style.groundName}>
                            <Gun />
                            <span>雅莉姍大金</span>
                        </div> */}
                        {lineUpData.teams.venueZh || lineUpData.teams.venueEn ? (
                            <div className={style.groundName}>
                                <Place />
                                <span>{lineUpData.teams.venueZh || lineUpData.teams.venueEn}</span>
                            </div>
                        ) : null}
                    </div>
                    <div className={style.court}>
                        <div
                            className={style.field}
                            style={{ backgroundImage: `url(${CourtTop.src})` }}
                        >
                            <div className={style.winWorth}>
                                <p>
                                    <span>阵型: {lineUpData.teams.home.arrayFormat}</span>
                                    <span>阵容赢率：{lineUpData.teams.home.winRate}%</span>
                                </p>
                                {/* <p>
                                    <span>首发身价：1330万欧</span>
                                </p> */}
                            </div>
                            <div className={style.lineUpTeam}>
                                <div className={style.leftTeam}>
                                    <div className={style.leftTeamBox}>
                                        <TeamLogo
                                            alt="homeTeam"
                                            height={20}
                                            src={matchDetail.homeLogo}
                                            width={20}
                                        />
                                        <span className={style.teamName}>
                                            {matchDetail.homeChs}
                                        </span>
                                    </div>
                                </div>
                                {lineUpData.teams.home.coachNameZh &&
                                lineUpData.teams.home.coachNameZht &&
                                lineUpData.teams.home.coachNameEn ? (
                                    <div className={style.coach}>
                                        <CocahIcon height={18} width={18} />
                                        <span>{getCoachName(lineUpData.teams.home)}</span>
                                    </div>
                                ) : null}
                            </div>
                            {homeStarters.map(player => (
                                <Player
                                    key={player.playerId}
                                    lineUpData={player}
                                    teamColor={lineUpData.teams.home.teamColor}
                                />
                            ))}
                        </div>
                        <div
                            className={style.field}
                            style={{ backgroundImage: `url(${CourtBottom.src})` }}
                        >
                            <div className={`${style.winWorth} ${style.away}`}>
                                <p>
                                    <span>阵型: {lineUpData.teams.away.arrayFormat}</span>
                                    <span>阵容赢率：{lineUpData.teams.away.winRate}%</span>
                                </p>
                                {/* <p>
                                    <span>首发身价：1330万欧</span>
                                </p> */}
                            </div>
                            <div className={`${style.lineUpTeam} ${style.away}`}>
                                <div className={style.leftTeam}>
                                    <div className={style.leftTeamBox}>
                                        <TeamLogo
                                            alt="awayTeam"
                                            height={20}
                                            src={matchDetail.awayLogo}
                                            width={20}
                                        />
                                        <span className={style.teamName}>
                                            {matchDetail.awayChs}
                                        </span>
                                    </div>
                                </div>
                                {lineUpData.teams.away.coachNameZh &&
                                lineUpData.teams.away.coachNameZht &&
                                lineUpData.teams.away.coachNameEn ? (
                                    <div className={style.coach}>
                                        <CocahIcon height={18} width={18} />
                                        <span>{getCoachName(lineUpData.teams.away)}</span>
                                    </div>
                                ) : null}
                            </div>
                            {awayStarters.map(player => (
                                <Player
                                    isBottom
                                    key={player.playerId}
                                    lineUpData={player}
                                    teamColor={lineUpData.teams.away.teamColor}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={style.title}>
                        <h6>替补阵容</h6>
                    </div>
                    <div className={style.teamPlayer}>
                        <div className={style.matchTeam}>
                            <div className={style.container}>
                                <TeamLogo
                                    alt="homeTeam"
                                    height={31}
                                    src={matchDetail.homeLogo}
                                    width={31}
                                />
                                <div className={style.text}>
                                    <div className={style.name}>{matchDetail.homeChs}</div>
                                    {/* <div className={style.extra}>替补身价：757.5万欧</div> */}
                                </div>
                            </div>
                            <div className={style.container}>
                                <TeamLogo
                                    alt="awayTeam"
                                    height={31}
                                    src={matchDetail.awayLogo}
                                    width={31}
                                />
                                <div className={style.text}>
                                    <div className={style.name}>{matchDetail.awayChs}</div>
                                    {/* <div className={style.extra}>替补身价：537.5万欧</div> */}
                                </div>
                            </div>
                        </div>
                        {shouldRenderCoaches ? (
                            <div className={style.coachBox}>
                                <CoachInfo coachLogo={homeCoachLogo} coachName={homeCoachName} />
                                <CoachInfo coachLogo={awayCoachLogo} coachName={awayCoachName} />
                            </div>
                        ) : null}
                        <PlayerList
                            awayBackUp={awayBackUp}
                            awayColor={lineUpData.teams.away.teamColor}
                            awayFormation={awayFormation}
                            homeBackUp={homeBackUp}
                            homeColor={lineUpData.teams.home.teamColor}
                            homeFormation={homeFormation}
                        />
                        <PlayerIconList />
                    </div>
                </div>
            ) : (
                <NoData text="暂无资料" />
            )}
        </>
    );
}

export default LineUp;

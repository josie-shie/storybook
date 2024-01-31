'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Gun from './img/gun.svg';
import Place from './img/place.svg';
import CocahIcon from './img/coachIcon.svg';
import CocahDefault from './img/coach.png';
import GroundBg from './img/groundBg.png';
import CourtTop from './img/courtTop.png';
import CourtBottom from './img/courtBottom.png';
import DefaultTeamLogoIcon from '../../img/defaultTeamLogo.png';
import { useContestDetailStore } from '../../contestDetailStore';
import style from './lineUp.module.scss';
import Player from './player';
import PlayerList from './playerList';
import PlayerIconList from './playerIconList';
import type { GetLineUpInfoResponse } from 'data-center';

function LineUp({ lineUpData }: { lineUpData: GetLineUpInfoResponse }) {
    const matchDetail = useContestDetailStore.use.matchDetail();

    const homeStarters = lineUpData.teams.HOME.players.filter(
        player => player.player_status === 'STARTER'
    );
    const awayStarters = lineUpData.teams.AWAY.players.filter(
        player => player.player_status === 'STARTER'
    );

    const homeBackUp = lineUpData.teams.HOME.players.filter(
        player => player.player_status === 'BACKUP'
    );
    const awayBackUp = lineUpData.teams.AWAY.players.filter(
        player => player.player_status === 'BACKUP'
    );

    const homeFormation = lineUpData.teams.HOME.array_format;
    const awayFormation = lineUpData.teams.AWAY.array_format;

    return (
        <div className={style.lineUp}>
            <div className={style.title}>
                <h6>首发阵容</h6>
                <p>（点击球员/教练/裁判查看数据）</p>
            </div>
            <div className={style.ground} style={{ backgroundImage: `url(${GroundBg.src})` }}>
                {/* <div className={style.groundName}>
                    <Gun />
                    <span>雅莉姍大金</span>
                </div> */}
                <div className={style.groundName}>
                    <Place />
                    <span>西太平洋體育場</span>
                </div>
            </div>
            <div className={style.court}>
                <div className={style.field} style={{ backgroundImage: `url(${CourtTop.src})` }}>
                    <div className={style.winWorth}>
                        <p>
                            <span>阵型: {lineUpData.teams.HOME.array_format}</span>
                            <span>阵容赢率：32.39%</span>
                        </p>
                        {/* <p>
                            <span>首发身价：1330万欧</span>
                        </p> */}
                    </div>
                    <div className={style.lineUpTeam}>
                        <div className={style.leftTeam}>
                            <div className={style.leftTeamBox}>
                                <Image
                                    alt="homeTeam"
                                    height={20}
                                    src={matchDetail.homeLogo || DefaultTeamLogoIcon}
                                    width={20}
                                />
                                <span className={style.teamName}>{matchDetail.homeChs}</span>
                            </div>
                        </div>
                        <div className={style.coach}>
                            <CocahIcon width={18} height={18} />
                            <span>
                                {lineUpData.teams.HOME.coach_name_zh &&
                                lineUpData.teams.HOME.coach_name_zh !== '0'
                                    ? lineUpData.teams.HOME.coach_name_zh
                                    : lineUpData.teams.HOME.coach_name_en}
                            </span>
                        </div>
                    </div>
                    {homeStarters.map((player, index) => (
                        <Player
                            key={index}
                            teamColor={lineUpData.teams.HOME.team_color}
                            lineUpData={player}
                        />
                    ))}
                </div>
                <div className={style.field} style={{ backgroundImage: `url(${CourtBottom.src})` }}>
                    <div className={`${style.winWorth} ${style.away}`}>
                        <p>
                            <span>阵型: {lineUpData.teams.AWAY.array_format}</span>
                            <span>阵容赢率：32.39%</span>
                        </p>
                        {/* <p>
                            <span>首发身价：1330万欧</span>
                        </p> */}
                    </div>
                    <div className={`${style.lineUpTeam} ${style.away}`}>
                        <div className={style.leftTeam}>
                            <div className={style.leftTeamBox}>
                                <Image
                                    alt="awayTeam"
                                    height={20}
                                    src={matchDetail.awayLogo || DefaultTeamLogoIcon}
                                    width={20}
                                />
                                <span className={style.teamName}>{matchDetail.awayChs}</span>
                            </div>
                        </div>
                        <div className={style.coach}>
                            <CocahIcon width={18} height={18} />
                            <span>
                                {lineUpData.teams.AWAY.coach_name_zh &&
                                lineUpData.teams.AWAY.coach_name_zh !== '0'
                                    ? lineUpData.teams.AWAY.coach_name_zh
                                    : lineUpData.teams.AWAY.coach_name_en}
                            </span>
                        </div>
                    </div>
                    {awayStarters.map((player, index) => (
                        <Player
                            key={index}
                            teamColor={lineUpData.teams.AWAY.team_color}
                            lineUpData={player}
                            isBottom={true}
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
                        <Image
                            alt="homeTeam"
                            height={31}
                            src={matchDetail.homeLogo || DefaultTeamLogoIcon}
                            width={31}
                        />
                        <div className={style.text}>
                            <div className={style.name}>{matchDetail.homeChs}</div>
                            {/* <div className={style.extra}>替补身价：757.5万欧</div> */}
                        </div>
                    </div>
                    <div className={style.container}>
                        <Image
                            alt="awayTeam"
                            height={31}
                            src={matchDetail.awayLogo || DefaultTeamLogoIcon}
                            width={31}
                        />
                        <div className={style.text}>
                            <div className={style.name}>{matchDetail.awayChs}</div>
                            {/* <div className={style.extra}>替补身价：537.5万欧</div> */}
                        </div>
                    </div>
                </div>
                <div className={style.coachBox}>
                    <div className={style.coach}>
                        <Image
                            alt="coachHome"
                            className={style.cocahBg}
                            height={32}
                            src={CocahDefault.src}
                            width={32}
                        />
                        <div className={style.info}>
                            <div className={style.name}>
                                {lineUpData.teams.HOME.coach_name_zh &&
                                lineUpData.teams.HOME.coach_name_zh !== '0'
                                    ? lineUpData.teams.HOME.coach_name_zh
                                    : lineUpData.teams.HOME.coach_name_en}
                            </div>
                            <div className={style.work}>教练</div>
                        </div>
                    </div>
                    <div className={style.coach}>
                        <Image
                            alt="coachAway"
                            className={style.cocahBg}
                            height={32}
                            src={CocahDefault.src}
                            width={32}
                        />
                        <div className={style.info}>
                            <div className={style.name}>
                                {lineUpData.teams.AWAY.coach_name_zh &&
                                lineUpData.teams.AWAY.coach_name_zh !== '0'
                                    ? lineUpData.teams.AWAY.coach_name_zh
                                    : lineUpData.teams.AWAY.coach_name_en}
                            </div>
                            <div className={style.work}>教练</div>
                        </div>
                    </div>
                </div>
                <PlayerList
                    homeBackUp={homeBackUp}
                    awayBackUp={awayBackUp}
                    homeColor={lineUpData.teams.HOME.team_color}
                    awayColor={lineUpData.teams.AWAY.team_color}
                    homeFormation={homeFormation}
                    awayFormation={awayFormation}
                />
                <PlayerIconList />
            </div>
        </div>
    );
}

export default LineUp;

'use client';
import Image from 'next/image';
import Button from '@mui/material/Button';
import type { GetSingleMatchResponse } from 'data-center';
import Header from './header';
import style from './liveBox.module.scss';
import VideoIcon from './img/video.png';
import bgImage from './img/bg.jpg';
import DefaultTeamLogoIcon from './img/defaultTeamLogo.png';
import { createContestDetailStore, useContestDetailStore } from './contestDetailStore';

type GameStatusType = { style: string; text: string } | undefined;

function GameStatus() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const gameStatus = {
        state: 'apple',
        time: '21'
    };

    const stateStyle: Record<string, { style: string; text: string }> = {
        notYet: { style: style.notYet, text: '未' },
        midfielder: { style: style.notYet, text: '中场' },
        finish: { style: style.finish, text: '完场' },
        playoff: { style: style.playoff, text: '加' },
        kick: { style: style.playoff, text: '点' },
        cancel: { style: style.notYet, text: '取消' },
        undetermined: { style: style.notYet, text: '待定' },
        cut: { style: style.notYet, text: '腰斩' },
        discontinue: { style: style.notYet, text: '中断' },
        putOff: { style: style.notYet, text: '推迟' }
    };

    return (
        <div className={style.gameStatus}>
            {gameStatus.state !== 'notYet' && (
                <div className={style.textHolder}>
                    <p className={style.text}>
                        半場 {matchDetail.homeHalfScore}-{matchDetail.awayHalfScore}
                    </p>
                </div>
            )}
            <div
                className={`${style.gameTime}  ${
                    (stateStyle[gameStatus.state] as GameStatusType)
                        ? stateStyle[gameStatus.state].style
                        : style.midfielder
                }`}
            >
                {(stateStyle[gameStatus.state] as GameStatusType) ? (
                    stateStyle[gameStatus.state].text
                ) : (
                    <>
                        {gameStatus.time} <span className={style.timePoint}>’</span>
                    </>
                )}
                <div className={style.homeScore}>{matchDetail.homeScore}</div>
                <div className={style.awayScore}>{matchDetail.awayScore}</div>
            </div>
            {gameStatus.state === 'notYet' ? (
                <p className={style.vsText}>VS</p>
            ) : (
                <>
                    <div className={style.textHolder}>
                        <p className={style.text}>加時 5-5</p>
                    </div>

                    <div className={style.textHolder}>
                        <p className={style.text}>點球 5-5</p>
                    </div>
                </>
            )}
        </div>
    );
}

function LiveBox({ contestDetail }: { contestDetail: GetSingleMatchResponse }) {
    createContestDetailStore({ matchDetail: contestDetail });
    const { homeChs, homeLogo, awayChs, awayLogo } = useContestDetailStore.use.matchDetail();

    return (
        <div className={style.liveBox} style={{ backgroundImage: `url(${bgImage.src})` }}>
            <Header />
            <div className={style.scoreboard}>
                <div className={style.gameInfo}>
                    <div className={style.team}>
                        <div className={style.circleBg}>
                            <Image
                                alt={homeChs}
                                height={40}
                                src={homeLogo ? homeLogo : DefaultTeamLogoIcon}
                                width={40}
                            />
                        </div>
                        <p className={style.teamName}>{homeChs}</p>
                    </div>
                    <div className={style.score}>
                        <GameStatus />
                    </div>
                    <div className={style.team}>
                        <div className={style.circleBg}>
                            <Image
                                alt={awayChs}
                                height={40}
                                src={awayLogo ? awayLogo : DefaultTeamLogoIcon}
                                width={40}
                            />
                        </div>
                        <p className={style.teamName}>{awayChs}</p>
                    </div>
                </div>
                <Button className={style.liveBtn}>
                    <Image
                        alt="video_icon"
                        className={style.icon}
                        height={17}
                        src={VideoIcon}
                        width={17}
                    />
                    <span>动画</span>
                </Button>
            </div>
        </div>
    );
}

export default LiveBox;

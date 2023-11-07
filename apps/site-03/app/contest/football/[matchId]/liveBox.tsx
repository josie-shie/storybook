'use client';
import Image from 'next/image';
import Button from '@mui/material/Button';
import type { GetSingleMatchResponse } from 'data-center';
import { GameStatus } from 'ui';
import TeamLogo from './components/teamLogo';
import Header from './header';
import style from './liveBox.module.scss';
import VideoIcon from './img/video.png';
import bgImage from './img/bg.jpg';
import { createContestDetailStore, useContestDetailStore } from './contestDetailStore';
import { useContestInfoStore } from '@/app/contestInfoStore';

const statusStyleMap = {
    '0': style.notYet,
    '1': style.midfielder,
    '2': style.midfielder,
    '3': style.midfielder,
    '4': style.playOff,
    '5': style.playOff,
    '-1': style.finish,
    '-10': style.notYet,
    '-11': style.notYet,
    '-12': style.notYet,
    '-13': style.notYet,
    '-14': style.notYet
};

function GameDetail() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const globalStore = useContestInfoStore.use.contestInfo();
    const homeLiveScore =
        typeof globalStore[matchDetail.matchId] !== 'undefined'
            ? globalStore[matchDetail.matchId].homeScore || matchDetail.homeScore
            : matchDetail.homeScore;

    const awayLiveScore =
        typeof globalStore[matchDetail.matchId] !== 'undefined'
            ? globalStore[matchDetail.matchId].awayScore || matchDetail.awayScore
            : matchDetail.awayScore;

    const liveState =
        typeof globalStore[matchDetail.matchId] !== 'undefined'
            ? globalStore[matchDetail.matchId].state || matchDetail.state
            : matchDetail.state;

    return (
        <div className={style.gameStatus}>
            {liveState < 1 && liveState !== -1 && <p className={style.vsText}>VS</p>}
            <div className={style.gameScore}>
                <GameStatus
                    className={`${style.gameTime} ${statusStyleMap[matchDetail.state]}`}
                    startTime={matchDetail.startTime}
                    status={liveState}
                />

                <div className={style.homeScore}>{homeLiveScore}</div>
                <div className={style.awayScore}>{awayLiveScore}</div>
            </div>

            <div className={style.textHolder}>
                <p className={style.text}>
                    半場 {matchDetail.homeHalfScore}-{matchDetail.awayHalfScore}
                </p>
            </div>
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
                            <TeamLogo alt={homeChs} height={40} src={homeLogo} width={40} />
                        </div>
                        <p className={style.teamName}>{homeChs}</p>
                    </div>
                    <div className={style.score}>
                        <GameDetail />
                    </div>
                    <div className={style.team}>
                        <div className={style.circleBg}>
                            <TeamLogo alt={awayChs} height={40} src={awayLogo} width={40} />
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

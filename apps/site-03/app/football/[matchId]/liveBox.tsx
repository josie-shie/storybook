'use client';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import type { GetSingleMatchResponse } from 'data-center';
import { GameStatus } from 'ui';
import md5 from 'crypto-js/md5';
import { useEffect, useState } from 'react';
import { useContestInfoStore } from '@/app/contestInfoStore';
import TeamLogo from './components/teamLogo';
import Header from './header';
import style from './liveBox.module.scss';
import VideoIcon from './img/video.png';
import bgImage from './img/bg.jpg';
import { createContestDetailStore, useContestDetailStore } from './contestDetailStore';
import BackIcon from './img/back.png';

const statusStyleMap = {
    '0': 'notYet',
    '1': 'midfielder',
    '2': 'midfielder',
    '3': 'midfielder',
    '4': 'playOff',
    '5': 'playOff',
    '-1': 'finish',
    '-10': 'notYet',
    '-11': 'notYet',
    '-12': 'notYet',
    '-13': 'notYet',
    '-14': 'notYet'
};

function GameDetail({ matchId }: { matchId: number }) {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    const liveState = syncData.state || matchDetail.state;

    return (
        <div className={style.gameStatus}>
            {liveState < 1 && liveState !== -1 && <p className={style.vsText}>VS</p>}
            <div className={style.gameScore}>
                <GameStatus
                    className={`gameTime ${statusStyleMap[matchDetail.state]}`}
                    startTime={matchDetail.startTime}
                    status={liveState}
                />

                <div className={style.homeScore}>{syncData.homeScore || matchDetail.homeScore}</div>
                <div className={style.awayScore}>{syncData.awayScore || matchDetail.awayScore}</div>
            </div>

            <div className={style.textHolder}>
                <p className={style.text}>
                    半場 {matchDetail.homeHalfScore}-{matchDetail.awayHalfScore}
                </p>
            </div>
        </div>
    );
}

function Animate({ matchId }: { matchId: number }) {
    const [showAnimate, setShowAnimate] = useState('');
    const searchParams = useSearchParams();
    const isShowAnimation = searchParams.get('live');

    const getAnimateUrl = () => {
        const ts = Math.floor(Date.now());
        const accessKey = 'ADG41H3Wfx7V3JlAaVZX1klyXvBhYQGu1GuV';
        const secretKey = 'ubAdfpqlPmbWeSjh7iDaqYRsQhRPq3W7dRAR';
        const auth = md5(accessKey + ts + secretKey) as unknown as string;

        const url = `https://zhibo.feijing88.com/animation/?matchId=${matchId}&accessKey=${accessKey}&ts=${ts}&auth=${auth}`;
        setShowAnimate(url);
    };

    const back = () => {
        setShowAnimate('');
    };

    useEffect(() => {
        if (isShowAnimation) {
            getAnimateUrl();
        }
    }, []);

    return (
        <>
            <Button className={style.liveBtn} onClick={getAnimateUrl}>
                <Image
                    alt="video_icon"
                    className={style.icon}
                    height={17}
                    src={VideoIcon}
                    width={17}
                />
                <span>动画</span>
            </Button>
            {showAnimate ? (
                <div className={style.animateBox}>
                    <iframe src={showAnimate} title="sport animate" />
                    <Image
                        alt="back_icon"
                        className={style.backIcon}
                        height={24}
                        onClick={back}
                        src={BackIcon}
                        width={24}
                    />
                </div>
            ) : null}
        </>
    );
}

function LiveBox({
    contestDetail,
    backHistory,
    matchId
}: {
    contestDetail: GetSingleMatchResponse;
    backHistory?: boolean;
    matchId: number;
}) {
    createContestDetailStore({ matchDetail: contestDetail });

    const { homeChs, homeLogo, awayChs, awayLogo } = useContestDetailStore.use.matchDetail();
    const router = useRouter();
    const back = () => {
        if (backHistory) {
            router.back();
        } else {
            router.push('/');
        }
    };

    return (
        <div className={style.liveBox} style={{ backgroundImage: `url(${bgImage.src})` }}>
            <Header back={back} />
            <div className={style.scoreboard}>
                <div className={style.gameInfo}>
                    <div className={style.team}>
                        <div className={style.circleBg}>
                            <TeamLogo alt={homeChs} height={40} src={homeLogo} width={40} />
                        </div>
                        <p className={style.teamName}>{homeChs}</p>
                    </div>
                    <div className={style.score}>
                        <GameDetail matchId={matchId} />
                    </div>
                    <div className={style.team}>
                        <div className={style.circleBg}>
                            <TeamLogo alt={awayChs} height={40} src={awayLogo} width={40} />
                        </div>
                        <p className={style.teamName}>{awayChs}</p>
                    </div>
                </div>
                <Animate matchId={matchId} />
            </div>
        </div>
    );
}

export default LiveBox;

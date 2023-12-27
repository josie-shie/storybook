'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { GetSingleMatchResponse } from 'data-center';
import { GameStatus } from 'ui';
import { useContestInfoStore } from '@/app/contestInfoStore';
import TeamLogo from './components/teamLogo';
import Header from './header';
import style from './liveBox.module.scss';
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

function Animate() {
    const showAnimate = useContestDetailStore.use.showAnimate();
    const setShowAnimate = useContestDetailStore.use.setShowAnimate();

    const back = () => {
        setShowAnimate('');
    };

    return (
        <>
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
            <Header back={back} matchId={matchId} />
            <div className={style.scoreboard}>
                <div className={style.gameInfo}>
                    <div className={style.team}>
                        <div className={style.circleBg}>
                            <TeamLogo alt={homeChs} height={46} src={homeLogo} width={46} />
                        </div>
                        <p className={style.teamName}>{homeChs}</p>
                    </div>
                    <div className={style.score}>
                        <GameDetail matchId={matchId} />
                    </div>
                    <div className={style.team}>
                        <div className={style.circleBg}>
                            <TeamLogo alt={awayChs} height={46} src={awayLogo} width={46} />
                        </div>
                        <p className={style.teamName}>{awayChs}</p>
                    </div>
                </div>
                <Animate />
            </div>
        </div>
    );
}

export default LiveBox;

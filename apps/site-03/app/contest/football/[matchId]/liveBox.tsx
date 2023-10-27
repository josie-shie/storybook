'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Header from './header';
import style from './liveBox.module.scss';
import VideoIcon from './img/video.svg';
import bgImage from './img/bg.jpg';
import DefaultTeamLogoIcon from './img/defaultTeamLogo.png';

type GameStatusType = { style: string; text: string } | undefined;

function GameStatus() {
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
                    <p className={style.text}>半場 5-5</p>
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
                <div className={style.homeScore}>13</div>
                <div className={style.awayScore}>7</div>
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

function LiveBox() {
    const [liveVisible, setLiveVisible] = useState(true);
    const liveBarRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const currentRef = liveBarRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setLiveVisible(entry.isIntersecting);
            },
            {
                threshold: 0.24
            }
        );
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [setLiveVisible]);

    return (
        <div
            className={style.liveBox}
            ref={liveBarRef}
            style={{ backgroundImage: `url(${bgImage.src})` }}
        >
            <Header liveVisible={liveVisible} />
            <div className={style.scoreboard}>
                <div className={style.gameInfo}>
                    <div className={style.team}>
                        <div className={style.circleBg}>
                            <Image
                                alt="主隊隊名"
                                height={40}
                                src={DefaultTeamLogoIcon}
                                width={40}
                            />
                        </div>
                        <p className={style.teamName}>主隊隊名</p>
                    </div>
                    <div className={style.score}>
                        <GameStatus />
                    </div>
                    <div className={style.team}>
                        <div className={style.circleBg}>
                            <Image
                                alt="客隊隊名"
                                height={40}
                                src={DefaultTeamLogoIcon}
                                width={40}
                            />
                        </div>
                        <p className={style.teamName}>客隊隊名</p>
                    </div>
                </div>
                <Button className={style.liveBtn}>
                    <VideoIcon className={style.icon} />
                    动画
                </Button>
            </div>
        </div>
    );
}

export default LiveBox;

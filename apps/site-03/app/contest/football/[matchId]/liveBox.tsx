'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Header from './header';
import style from './liveBox.module.scss';
import VideoIcon from './img/video.png';
import bgImage from './img/bg.jpg';
import DefaultTeamLogoIcon from './img/defaultTeamLogo.png';

function GameStatus() {
    const gameStatus = {
        state: 'notYet',
        time: '7/1'
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
        <>
            <p className={`${style.gameTime} ${stateStyle[gameStatus.state].style || ''}`}>
                {stateStyle[gameStatus.state].text || (
                    <>
                        {gameStatus.time} <span className={style.timePoint}>&apos;</span>
                    </>
                )}
            </p>
            {gameStatus.state === 'notYet' ? (
                <p className={style.vsText}>VS</p>
            ) : (
                <>
                    <p className={style.all}>
                        10
                        <span>-</span>
                        10
                    </p>
                    <p className={style.half}>半場 5-5</p>
                </>
            )}
        </>
    );
}

function LiveBox() {
    const [liveVisible] = useState(true);
    const liveBarRef = useRef(null);

    return (
        <div
            className={style.liveBar}
            ref={liveBarRef}
            style={{ backgroundImage: `url(${bgImage.src})` }}
        >
            <Header liveVisible={liveVisible} />
            <div className={style.scoreboard}>
                <div className={style.gameInfo}>
                    <div className={style.team}>
                        <Image alt="主隊隊名" height={40} src={DefaultTeamLogoIcon} width={40} />
                        <p className={style.teamName}>主隊隊名</p>
                    </div>
                    <div className={style.score}>
                        <GameStatus />
                    </div>
                    <div className={style.team}>
                        <Image alt="客隊隊名" height={40} src={DefaultTeamLogoIcon} width={40} />
                        <p className={style.teamName}>客隊隊名</p>
                    </div>
                </div>
                <Button className={style.liveBtn}>
                    <Image
                        alt="动画"
                        className={style.icon}
                        height={16}
                        src={VideoIcon}
                        width={16}
                    />
                    动画
                </Button>
            </div>
        </div>
    );
}

export default LiveBox;

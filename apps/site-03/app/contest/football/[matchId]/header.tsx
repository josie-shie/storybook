'use client';

import Image from 'next/image';
import style from './header.module.scss';
import BackIcon from './img/back.svg';
import SettingIcon from './img/setting.svg';
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
        <p className={`${style.gameTime} ${stateStyle[gameStatus.state].style || ''}`}>
            {stateStyle[gameStatus.state].text || (
                <>
                    {gameStatus.time} <span className={style.timePoint}>&apos;</span>
                </>
            )}
        </p>
    );
}

function Header({ liveVisible }: { liveVisible: boolean }) {
    const matchData = {
        leagueChsShort: '歐錦U20A',
        kind: 2,
        roundCn: '决赛',
        grouping: ''
    };
    return (
        <>
            <header className={style.header}>
                <BackIcon />
                <div className={style.scoreboard}>
                    <p className={style.createTime}>7/14 01:00</p>
                    <p className={style.league}>
                        {matchData.leagueChsShort}
                        {matchData.kind === 1 && ` 第${matchData.roundCn}轮`}
                        {matchData.kind === 2 && ` ${matchData.roundCn} ${matchData.grouping}`}
                    </p>
                </div>
                <SettingIcon />
            </header>

            <header
                className={`${style.header} ${style.headerFixed} ${!liveVisible && style.show}`}
            >
                <BackIcon />
                <div className={style.scoreBar}>
                    <Image alt="" height={24} src={DefaultTeamLogoIcon} width={24} />
                    <p className={style.score}>10</p>
                    <GameStatus />
                    <p className={style.score}>10</p>
                    <Image alt="" height={24} src={DefaultTeamLogoIcon} width={24} />
                </div>
                <SettingIcon />
            </header>
        </>
    );
}

export default Header;

import Image from 'next/image';
import Link from 'next/link';
import style from './header.module.scss';
import BackIcon from './img/back.png';
import ShareIcon from './img/share.png';
import DefaultTeamLogoIcon from './img/defaultTeamLogo.png';
import { useContestDetailStore } from './contestDetailStore';

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

function Header() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const layoutDisplayed = useContestDetailStore.use.layoutDisplayed();

    return (
        <>
            <header className={style.header}>
                <Link href="/contest/football">
                    <Image alt="back_icon" height={24} src={BackIcon} width={24} />
                </Link>
                <div className={style.scoreboard}>
                    <p className={style.createTime}>{matchDetail.matchTime}</p>
                    <p className={style.league}>
                        {matchDetail.leagueChsShort}
                        {matchDetail.kind === 1 && ` 第${matchDetail.roundCn}轮`}
                        {matchDetail.kind === 2 &&
                            ` ${matchDetail.roundCn} ${matchDetail.grouping}`}
                    </p>
                </div>
                <Image alt="share_icon" height={24} src={ShareIcon} width={24} />
            </header>

            <header
                className={`${style.header} ${style.headerFixed} ${!layoutDisplayed && style.show}`}
            >
                <Link href="/contest/football">
                    <Image alt="back_icon" height={24} src={BackIcon} width={24} />
                </Link>
                <div className={style.scoreBar}>
                    <Image
                        alt=""
                        height={24}
                        src={matchDetail.homeLogo ? matchDetail.homeLogo : DefaultTeamLogoIcon}
                        width={24}
                    />
                    <p className={style.score}>{matchDetail.homeScore}</p>
                    <GameStatus />
                    <p className={style.score}>{matchDetail.awayScore}</p>
                    <Image
                        alt=""
                        height={24}
                        src={matchDetail.awayLogo ? matchDetail.awayLogo : DefaultTeamLogoIcon}
                        width={24}
                    />
                </div>
                <Image alt="share_icon" height={24} src={ShareIcon} width={24} />
            </header>
        </>
    );
}

export default Header;

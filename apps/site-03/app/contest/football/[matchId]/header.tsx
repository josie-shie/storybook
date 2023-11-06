import Image from 'next/image';
import Link from 'next/link';
import { GameStatus } from 'ui';
import style from './header.module.scss';
import BackIcon from './img/back.png';
import ShareIcon from './img/share.png';
import { useContestDetailStore } from './contestDetailStore';
import TeamLogo from './components/teamLogo';
import { useContestInfoStore } from '@/app/contestInfoStore';

function Header() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const layoutDisplayed = useContestDetailStore.use.layoutDisplayed();

    const globalStore = useContestInfoStore.use.contestInfo();
    const homeLiveScore =
        typeof globalStore[matchDetail.matchId] !== 'undefined'
            ? globalStore[matchDetail.matchId].homeScore || matchDetail.homeScore
            : matchDetail.homeScore;

    const awayLiveScore =
        typeof globalStore[matchDetail.matchId] !== 'undefined'
            ? globalStore[matchDetail.matchId].awayScore || matchDetail.awayScore
            : matchDetail.awayScore;

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
                    <TeamLogo alt="" height={24} src={matchDetail.homeLogo} width={24} />
                    <p className={style.score}>{homeLiveScore}</p>
                    <GameStatus startTime={matchDetail.startTime} status={matchDetail.state} />
                    <p className={style.score}>{awayLiveScore}</p>
                    <TeamLogo alt="" height={24} src={matchDetail.awayLogo} width={24} />
                </div>
                <Image alt="share_icon" height={24} src={ShareIcon} width={24} />
            </header>
        </>
    );
}

export default Header;

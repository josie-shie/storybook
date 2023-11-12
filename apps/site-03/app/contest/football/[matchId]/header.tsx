import Image from 'next/image';
import { GameStatus } from 'ui';
import { timestampToString } from 'lib';
import style from './header.module.scss';
import BackIcon from './img/back.png';
import ShareIcon from './img/share.png';
import { useContestDetailStore } from './contestDetailStore';
import TeamLogo from './components/teamLogo';
import { useContestInfoStore } from '@/app/contestInfoStore';

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

function Header({ back }: { back: () => void }) {
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

    const liveState =
        typeof globalStore[matchDetail.matchId] !== 'undefined'
            ? globalStore[matchDetail.matchId].state || matchDetail.state
            : matchDetail.state;

    return (
        <>
            <header className={style.header}>
                <Image alt="back_icon" height={24} onClick={back} src={BackIcon} width={24} />
                <div className={style.scoreboard}>
                    <p className={style.createTime}>
                        {timestampToString(matchDetail.startTime, 'M/DD HH:mm')}
                    </p>
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
                <Image alt="back_icon" height={24} onClick={back} src={BackIcon} width={24} />
                <div className={style.scoreBar}>
                    <TeamLogo alt="" height={24} src={matchDetail.homeLogo} width={24} />
                    <p className={style.score}>{homeLiveScore}</p>
                    <GameStatus
                        className={`gameTime ${statusStyleMap[matchDetail.state]}`}
                        startTime={matchDetail.startTime}
                        status={liveState}
                    />
                    <p className={style.score}>{awayLiveScore}</p>
                    <TeamLogo alt="" height={24} src={matchDetail.awayLogo} width={24} />
                </div>
                <Image alt="share_icon" height={24} src={ShareIcon} width={24} />
            </header>
        </>
    );
}

export default Header;

import { useEffect } from 'react';
import { GameStatus } from 'ui';
import md5 from 'crypto-js/md5';
import type { ContestInfo } from 'data-center';
import { useSearchParams } from 'next/navigation';
import { useLiveContestStore } from '@/store/liveContestStore';
import { useFormattedTime } from '@/hooks/useFormattedTime';
import { useNotificationStore } from '@/store/notificationStore';
import { useContestDetailStore } from './contestDetailStore';
import style from './header.module.scss';
import BackIcon from './img/back.svg';
import TeamLogo from './components/teamLogo';
import ShareIcon from './img/share.svg';
// import VideoIcon from './img/video.svg';
import LiveIcon from './img/live.svg';

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

interface InterceptDataType {
    awayChs: string;
    awayHalfScore: number;
    awayScore: number;
    countryCn: string;
    homeChs: string;
    homeHalfScore: number;
    homeScore: number;
    isFamous: boolean;
    leagueChsShort: string;
    leagueId: number;
    leagueLevel: number;
    matchId: number;
    startTime: number;
    [key: string]: number | string | boolean;
}

function Header({
    matchId,
    interceptData,
    back
}: {
    matchId: number;
    interceptData?: InterceptDataType | ContestInfo;
    back: () => void;
}) {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const layoutDisplayed = useContestDetailStore.use.layoutDisplayed();
    const globalStore = useLiveContestStore.use.contestInfo();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const setShowAnimate = useContestDetailStore.use.setShowAnimate();

    const searchParams = useSearchParams();
    const isShowAnimation = searchParams.get('live');

    const syncData = Object.hasOwnProperty.call(globalStore, matchDetail.matchId)
        ? globalStore[matchDetail.matchId]
        : {};

    const liveState = syncData.state || matchDetail.state || (interceptData?.state as number);

    const matchStartTime = syncData.startTime || matchDetail.startTime;
    const matchHalfStartTime = syncData.halfStartTime || matchDetail.halfStartTime;

    const currentMatchTime =
        useFormattedTime({
            timeStamp: matchDetail.matchTime || (interceptData?.matchTime as number),
            formattedString: 'M/DD HH:mm'
        }) || '';

    const handleShare = async () => {
        if (typeof navigator.share !== 'undefined') {
            await navigator
                .share({
                    title: '未来体育 | FutureSport',
                    url: `${location.origin}/football/${matchId}`
                })
                .then(() => {
                    setIsVisible('分享成功！', 'success');
                })
                .catch(async error => {
                    await navigator.clipboard.writeText(`${location.origin}/football/${matchId}`);
                    console.error(error);
                });
        } else {
            await navigator.clipboard.writeText(`${location.origin}/football/${matchId}`);
            setIsVisible('已复制分享连结！', 'success');
        }
    };

    const handleAnimate = () => {
        const ts = Math.floor(Date.now());
        const accessKey = 'ADG41H3Wfx7V3JlAaVZX1klyXvBhYQGu1GuV';
        const secretKey = 'ubAdfpqlPmbWeSjh7iDaqYRsQhRPq3W7dRAR';
        const auth = md5(accessKey + ts + secretKey) as unknown as string;

        const url = `https://zhibo.feijing88.com/animation/?matchId=${matchId}&accessKey=${accessKey}&ts=${ts}&auth=${auth}`;
        setShowAnimate(url);
    };

    useEffect(() => {
        if (isShowAnimation) {
            handleAnimate();
        }
    }, []);

    return (
        <>
            <header className={style.header}>
                <div className={style.back}>
                    <BackIcon onClick={back} />
                </div>
                <div className={style.scoreboard}>
                    <p className={style.createTime}>{currentMatchTime}</p>
                    <p className={style.league}>
                        {matchDetail.leagueChsShort || interceptData?.leagueChsShort}
                        {matchDetail.kind === 1 && ` 第${matchDetail.roundCn}轮`}
                    </p>
                </div>
                <div className={style.optionHolder}>
                    <div className={style.option}>
                        {matchDetail.mobileLiveUrl.length > 0 ? (
                            <>
                                <a
                                    className={style.live}
                                    href={matchDetail.mobileLiveUrl}
                                    target="_black"
                                >
                                    <div className={style.liveAnimate} />
                                    <LiveIcon className={style.liveIcon} />
                                </a>
                                <div className={style.line} />
                            </>
                        ) : null}

                        {/* 目前無動畫暫隱藏
                        <div className={style.video} onClick={handleAnimate}>
                            <VideoIcon />
                            <p className={style.videoText}>动画</p>
                        </div> */}
                        <div className={style.share}>
                            <ShareIcon onClick={handleShare} />
                        </div>
                    </div>
                </div>
            </header>

            <header
                className={`${style.header} ${style.headerFixed} ${!layoutDisplayed && style.show}`}
            >
                <BackIcon onClick={back} />
                <div className={style.scoreBar}>
                    <TeamLogo alt="" height={24} src={matchDetail.homeLogo} width={24} />
                    <p className={style.score}>
                        {syncData.homeScore || matchDetail.homeScore || interceptData?.homeScore}
                    </p>
                    <GameStatus
                        className={`gameTime ${
                            statusStyleMap[matchDetail.state] || (interceptData?.state as number)
                        }`}
                        startTime={liveState === 1 ? matchStartTime : matchHalfStartTime}
                        status={liveState}
                    />
                    <p className={style.score}>
                        {syncData.awayScore || matchDetail.awayScore || interceptData?.awayScore}
                    </p>
                    <TeamLogo alt="" height={24} src={matchDetail.awayLogo} width={24} />
                </div>
                <div className={style.share}>
                    <ShareIcon onClick={handleShare} />
                </div>
            </header>
        </>
    );
}

export default Header;

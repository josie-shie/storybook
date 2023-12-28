import { useEffect } from 'react';
import Image from 'next/image';
import { GameStatus } from 'ui';
import Button from '@mui/material/Button';
import md5 from 'crypto-js/md5';
import { useSearchParams } from 'next/navigation';
import { useContestInfoStore } from '@/app/contestInfoStore';
import { useFormattedTime } from '@/hooks/useFormattedTime';
import { useNotificationStore } from '@/app/notificationStore';
import { useContestDetailStore } from './contestDetailStore';
import style from './header.module.scss';
import BackIcon from './img/back.png';
import ShareIcon from './img/share.png';
import TeamLogo from './components/teamLogo';
import VideoIcon from './img/video.png';

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

function Header({ matchId, back }: { matchId: number; back: () => void }) {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const layoutDisplayed = useContestDetailStore.use.layoutDisplayed();
    const globalStore = useContestInfoStore.use.contestInfo();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const setShowAnimate = useContestDetailStore.use.setShowAnimate();

    const searchParams = useSearchParams();
    const isShowAnimation = searchParams.get('live');

    const syncData = Object.hasOwnProperty.call(globalStore, matchDetail.matchId)
        ? globalStore[matchDetail.matchId]
        : {};

    const liveState = syncData.state || matchDetail.state;

    const currentMatchTime = useFormattedTime({
        timeStamp: matchDetail.matchTime,
        formattedString: 'M/DD HH:mm'
    });

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
                    <Image
                        alt="back_icon"
                        className={style.backIcon}
                        height={24}
                        onClick={back}
                        src={BackIcon}
                        width={24}
                    />
                </div>

                <div className={style.scoreboard}>
                    <p className={style.createTime}>{currentMatchTime}</p>
                    <p className={style.league}>
                        {matchDetail.leagueChsShort}
                        {matchDetail.kind === 1 && ` 第${matchDetail.roundCn}轮`}
                    </p>
                </div>
                <div className={style.option}>
                    <Button className={style.liveBtn} onClick={handleAnimate}>
                        <Image
                            alt="video_icon"
                            className={style.icon}
                            height={17}
                            src={VideoIcon}
                            width={17}
                        />
                        <span>动画</span>
                    </Button>
                    <div className={style.share}>
                        <Image
                            alt="share_icon"
                            height={18}
                            onClick={handleShare}
                            src={ShareIcon}
                            width={18}
                        />
                    </div>
                </div>
            </header>

            <header
                className={`${style.header} ${style.headerFixed} ${!layoutDisplayed && style.show}`}
            >
                <Image
                    alt="back_icon"
                    className={style.backIcon}
                    height={24}
                    onClick={back}
                    src={BackIcon}
                    width={24}
                />
                <div className={style.scoreBar}>
                    <TeamLogo alt="" height={24} src={matchDetail.homeLogo} width={24} />
                    <p className={style.score}>{syncData.homeScore || matchDetail.homeScore}</p>
                    <GameStatus
                        className={`gameTime ${statusStyleMap[matchDetail.state]}`}
                        startTime={matchDetail.startTime}
                        status={liveState}
                    />
                    <p className={style.score}>{syncData.awayScore || matchDetail.awayScore}</p>
                    <TeamLogo alt="" height={24} src={matchDetail.awayLogo} width={24} />
                </div>
                <div className={style.share}>
                    <Image
                        alt="share_icon"
                        height={18}
                        onClick={handleShare}
                        src={ShareIcon}
                        width={18}
                    />
                </div>
            </header>
        </>
    );
}

export default Header;

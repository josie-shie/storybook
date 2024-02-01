'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import { getMatchDetail, getGuessProportion } from 'data-center';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import defaultTeamLogo from '@/app/football/[matchId]/img/defaultTeamLogo.png';
import { useGuessDetailStore } from './guessDetailStore';
import style from './vsBox.module.scss';
import BettingRow from './components/bettingRow/bettingRow';

function VsBox() {
    const matchId = useParams().matchId;
    const isLogin = useUserStore.use.isLogin();
    const userInfo = useUserStore.use.userInfo();
    const detailInfo = useGuessDetailStore.use.detail();
    const setDetailInfo = useGuessDetailStore.use.setDetail();
    const setGuessesLeft = useGuessDetailStore.use.setGuessesLeft();

    const covertGuessStatus = (isHandicap: boolean, status: 'selected' | 'unselected' | '') => {
        const statusMapping = {
            selected: isHandicap ? 'home' : 'over',
            unselected: isHandicap ? 'away' : 'under',
            '': 'none'
        };
        return statusMapping[status] || 'none';
    };
    const timestampToDateString = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${month}-${day} ${hours}:${minutes}`;
    };

    useEffect(() => {
        async function fetchMatchDetail() {
            const matchDetail = await getMatchDetail(Number(matchId));
            const guessProportion = await getGuessProportion({
                matchId: Number(matchId),
                memberId: isLogin ? userInfo.uid : 1
            });
            if (matchDetail.success && guessProportion.success) {
                const baseData = matchDetail.data;
                const guessData = guessProportion.data;
                setDetailInfo({
                    leagueName: baseData.leagueChsShort,
                    dateTime: baseData.matchTime,
                    homeTeamLogo: baseData.homeLogo,
                    homeTeamName: baseData.homeChs,
                    awayTeamLogo: baseData.awayLogo,
                    awayTeamName: baseData.awayChs,
                    participants: guessData.guessNum,
                    handicap: guessData.handicap,
                    handicapInChinese: guessData.handicapInChinese,
                    overUnder: guessData.overUnder,
                    guessHomeAway: covertGuessStatus(true, guessData.home.itemType) as
                        | 'home'
                        | 'away'
                        | 'none',
                    guessBigSmall: covertGuessStatus(false, guessData.over.itemType) as
                        | 'over'
                        | 'under'
                        | 'none',
                    home: guessData.home.peopleNum,
                    away: guessData.away.peopleNum,
                    big: guessData.over.peopleNum,
                    small: guessData.under.peopleNum
                });
                setGuessesLeft(guessData.remainingGuessTimes);
            }
        }
        void fetchMatchDetail();
    }, [matchId, isLogin, userInfo.uid]);

    return (
        <div className={style.vsBox}>
            <div className={style.title}>
                {detailInfo.leagueName} {timestampToDateString(detailInfo.dateTime)}
            </div>
            <div className={style.clubInfo}>
                <div className={style.team}>
                    <Image
                        alt=""
                        height={48}
                        src={
                            detailInfo.homeTeamLogo === '0'
                                ? defaultTeamLogo.src
                                : detailInfo.homeTeamLogo
                        }
                        width={48}
                    />
                    <div className={style.name}>{detailInfo.homeTeamName}</div>
                </div>
                <div className={style.fight}>VS</div>
                <div className={style.team}>
                    <Image
                        alt=""
                        height={48}
                        src={
                            detailInfo.awayTeamLogo === '0'
                                ? defaultTeamLogo.src
                                : detailInfo.awayTeamLogo
                        }
                        width={48}
                    />
                    <div className={style.name}>{detailInfo.awayTeamName}</div>
                </div>
            </div>
            <div className={style.join}>
                <span className={style.text}>
                    {detailInfo.participants}人参与競猜，点击预测后查看风向
                </span>
            </div>
            <div className={style.betting}>
                <BettingRow detail={detailInfo} leftLabel="主" rightLabel="客" />
                <BettingRow detail={detailInfo} leftLabel="大" rightLabel="小" />
            </div>
        </div>
    );
}

export default VsBox;

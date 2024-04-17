import Image from 'next/image';
import { convertHandicap } from 'lib';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useLiveContestStore } from '@/store/liveContestStore';
import { useFormattedTime } from '@/hooks/useFormattedTime';
import defaultTeamLogo from '@/app/football/[matchId]/img/defaultTeamLogo.png';
import { useUserStore } from '@/store/userStore';
import MasterIcon from '../img/master.svg';
import AiIcon from '../img/aiButtom.svg';
import { CompareOdds } from './compareOdds';
import { useGuessContestListStore } from './contestStore';
import style from './gameCard.module.scss';

function GameCard({ matchId }: { matchId: number }) {
    const router = useRouter();
    const setAiPredictMatchId = useUserStore.use.setAiPredictMatchId();
    const contestInfo = useGuessContestListStore.use.contestGuessInfo()[matchId];
    const globalStore = useLiveContestStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    const currentMatchTime = useFormattedTime({
        timeStamp: contestInfo.matchTime,
        formattedString: 'HH:mm'
    });
    const handelAiPredict = (e: MouseEvent<HTMLDivElement>, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        setAiPredictMatchId(id);
        router.push('./aiPredict');
    };

    return (
        <section>
            <Link href={`/guess/detail/${matchId}`}>
                <div className={style.gameTitle}>
                    <div>
                        <span className={style.leagueName} style={{ color: contestInfo.color }}>
                            {contestInfo.leagueName}
                        </span>
                        <span className={style.time}>
                            {contestInfo.matchTime ? currentMatchTime : null}
                        </span>
                    </div>
                    {contestInfo.hasAiPredict ? (
                        <div
                            className={style.aiTitle}
                            onClick={e => {
                                handelAiPredict(e, contestInfo.matchId);
                            }}
                        >
                            <AiIcon />
                        </div>
                    ) : null}
                </div>
                <div className={style.gameCard}>
                    <div className={style.left}>
                        <div className={style.team}>
                            <div className={style.homeTeamName}>
                                <Image
                                    alt=""
                                    height={20}
                                    src={
                                        contestInfo.homeLogo === '0'
                                            ? defaultTeamLogo.src
                                            : contestInfo.homeLogo
                                    }
                                    width={20}
                                />
                                {contestInfo.homeName}
                            </div>
                            <div className={style.awayTeamName}>
                                <Image
                                    alt=""
                                    height={20}
                                    src={
                                        contestInfo.awayLogo === '0'
                                            ? defaultTeamLogo.src
                                            : contestInfo.awayLogo
                                    }
                                    width={20}
                                />
                                {contestInfo.awayName}
                            </div>
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.dataInfo}>
                            <div className={style.odds}>
                                <div>初盤让分</div>
                                <CompareOdds
                                    defaultColor="#4A4A4A"
                                    value={
                                        syncData.handicapCurrent ||
                                        convertHandicap(contestInfo.handicap)
                                    }
                                />
                            </div>
                            <div className={style.oddsLightGray}>
                                <div>初盤大小</div>
                                <CompareOdds
                                    defaultColor="#4A4A4A"
                                    value={
                                        syncData.overUnderCurrent ||
                                        convertHandicap(contestInfo.overUnder)
                                    }
                                />
                            </div>
                        </div>
                        <div className={style.playerPredict}>
                            <div className={style.text}>玩家预测</div>
                            <div className={style.people}>
                                <MasterIcon />
                                {contestInfo.totalNum}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <hr className={style.line} />
        </section>
    );
}

export default GameCard;

import Image from 'next/image';
import { convertHandicap } from 'lib';
import Link from 'next/link';
import { useContestInfoStore } from '@/app/contestInfoStore';
import { useFormattedTime } from '@/hooks/useFormattedTime';
import MasterIcon from '../img/master.png';
import { CompareOdds } from './compareOdds';
import { useGuessContestListStore } from './contestStore';
import style from './gameCard.module.scss';

function GameCard({ matchId }: { matchId: number }) {
    const contestInfo = useGuessContestListStore.use.contestGuessInfo()[matchId];
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    const currentMatchTime = useFormattedTime({
        timeStamp: contestInfo.matchTime,
        formattedString: 'HH:mm'
    });

    return (
        <section>
            <Link href={`/recommend/guess/${matchId}`}>
                <div className={style.gameCard}>
                    <div className={style.left}>
                        <div className={style.gameTitle}>
                            {contestInfo.leagueName}
                            <span> {contestInfo.matchTime ? currentMatchTime : null}</span>
                        </div>
                        <div className={style.team}>
                            <div className={style.homeTeamName}>
                                <Image
                                    alt=""
                                    height={20}
                                    src={contestInfo.homeLogo === '0' ? '' : contestInfo.homeLogo}
                                    width={20}
                                />
                                {contestInfo.homeName}
                            </div>
                            <div className={style.awayTeamName}>
                                <Image
                                    alt=""
                                    height={20}
                                    src={contestInfo.awayLogo === '0' ? '' : contestInfo.awayLogo}
                                    width={20}
                                />
                                {contestInfo.awayName}
                            </div>
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.masterPredict}>
                            <Image alt="" src={MasterIcon} />
                            <span>{contestInfo.totalNum}</span> 专家预测
                        </div>
                        <div>
                            <div className={style.dataInfo}>
                                {syncData.handicapHomeCurrentOdds ||
                                contestInfo.handicapHomeOdds ||
                                syncData.handicapAwayCurrentOdds ||
                                contestInfo.handicapAwayOdds ? (
                                    <ul>
                                        <li>
                                            <CompareOdds
                                                value={
                                                    syncData.handicapHomeCurrentOdds ||
                                                    contestInfo.handicapHomeOdds
                                                }
                                            />
                                        </li>
                                        <li>
                                            <CompareOdds
                                                defaultColor="blue"
                                                value={
                                                    syncData.handicapCurrent ||
                                                    convertHandicap(contestInfo.handicap)
                                                }
                                            />
                                        </li>
                                        <li>
                                            <CompareOdds
                                                value={
                                                    syncData.handicapAwayCurrentOdds ||
                                                    contestInfo.handicapAwayOdds
                                                }
                                            />
                                        </li>
                                    </ul>
                                ) : null}
                                {syncData.overUnderUnderCurrentOdds ||
                                contestInfo.overUnderOverOdds ||
                                syncData.overUnderOverCurrentOdds ||
                                contestInfo.overUnderUnderOdds ? (
                                    <ul>
                                        <li>
                                            <CompareOdds
                                                value={
                                                    syncData.overUnderUnderCurrentOdds ||
                                                    contestInfo.overUnderOverOdds
                                                }
                                            />
                                        </li>
                                        <li>
                                            <CompareOdds
                                                defaultColor="blue"
                                                value={
                                                    syncData.overUnderCurrent ||
                                                    convertHandicap(contestInfo.overUnder)
                                                }
                                            />
                                        </li>
                                        <li>
                                            <CompareOdds
                                                value={
                                                    syncData.overUnderOverCurrentOdds ||
                                                    contestInfo.overUnderUnderOdds
                                                }
                                            />
                                        </li>
                                    </ul>
                                ) : null}
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

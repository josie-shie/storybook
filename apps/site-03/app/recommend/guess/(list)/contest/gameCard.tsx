// import { GameStatus } from 'ui';
// import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MasterIcon from '../img/master.png';
// import { CompareOdds } from './compareOdds';
import { useGuessContestListStore } from './contestStore';
import style from './gameCard.module.scss';
import { useContestInfoStore } from '@/app/contestInfoStore';
import { useFormattedTime } from '@/hooks/useFormattedTime';

function GameCard({ matchId }: { matchId: number }) {
    // const router = useRouter();
    // const goDetail = () => {
    //     router.push(`/recommend/guess/${matchId}`);
    // };
    const contestInfo = useGuessContestListStore.use.contestInfo()[matchId];
    const globalStore = useContestInfoStore.use.contestInfo();
    const syncData = Object.hasOwnProperty.call(globalStore, matchId) ? globalStore[matchId] : {};

    const currentMatchTime = useFormattedTime({
        timeStamp: contestInfo.matchTime,
        formattedString: 'HH:mm'
    });

    return (
        <section>
            <div className={style.gameCard}>
                <div className={style.left}>
                    <div className={style.gameTitle}>
                        {contestInfo.leagueChsShort}
                        <span> {contestInfo.matchTime ? currentMatchTime : null}</span>
                    </div>
                    <div className={style.team}>
                        <div>{contestInfo.homeChs}</div>
                        <div className={style.awayTeamName}>{contestInfo.awayChs}</div>
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.masterPredict}>
                        <Image alt="" src={MasterIcon} />
                        <span>382</span> 專家預測
                    </div>
                    <div>
                        <div className={style.dataInfo}>
                            <ul>
                                <li>
                                    {syncData.handicapHomeCurrentOdds ||
                                        contestInfo.handicapHomeCurrentOdds}
                                </li>
                                <li>{syncData.handicapCurrent || contestInfo.handicapCurrent}</li>
                                <li>
                                    {syncData.handicapAwayCurrentOdds ||
                                        contestInfo.overUnderOverCurrentOdds}
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    {syncData.overUnderUnderCurrentOdds ||
                                        contestInfo.handicapAwayCurrentOdds}
                                </li>
                                <li>{syncData.overUnderCurrent || contestInfo.overUnderCurrent}</li>
                                <li>
                                    {syncData.overUnderOverCurrentOdds ||
                                        contestInfo.overUnderUnderCurrentOdds}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr className={style.line} />
        </section>
        // <section
        //     className={style.contesntList}
        //     onClick={() => {
        //         goDetail();
        //     }}
        // >
        //     <div className={style.title}>
        //         <span className={style.sport} style={{ color: contestInfo.color }}>
        //             {contestInfo.leagueChsShort}
        //         </span>
        //         <span className={style.time}>
        //             {contestInfo.matchTime ? currentMatchTime : null}
        //         </span>
        //         <div className={style.status}>
        //             <GameStatus
        //                 startTime={contestInfo.startTime}
        //                 status={syncData.state || contestInfo.state}
        //             />
        //         </div>
        //     </div>
        //     <div className={style.game}>
        //         <div className={`${style.team} ${style.home}`}>
        //             <div className={style.name}>{contestInfo.homeChs}</div>
        //             <div className={style.odds}>
        //                 {syncData.handicapHomeCurrentOdds ||
        //                 syncData.handicapAwayCurrentOdds ||
        //                 contestInfo.handicapHomeCurrentOdds ||
        //                 contestInfo.handicapAwayCurrentOdds ? (
        //                     <>
        //                         <CompareOdds
        //                             value={
        //                                 syncData.handicapHomeCurrentOdds ||
        //                                 contestInfo.handicapHomeCurrentOdds
        //                             }
        //                         />
        //                         <CompareOdds
        //                             defaultColor="blue"
        //                             value={syncData.handicapCurrent || contestInfo.handicapCurrent}
        //                         />
        //                         <CompareOdds
        //                             value={
        //                                 syncData.handicapAwayCurrentOdds ||
        //                                 contestInfo.handicapAwayCurrentOdds
        //                             }
        //                         />
        //                     </>
        //                 ) : null}
        //                 {/* <span>123</span>
        //                 <span>0/0.5</span>
        //                 <span>1.00</span> */}
        //             </div>
        //         </div>

        //         <div className={style.mid}>
        //             {(syncData.state || contestInfo.state) !== 0 ? (
        //                 <span className={`${style.status} ${style.ing}`}>
        //                     {syncData.homeScore || contestInfo.homeScore} -{' '}
        //                     {syncData.awayScore || contestInfo.awayScore}
        //                 </span>
        //             ) : (
        //                 <span className={style.status}>VS</span>
        //             )}

        //             {(syncData.state || contestInfo.state) < 0 ||
        //             (syncData.state || contestInfo.state) > 2 ? (
        //                 <span className={style.status}>
        //                     ({syncData.homeHalfScore || contestInfo.homeHalfScore} -{' '}
        //                     {syncData.awayHalfScore || contestInfo.awayHalfScore})
        //                 </span>
        //             ) : null}
        //         </div>

        //         <div className={`${style.team} ${style.away}`}>
        //             <div className={style.name}>{contestInfo.awayChs}</div>
        //             <div className={style.odds}>
        //                 {syncData.overUnderUnderCurrentOdds ||
        //                 syncData.overUnderOverCurrentOdds ||
        //                 contestInfo.overUnderUnderCurrentOdds ||
        //                 contestInfo.overUnderOverCurrentOdds ? (
        //                     <>
        //                         <CompareOdds
        //                             value={
        //                                 syncData.overUnderUnderCurrentOdds ||
        //                                 contestInfo.overUnderUnderCurrentOdds
        //                             }
        //                         />
        //                         <CompareOdds
        //                             defaultColor="blue"
        //                             value={
        //                                 syncData.overUnderCurrent || contestInfo.overUnderCurrent
        //                             }
        //                         />
        //                         <CompareOdds
        //                             value={
        //                                 syncData.overUnderOverCurrentOdds ||
        //                                 contestInfo.overUnderOverCurrentOdds
        //                             }
        //                         />
        //                     </>
        //                 ) : null}
        //             </div>
        //         </div>
        //     </div>
        //     <div className={style.bar}>
        //         <span>100位玩家預測該場</span>
        //         <span className={style.plan}>高手方案</span>
        //     </div>
        // </section>
    );
}

export default GameCard;

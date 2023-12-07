'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import backLeftArrowImg from '../img/backLeftArrow.png';
import GuessRecord from './guessRecord/guessRecord';
import style from './myGuess.module.scss';
import RecentPerformance from './myGuessRecentPerformance';
import MyGuessMyPlans from './myGuessMyPlans';
import { creatMyGuessStoreStore } from './myGuessStore';

function MyGuess() {
    const router = useRouter();
    const [isOpenRecord, setIsOpenRecord] = useState(false);

    creatMyGuessStoreStore({
        myGuess: {
            rank: 1,
            recentPerformance: {
                byWeek: {
                    rank: 0,
                    summary: { play: 100, win: 50, draw: 0, lose: 50 },
                    handicap: { play: 75, win: 50, draw: 0, lose: 25 },
                    size: { play: 25, win: 10, draw: 0, lose: 15 }
                },
                byMonth: {
                    rank: 0,
                    summary: { play: 150, win: 70, draw: 30, lose: 50 },
                    handicap: { play: 100, win: 50, draw: 20, lose: 30 },
                    size: { play: 50, win: 20, draw: 10, lose: 20 }
                },
                byQuarter: {
                    rank: 0,
                    summary: { play: 100, win: 50, draw: 10, lose: 40 },
                    handicap: { play: 100, win: 20, draw: 40, lose: 40 },
                    size: { play: 100, win: 50, draw: 20, lose: 30 }
                }
            },
            myPlans: {
                totale: [
                    {
                        id: 1,
                        matchId: 10,
                        matchTime: 6549857483,
                        bettingType: 'draw',
                        leagueId: 10,
                        leagueName: '欧锦U20A',
                        homeTeamName: '德国U20A',
                        awayTeamName: '斯洛文尼亚U20',
                        handicapOdds: '受平/半',
                        overUnderOdds: 10,
                        predictedPlay: 'away',
                        predictionResult: 'lose',
                        isPaidToRead: '222'
                    },
                    {
                        id: 2,
                        matchId: 10,
                        matchTime: 6549857483,
                        bettingType: 'size',
                        leagueId: 10,
                        leagueName: '欧锦U20A',
                        homeTeamName: '德国U20A',
                        awayTeamName: '斯洛文尼亚U20',
                        handicapOdds: '',
                        overUnderOdds: 10,
                        predictedPlay: 'over',
                        predictionResult: 'win',
                        isPaidToRead: '222'
                    }
                ],
                handicap: [
                    {
                        id: 22,
                        matchId: 10,
                        matchTime: 6549857483,
                        bettingType: 'draw',
                        leagueId: 10,
                        leagueName: '欧锦U20A111',
                        homeTeamName: '德国U20A',
                        awayTeamName: '斯洛文尼亚U20',
                        handicapOdds: '平/半',
                        overUnderOdds: 10,
                        predictedPlay: 'home',
                        predictionResult: 'win',
                        isPaidToRead: '222'
                    },
                    {
                        id: 23,
                        matchId: 10,
                        matchTime: 6549857483,
                        bettingType: 'draw',
                        leagueId: 10,
                        leagueName: '欧锦U20A111',
                        homeTeamName: '德国U20A',
                        awayTeamName: '斯洛文尼亚U20',
                        handicapOdds: '平/半',
                        overUnderOdds: 10,
                        predictedPlay: 'away',
                        predictionResult: 'none',
                        isPaidToRead: '222'
                    }
                ],
                size: []
            },
            guessRecordList: []
        }
    });

    return (
        <>
            <div className={style.placeholder}>
                <div className={style.headerDetail}>
                    <div className={style.title}>
                        <Image
                            alt=""
                            height={24}
                            onClick={() => {
                                router.push('/userInfo');
                            }}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div className={style.text}>我的猜球</div>
                    </div>
                </div>
            </div>

            <div className={style.myGuess}>
                <RecentPerformance />
                <MyGuessMyPlans setIsOpenRecord={setIsOpenRecord} />
            </div>
            <GuessRecord isOpenRecord={isOpenRecord} setIsOpenRecord={setIsOpenRecord} />
        </>
    );
}

export default MyGuess;

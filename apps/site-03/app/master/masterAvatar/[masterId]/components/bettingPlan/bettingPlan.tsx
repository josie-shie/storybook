import Image from 'next/image';
import { getMemberIndividualGuessMatches, type MemberIndividualGuessMatch } from 'data-center';
import { useEffect, useState } from 'react';
import { timestampToString } from 'lib';
import UnlockButton from '@/components/unlockButton/unlockButton';
import IconWin from './img/win.png';
import IconLose from './img/lose.png';
import IconDraw from './img/draw.png';
import style from './bettingPlan.module.scss';

type Tab = 0 | 1 | 2;

function BettingPlan({
    planActiveTab,
    setGuessLength
}: {
    planActiveTab: Tab;
    setGuessLength: (val: number) => void;
}) {
    const [guessMatchesList, setGuessMatchesList] = useState<MemberIndividualGuessMatch[]>([]);

    const fetchData = async () => {
        const res = await getMemberIndividualGuessMatches({
            memberId: 1,
            currentPage: 1,
            pageSize: 1,
            guessType: planActiveTab
        });

        if (!res.success) {
            return new Error();
        }

        setGuessMatchesList(res.data.guessMatchList);
        setGuessLength(res.data.guessMatchList.length);
    };

    const filterIcon = {
        WIN: <Image alt="icon" className={style.iconWin} src={IconWin} />,
        LOSE: <Image alt="icon" className={style.iconDefeat} src={IconLose} />,
        DRAW: <Image alt="icon" className={style.iconDefeat} src={IconDraw} />
    };

    const filterPlay = {
        HOME: '让球',
        AWAY: '让球',
        OVER: '大小',
        UNDER: '大小',
        HANDICAP: '让球',
        OVERUNDER: '大小'
    };

    const filterOdds = {
        HOME: 'handicap',
        AWAY: 'handicap',
        OVER: 'overUnder',
        UNDER: 'overUnder',
        HANDICAP: 'handicap',
        OVERUNDER: 'overUnder'
    };

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <>
            {guessMatchesList.map(item => {
                return (
                    <div className={style.bettingPlan} key={item.id}>
                        {filterIcon[item.predictionResult]}
                        <div className={style.top}>
                            {item.leagueName}
                            <span className={style.time}>
                                {' '}
                                | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                            </span>
                        </div>
                        <div className={style.mid}>
                            <span className={style.plan}>{filterPlay[item.predictedPlay]}</span>
                            <div className={style.combination}>
                                {item.homeTeamName} vs {item.awayTeamName}
                            </div>
                        </div>
                        <div className={style.bot}>
                            <div className={style.message}>
                                {filterOdds[item.handicapOdds] === 'handicap'
                                    ? item.handicapOdds
                                    : item.overUnderOdds}
                                {item.predictionResult}
                            </div>

                            {/* TODO: 請後端吐價格 */}
                            {item.isPaidToRead ? <UnlockButton price={20} /> : null}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default BettingPlan;

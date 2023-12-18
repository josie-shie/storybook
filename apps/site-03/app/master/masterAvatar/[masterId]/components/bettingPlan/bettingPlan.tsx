import Image from 'next/image';
import { getMemberIndividualGuessMatches, type MemberIndividualGuessMatch } from 'data-center';
import { useEffect, useState } from 'react';
import { timestampToString } from 'lib';
import UnlockButton from '@/components/unlockButton/unlockButton';
import iconWin from './img/win.png';
import iconDefeat from './img/defeat.png';
import style from './bettingPlan.module.scss';

type Tab = 0 | 1 | 2;

function BettingPlan({ planActiveTab }: { planActiveTab: Tab }) {
    const [guessMatchesList, setGuessMatchesList] = useState<MemberIndividualGuessMatch[]>([]);

    const fetchData = async () => {
        try {
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
        } catch (error) {
            return new Error();
        }
    };

    const filterIcon = {
        WIN: <Image alt="icon" className={style.iconWin} src={iconWin} />,
        LOSE: <Image alt="icon" className={style.iconDefeat} src={iconDefeat} />,
        DRAW: <Image alt="icon" className={style.iconDefeat} src={iconDefeat} />,
        NONE: <Image alt="icon" className={style.iconDefeat} src={iconDefeat} />
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
                            {item.isPaidToRead ? <UnlockButton /> : ''}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default BettingPlan;

'use client';
import type { GetContestListResponse } from 'data-center';
import GameCard from './components/gameCard';
import style from './football.module.scss';
import { creatContestListStore, useContestListStore } from './contestListStore';
import { useContestInfoStore } from '@/app/contestInfoStore';

function ContestList() {
    const contestList = useContestListStore.use.contestList();
    const contestInfo = useContestListStore.use.contestInfo();
    const globalStore = useContestInfoStore.use.contestInfo();
    const currentList = contestList.filter(item => {
        if (
            Object.hasOwnProperty.call(globalStore, item) &&
            globalStore[item].state !== undefined
        ) {
            const state: number = globalStore[item].state as unknown as number;
            return state <= 5 && state > 0;
        }
        return contestInfo[item].state <= 5 && contestInfo[item].state > 0;
    });

    return (
        <ul>
            {currentList.map(matchId => {
                return <GameCard key={matchId} matchId={matchId} />;
            })}
        </ul>
    );
}

function Football({ todayContest }: { todayContest: GetContestListResponse }) {
    creatContestListStore(todayContest);

    return (
        <div className={style.football}>
            <ContestList />
        </div>
    );
}

export default Football;

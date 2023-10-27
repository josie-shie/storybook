'use client';
import type { GetContestListResponse } from 'data-center';
import GameCard from './components/gameCard';
import style from './football.module.scss';
import { creatTodayStore, useTodayStore } from '@/app/todayContestStore';

function ContestList() {
    const contestList = useTodayStore.use.contestList();

    return (
        <ul>
            {contestList.map(matchId => {
                return <GameCard key={matchId} matchId={matchId} />;
            })}
        </ul>
    );
}

function Football({ todayContest }: { todayContest: GetContestListResponse }) {
    creatTodayStore(todayContest);

    return (
        <div className={style.football}>
            <ContestList />
        </div>
    );
}

export default Football;

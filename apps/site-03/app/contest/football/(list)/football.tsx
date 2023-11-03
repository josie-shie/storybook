'use client';
import type { GetContestListResponse } from 'data-center';
import GameCard from './components/gameCard';
import style from './football.module.scss';
import { creatContestListStore, useContestListStore } from './contestListStore';

function ContestList() {
    const contestList = useContestListStore.use.contestList();

    return (
        <ul>
            {contestList.map(matchId => {
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

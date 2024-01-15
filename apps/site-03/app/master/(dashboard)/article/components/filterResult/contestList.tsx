'use client';

import Image from 'next/image';
import Button from '@mui/material/Button';
import { timestampToString } from 'lib';
import ArticleIcon from '../../img/article.png';
import { useArticleStore } from '../../articleStore';
import style from './contestList.module.scss';

function ContestCard({ matchId }: { matchId: number }) {
    const filterContestList = useArticleStore.use.filterContestList();
    const setSelectedMatchList = useArticleStore.use.setSelectedMatchList();
    const contestInfo = filterContestList[matchId][0];

    return (
        <li className={style.contestCard}>
            <div className={style.information}>
                <div className={style.contestInfo}>
                    <p className={style.league}>{contestInfo.leagueName}</p>
                    <p className={style.startTime}>
                        {timestampToString(contestInfo.createdAt, 'HH:mm')}
                    </p>
                </div>
                <div className={style.battleInfo}>
                    <p className={style.teamName}>{contestInfo.homeTeamName}</p>
                    <span className={style.vs}>VS</span>
                    <p className={style.teamName}>{contestInfo.awayTeamName}</p>
                </div>
            </div>
            <Button
                className={style.articleBtn}
                onClick={() => {
                    setSelectedMatchList({ filterSelectedMatchList: filterContestList[matchId] });
                }}
                startIcon={<Image alt="文章" height={16} src={ArticleIcon} width={16} />}
                variant="contained"
            >
                {filterContestList[matchId].length}篇文章
            </Button>
        </li>
    );
}

function ContestList() {
    const filterMatchList = useArticleStore.use.filterMatchList();

    return (
        <div>
            <ul className={style.contestList}>
                {filterMatchList.map(matchId => (
                    <ContestCard key={matchId} matchId={matchId} />
                ))}
            </ul>
        </div>
    );
}

export default ContestList;

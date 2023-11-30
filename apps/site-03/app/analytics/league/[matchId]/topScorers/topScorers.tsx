'use client';
import { useDataStore } from '../../../dataStore';
import style from './topScorers.module.scss';

function TopScorers() {
    const topScorersList = useDataStore.use.topScorersList();

    return (
        <div className={style.topScorers}>
            <div className={style.table}>
                <div className={style.tableHead}>
                    <div className={style.row}>
                        <div className={style.td}>排名</div>
                        <div className={style.td}>球员</div>
                        <div className={style.td}>球队</div>
                        <div className={style.td}>进球</div>
                        <div className={style.td}>主进</div>
                        <div className={style.td}>客进</div>
                    </div>
                </div>
                <div className={style.tableBody}>
                    {topScorersList.map((item, idx) => (
                        <div className={style.row} key={idx}>
                            <div className={style.value}>{item.ranking}</div>
                            <div className={style.value}>{item.member}</div>
                            <div className={style.value}>{item.team}</div>
                            <div className={style.value}>{item.score}</div>
                            <div className={style.value}>{item.homeScore}</div>
                            <div className={style.value}>{item.awayScore}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopScorers;

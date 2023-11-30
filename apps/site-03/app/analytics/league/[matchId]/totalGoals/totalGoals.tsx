'use client';
import { useDataStore } from '../../../dataStore';
import style from './totalGoals.module.scss';

function TotalGoals() {
    const totalGoalsList = useDataStore.use.totalGoalsList();

    return (
        <div className={style.totalGoals}>
            <div className={style.table}>
                <div className={style.tableHead}>
                    <div className={style.row}>
                        <div className={style.td}>隊伍</div>
                        <div className={style.td}>賽</div>
                        <div className={style.td}>大</div>
                        <div className={style.td}>走</div>
                        <div className={style.td}>小</div>
                        <div className={style.td}>大%</div>
                        <div className={style.td}>走%</div>
                        <div className={style.td}>小%</div>
                    </div>
                </div>
                <div className={style.tableBody}>
                    {totalGoalsList.map((item, idx) => (
                        <div className={style.row} key={idx}>
                            <div className={style.value}>{item.team}</div>
                            <div className={style.value}>{item.game}</div>
                            <div className={style.value}>{item.big}</div>
                            <div className={style.value}>{item.draw}</div>
                            <div className={style.value}>{item.small}</div>
                            <div className={style.value}>{item.bigPercent}</div>
                            <div className={style.value}>{item.drawPercent}</div>
                            <div className={style.value}>{item.smallPercent}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TotalGoals;

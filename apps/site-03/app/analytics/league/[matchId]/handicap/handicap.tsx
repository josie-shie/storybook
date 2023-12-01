'use client';
import { useAnalyticsStore } from '../../../analyticsStore';
import style from './handicap.module.scss';

function Handicap() {
    const handicapList = useAnalyticsStore.use.handicapList();

    return (
        <div className={style.handicap}>
            <div className={style.table}>
                <div className={style.tableHead}>
                    <div className={style.row}>
                        <div className={style.td}>隊伍</div>
                        <div className={style.td}>賽</div>
                        <div className={style.td}>贏</div>
                        <div className={style.td}>走</div>
                        <div className={style.td}>輸</div>
                        <div className={style.td}>贏%</div>
                        <div className={style.td}>走%</div>
                        <div className={style.td}>輸%</div>
                        <div className={style.td}>淨</div>
                    </div>
                </div>
                <div className={style.tableBody}>
                    {handicapList.map((item, idx) => (
                        <div className={style.row} key={idx}>
                            <div className={style.value}>{item.team}</div>
                            <div className={style.value}>{item.game}</div>
                            <div className={style.value}>{item.win}</div>
                            <div className={style.value}>{item.draw}</div>
                            <div className={style.value}>{item.lose}</div>
                            <div className={style.value}>{item.winPercent}</div>
                            <div className={style.value}>{item.drawPercent}</div>
                            <div className={style.value}>{item.losePercent}</div>
                            <div className={style.value}>{item.total}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Handicap;

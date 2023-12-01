'use client';
import { useAnalyticsStore } from '../../../analyticsStore';
import style from './schedule.module.scss';

function Schedule() {
    const scheduleList = useAnalyticsStore.use.scheduleList();

    const statusMap = {
        finish: '完场',
        inProgress: '進行中'
    };

    return (
        <div className={style.schedule}>
            <div className={style.table}>
                <div className={style.tableHead}>
                    <div className={style.row}>
                        <div className={style.td}>时间</div>
                        <div className={style.td}>状态</div>
                        <div className={style.td}>主队</div>
                        <div className={style.td}>比分</div>
                        <div className={style.td}>客队</div>
                    </div>
                </div>
                <div className={style.tableBody}>
                    {scheduleList.map((item, idx) => (
                        <div className={style.row} key={idx}>
                            <div className={style.value}>{item.time}</div>
                            <div className={style.value}>{statusMap[item.status]}</div>
                            <div className={style.value}>{item.home}</div>
                            <div className={style.value}>
                                {item.homeScore}:{item.awayScore}
                            </div>
                            <div className={style.value}>{item.away}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Schedule;

import style from './schedule.module.scss';

interface Item {
    time: string;
    status: string;
    home: string;
    homeScore: number;
    away: string;
    awayScore: number;
}

function Schedule() {
    const dataList: Item[] = [
        {
            time: '05-28 23:30',
            status: 'finish',
            home: '南安普敦',
            homeScore: 4,
            away: '利物浦',
            awayScore: 4
        },
        {
            time: '05-28 23:30',
            status: 'finish',
            home: '南安普敦',
            homeScore: 4,
            away: '利物浦',
            awayScore: 4
        },
        {
            time: '05-28 23:30',
            status: 'finish',
            home: '南安普敦',
            homeScore: 4,
            away: '利物浦',
            awayScore: 4
        },
        {
            time: '05-28 23:30',
            status: 'finish',
            home: '南安普敦',
            homeScore: 4,
            away: '利物浦',
            awayScore: 4
        },
        {
            time: '05-28 23:30',
            status: 'finish',
            home: '南安普敦',
            homeScore: 4,
            away: '利物浦',
            awayScore: 4
        },
        {
            time: '05-28 23:30',
            status: 'finish',
            home: '南安普敦',
            homeScore: 4,
            away: '利物浦',
            awayScore: 4
        }
    ];

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
                    {dataList.map((item, idx) => (
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

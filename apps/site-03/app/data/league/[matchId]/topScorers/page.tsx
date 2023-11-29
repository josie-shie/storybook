import style from './topScorers.module.scss';

interface Item {
    ranking: number;
    member: string;
    team: string;
    score: number;
    homeScore: number;
    awayScore: number;
}

function TopScorers() {
    const dataList: Item[] = [
        {
            ranking: 1,
            member: '哈兰德',
            team: '南安普敦',
            score: 36,
            homeScore: 22,
            awayScore: 14
        },
        {
            ranking: 2,
            member: '凯恩',
            team: '切尔西',
            score: 36,
            homeScore: 22,
            awayScore: 14
        },
        {
            ranking: 3,
            member: '哈兰德',
            team: '南安普敦',
            score: 36,
            homeScore: 22,
            awayScore: 14
        },
        {
            ranking: 4,
            member: '凯恩',
            team: '切尔西',
            score: 36,
            homeScore: 22,
            awayScore: 14
        },
        {
            ranking: 5,
            member: '哈兰德',
            team: '南安普敦',
            score: 36,
            homeScore: 22,
            awayScore: 14
        },
        {
            ranking: 6,
            member: '凯恩',
            team: '切尔西',
            score: 36,
            homeScore: 22,
            awayScore: 14
        }
    ];

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
                    {dataList.map((item, idx) => (
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

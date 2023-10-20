import Rule from '../components/rule/rule';
import ContestList from '../components/contestList/contestList';
// import { creatNewsStore } from './contestStore';
import style from './contest.module.scss';

function Contest() {
    const contestList = [
        {
            sport: '亞運男足',
            time: '11:30',
            homeTeam: '泰国国立法政大学泰国国立法政大学',
            awayTeam: '北曼谷学院北曼谷学院',
            member: 124,
            plan: true,
            odds: 0.85,
            score: '',
            status: 0
        },
        {
            sport: '巴西甲',
            time: '11:30',
            homeTeam: '泰国国立法政大学',
            awayTeam: '北曼谷学院',
            member: 124,
            plan: false,
            odds: 0.85,
            score: '1-1',
            status: 1
        },
        {
            sport: '巴西甲',
            time: '11:30',
            homeTeam: '泰国国立法政大学',
            awayTeam: '北曼谷学院',
            member: 124,
            plan: false,
            odds: 0.85,
            score: '1-1',
            status: 2
        },
        {
            sport: '巴西甲',
            time: '11:30',
            homeTeam: '泰国国立法政大学',
            awayTeam: '北曼谷学院',
            member: 124,
            plan: false,
            odds: 0.85,
            score: '1-1',
            status: 2
        },
        {
            sport: '巴西甲',
            time: '11:30',
            homeTeam: '泰国国立法政大学',
            awayTeam: '北曼谷学院',
            member: 124,
            plan: false,
            odds: 0.85,
            score: '1-1',
            status: 2
        },
        {
            sport: '巴西甲',
            time: '11:30',
            homeTeam: '泰国国立法政大学',
            awayTeam: '北曼谷学院',
            member: 124,
            plan: false,
            odds: 0.85,
            score: '1-1',
            status: 2
        }
    ];

    return (
        <div className={style.contest}>
            <div className={style.control}>
                <div className={style.right}>
                    <Rule />
                </div>
            </div>
            {contestList.map(item => (
                <ContestList
                    awayTeam={item.awayTeam}
                    homeTeam={item.homeTeam}
                    key={item.sport}
                    member={item.member}
                    odds={item.odds}
                    plan={item.plan}
                    score={item.score}
                    sport={item.sport}
                    status={item.status}
                    time={item.time}
                />
            ))}
        </div>
    );
}

export default Contest;

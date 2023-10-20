import Rule from '../components/rule/rule';
import ContestList from '../components/contestList/contestList';
import { creatContestStore } from './contestStore';
import style from './contest.module.scss';

function Contest() {
    creatContestStore({
        contestList: [
            {
                matchId: '1',
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
                matchId: '2',
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
                matchId: '3',
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
                matchId: '4',
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
                matchId: '5',
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
        ]
    });

    return (
        <div className={style.contest}>
            <div className={style.control}>
                <div className={style.right}>
                    <Rule />
                </div>
            </div>
            <ContestList />
        </div>
    );
}

export default Contest;

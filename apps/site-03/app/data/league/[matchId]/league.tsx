'use client';
import { useParams } from 'next/navigation';
import style from './league.module.scss';
import { Tabs } from '@/components/tabs/tabs';

interface Item {
    id: number;
    ranking: number;
    label: number | null;
    name: string;
    total: number;
    wins: number;
    draws: number;
    losses: number;
    scored: number;
    against: number;
    matches: number;
}

function League() {
    const params = useParams();
    const matchId = params.matchId as string;

    const itemList: Item[] = [
        {
            id: 1,
            ranking: 1,
            label: 3,
            name: '曼彻斯特城',
            matches: 39,
            wins: 28,
            draws: 5,
            losses: 5,
            scored: 94,
            against: 33,
            total: 89
        },
        {
            id: 2,
            ranking: 2,
            label: 3,
            name: '阿森納',
            matches: 39,
            wins: 28,
            draws: 5,
            losses: 5,
            scored: 94,
            against: 33,
            total: 89
        },
        {
            id: 3,
            ranking: 3,
            label: null,
            name: '曼彻斯特城',
            matches: 39,
            wins: 28,
            draws: 5,
            losses: 5,
            scored: 94,
            against: 33,
            total: 89
        },
        {
            id: 4,
            ranking: 4,
            label: 3,
            name: '利物浦',
            matches: 39,
            wins: 28,
            draws: 5,
            losses: 5,
            scored: 94,
            against: 33,
            total: 89
        },
        {
            id: 5,
            ranking: 5,
            label: 2,
            name: '布萊頓',
            matches: 39,
            wins: 28,
            draws: 5,
            losses: 5,
            scored: 94,
            against: 33,
            total: 89
        },
        {
            id: 6,
            ranking: 6,
            label: 1,
            name: '阿斯頓維拉',
            matches: 39,
            wins: 28,
            draws: 5,
            losses: 5,
            scored: 94,
            against: 33,
            total: 89
        },
        {
            id: 7,
            ranking: 7,
            label: null,
            name: '托特納姆熱刺',
            matches: 39,
            wins: 28,
            draws: 5,
            losses: 5,
            scored: 94,
            against: 33,
            total: 89
        },
        {
            id: 8,
            ranking: 8,
            label: null,
            name: '布侖特福德',
            matches: 39,
            wins: 28,
            draws: 5,
            losses: 5,
            scored: 94,
            against: 33,
            total: 89
        },
        {
            id: 9,
            ranking: 9,
            label: 4,
            name: '布侖特福德',
            matches: 39,
            wins: 28,
            draws: 5,
            losses: 5,
            scored: 94,
            against: 33,
            total: 89
        }
    ];

    const labelMap = [
        { id: 1, name: '欧冠杯小组赛资格', color: '#CC141D' },
        { id: 2, name: '欧罗巴联赛杯小组赛', color: '#4489FF' },
        { id: 3, name: '欧会杯小组赛资格', color: '#009A63' },
        { id: 4, name: '降級球隊', color: '#8D8D8D' }
    ];

    return (
        <div className={style.league}>
            <Tabs
                labels={['總積分', '半場積分', '主場積分', '客場積分']}
                paths={[
                    `/data/league/${matchId}`,
                    `/data/league/${matchId}?status=half`,
                    `/data/league/${matchId}?status=home`,
                    `/data/league/${matchId}?status=away`
                ]}
                styling="button"
            />
            <div className={style.table}>
                <div className={style.tableHead}>
                    <div className={style.row}>
                        <div className={style.td}>排名</div>
                        <div className={style.td}>球隊</div>
                        <div className={style.td}>賽</div>
                        <div className={style.td}>勝</div>
                        <div className={style.td}>平</div>
                        <div className={style.td}>負</div>
                        <div className={style.td}>得</div>
                        <div className={style.td}>失</div>
                        <div className={style.td}>積</div>
                    </div>
                </div>
                <div className={style.tableBody}>
                    {itemList.map(item => (
                        <div className={style.row} key={item.id}>
                            <div
                                className={style.mark}
                                style={{
                                    background: labelMap.find(el => el.id === item.label)?.color
                                }}
                            />
                            <div className={style.value}>{item.ranking}</div>
                            <div className={style.value}>{item.name}</div>
                            <div className={style.value}>{item.matches}</div>
                            <div className={style.value}>{item.wins}</div>
                            <div className={style.value}>{item.draws}</div>
                            <div className={style.value}>{item.losses}</div>
                            <div className={style.value}>{item.scored}</div>
                            <div className={style.value}>{item.against}</div>
                            <div className={style.value}>{item.total}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={style.labelContent}>
                {labelMap.map(el => (
                    <div className={style.label} key={el.id}>
                        <div className={style.flag} style={{ background: el.color }} />
                        <div className={style.type}>{el.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default League;

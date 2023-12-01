'use client';
import { useParams } from 'next/navigation';
import { useAnalyticsStore } from '../../analyticsStore';
import style from './league.module.scss';
import { Tabs } from '@/components/tabs/tabs';

function League() {
    const params = useParams();
    const matchId = params.matchId as string;
    const pointsList = useAnalyticsStore.use.pointsList();

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
                    {pointsList.map(item => (
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

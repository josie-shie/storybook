'use client';
import { useParams } from 'next/navigation';
import { Tabs } from '@/components/tabs/tabs';
import { useAnalyticsStore } from '../../analyticsStore';
import style from './league.module.scss';

function LeagueContent() {
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
                labels={['总积分', '半场积分', '主场积分', '客场积分']}
                paths={[
                    `/analytics/league/${matchId}`,
                    `/analytics/league/${matchId}?status=half`,
                    `/analytics/league/${matchId}?status=home`,
                    `/analytics/league/${matchId}?status=away`
                ]}
                styling="button"
            />
            <div className={style.table}>
                <div className={style.tableHead}>
                    <div className={style.row}>
                        <div className={style.td}>排名</div>
                        <div className={style.td}>球队</div>
                        <div className={style.td}>赛</div>
                        <div className={style.td}>胜</div>
                        <div className={style.td}>平</div>
                        <div className={style.td}>负</div>
                        <div className={style.td}>得</div>
                        <div className={style.td}>失</div>
                        <div className={style.td}>积</div>
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

function League() {
    return <LeagueContent />;
}

export default League;

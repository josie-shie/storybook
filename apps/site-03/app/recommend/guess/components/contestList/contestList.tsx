'use client';
import { useRouter } from 'next/navigation';
import { useContestStore } from '../../contest/contestStore';
import style from './contestList.module.scss';

function ContestList() {
    const router = useRouter();
    const contestList = useContestStore.use.contestList();

    const statusLabel = (status: number) => {
        switch (status) {
            case 0:
                return <div className={style.status}>未</div>;
            case 1:
                return <div className={`${style.status} ${style.ing}`}>{`72'`}</div>;
            case 2:
                return <div className={style.status}>完</div>;
            default:
                return null;
        }
    };

    const goDetail = (id?: string) => {
        router.push(`/recommend/guess/${id}`);
    };

    return (
        <>
            {contestList.map(item => {
                return (
                    <section
                        className={style.contesntList}
                        key={item.matchId}
                        onClick={() => {
                            goDetail(item.matchId);
                        }}
                    >
                        <div className={style.title}>
                            <span className={style.sport}>{item.sport}</span>
                            <span className={style.time}>{item.time}</span>
                            {statusLabel(item.status || 0)}
                        </div>
                        <div className={style.game}>
                            <div className={`${style.team} ${style.home}`}>
                                <div className={style.name}>{item.homeTeam}</div>
                                <div className={style.odds}>
                                    <span>{item.odds}</span>
                                    <span>0/0.5</span>
                                    <span>1.00</span>
                                </div>
                            </div>
                            {item.score ? (
                                <span className={`${style.status} ${style.ing}`}>{item.score}</span>
                            ) : (
                                <span className={style.status}>VS</span>
                            )}
                            <div className={`${style.team} ${style.away}`}>
                                <div className={style.name}>{item.awayTeam}</div>
                                <div className={style.odds}>
                                    <span>{item.odds}</span>
                                    <span>2</span>
                                    <span>1.00</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.bar}>
                            <span>{item.member}位玩家預測該場</span>
                            {item.plan ? <span className={style.plan}>高手方案</span> : null}
                        </div>
                    </section>
                );
            })}
        </>
    );
}

export default ContestList;

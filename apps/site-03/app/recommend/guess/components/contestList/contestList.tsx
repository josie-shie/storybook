'use client';
import Link from 'next/link';
import { useContestStore } from '../../contest/contestStore';
import style from './contestList.module.scss';

function ContestList() {
    const contestList = useContestStore.use.contestList();

    const statusLabel = (status: number) => {
        switch (status) {
            case 0:
                return null;
            case 1:
                return <div className={`${style.status} ${style.ing}`}>{`72'`}</div>;
            case 2:
                return <div className={style.status}>完</div>;
            default:
                return null;
        }
    };

    return (
        <>
            {contestList.map(item => {
                return (
                    <Link
                        className={style.contesntListLink}
                        href={`/recommend/${item.matchId}`}
                        key={item.matchId}
                    >
                        <section className={style.contesntList}>
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
                                    <span className={`${style.status} ${style.ing}`}>
                                        {item.score}
                                    </span>
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
                    </Link>
                );
            })}
        </>
    );
}

export default ContestList;

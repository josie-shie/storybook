'use client';
import style from './contestList.module.scss';

interface PropsType {
    sport?: string;
    time?: string;
    homeTeam?: string;
    awayTeam?: string;
    member?: number;
    plan?: boolean;
    odds?: number;
    score?: string;
    status?: number;
}

function ContestList({
    sport,
    time,
    homeTeam,
    awayTeam,
    member,
    plan,
    odds,
    score,
    status
}: PropsType) {
    const statusLabel = (() => {
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
    })();

    return (
        <section className={style.contesntList}>
            <div className={style.title}>
                <span className={style.sport}>{sport}</span>
                <span className={style.time}>{time}</span>
                {statusLabel}
            </div>
            <div className={style.game}>
                <div className={`${style.team} ${style.home}`}>
                    <div className={style.name}>{homeTeam}</div>
                    <div className={style.odds}>
                        <span>{odds}</span>
                        <span>0/0.5</span>
                        <span>1.00</span>
                    </div>
                </div>
                {score ? (
                    <span className={`${style.status} ${style.ing}`}>{score}</span>
                ) : (
                    <span className={style.status}>VS</span>
                )}
                <div className={`${style.team} ${style.away}`}>
                    <div className={style.name}>{awayTeam}</div>
                    <div className={style.odds}>
                        <span>{odds}</span>
                        <span>2</span>
                        <span>1.00</span>
                    </div>
                </div>
            </div>
            <div className={style.bar}>
                <span>{member}位玩家預測該場</span>
                {plan ? <span className={style.plan}>高手方案</span> : null}
            </div>
        </section>
    );
}

export default ContestList;

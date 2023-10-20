'use client';
import style from './contestList.module.scss';

function ContestList() {
    return (
        <section className={style.contesntList}>
            <div className={style.title}>
                <span className={style.sport}>亞運男足</span>
                <span className={style.time}>11:30</span>
            </div>
            <div className={style.game}>
                <div className={`${style.team} ${style.home}`}>
                    <div className={style.name}>泰国国立法政大学</div>
                    <div className={style.odds}>
                        <span>0.85</span>
                        <span>0/0.5</span>
                        <span>1.00</span>
                    </div>
                </div>
                <span className={style.status}>VS</span>
                <div className={`${style.team} ${style.away}`}>
                    <div className={style.name}>北曼谷学院</div>
                    <div className={style.odds}>
                        <span>0.85</span>
                        <span>2</span>
                        <span>1.00</span>
                    </div>
                </div>
            </div>
            <div className={style.bar}>
                <span>124位玩家預測該場</span>
                <span className={style.plan}>高手方案</span>
            </div>
        </section>
    );
}

export default ContestList;

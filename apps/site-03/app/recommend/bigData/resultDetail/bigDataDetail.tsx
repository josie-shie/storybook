'use client';
import style from './bigDataDetail.module.scss';

function BigDataDetail() {
    return (
        <div className={style.bigDataGame}>
            <div className={style.column}>
                <div className={style.row}>
                    <span className={style.title}>全場讓球</span>
                    <span className={style.name}>讓方/主隊、盤口/2</span>
                </div>
                <div className={style.row}>
                    <span className={style.title}>全場大小</span>
                    <span className={style.name}>不挑選</span>
                </div>
            </div>
            <div className={style.column}>
                <div className={style.row}>
                    <span className={style.title}>時間區間</span>
                    <span className={style.date}>2023-10-09 ~ 2023-10-16</span>
                </div>
            </div>
        </div>
    );
}

export default BigDataDetail;

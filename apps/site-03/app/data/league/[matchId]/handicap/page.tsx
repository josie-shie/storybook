import style from './handicap.module.scss';

interface Item {
    team: string;
    game: number;
    win: number;
    draw: number;
    lose: number;
    winPercent: number;
    drawPercent: number;
    losePercent: number;
    total: number;
}

function Handicap() {
    const dataList: Item[] = [
        {
            team: '曼彻斯特城',
            game: 0,
            win: 0,
            draw: 0,
            lose: 0,
            winPercent: 0,
            drawPercent: 24,
            losePercent: 33,
            total: 89
        },
        {
            team: '曼彻斯特城',
            game: 0,
            win: 0,
            draw: 0,
            lose: 0,
            winPercent: 0,
            drawPercent: 24,
            losePercent: 33,
            total: 89
        }
    ];

    return (
        <div className={style.handicap}>
            <div className={style.table}>
                <div className={style.tableHead}>
                    <div className={style.row}>
                        <div className={style.td}>隊伍</div>
                        <div className={style.td}>賽</div>
                        <div className={style.td}>贏</div>
                        <div className={style.td}>走</div>
                        <div className={style.td}>輸</div>
                        <div className={style.td}>贏%</div>
                        <div className={style.td}>走%</div>
                        <div className={style.td}>輸%</div>
                        <div className={style.td}>淨</div>
                    </div>
                </div>
                <div className={style.tableBody}>
                    {dataList.map((item, idx) => (
                        <div className={style.row} key={idx}>
                            <div className={style.value}>{item.team}</div>
                            <div className={style.value}>{item.game}</div>
                            <div className={style.value}>{item.win}</div>
                            <div className={style.value}>{item.draw}</div>
                            <div className={style.value}>{item.lose}</div>
                            <div className={style.value}>{item.winPercent}</div>
                            <div className={style.value}>{item.drawPercent}</div>
                            <div className={style.value}>{item.losePercent}</div>
                            <div className={style.value}>{item.total}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Handicap;

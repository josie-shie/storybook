import style from './minutesTable.module.scss';

function MinutesTable({
    label,
    upper,
    lower,
    openMatchListDrawer,
    currentIndex,
    maxIndexList
}: {
    label: string;
    upper: number[];
    lower: number[];
    openMatchListDrawer: (matchIdsList: number[], selectedType: string, odds: string) => void;
    currentIndex: number;
    maxIndexList: number[];
}) {
    return (
        <div
            className={`${style.tableContainer} ${
                maxIndexList.includes(currentIndex) ? style.highlightTable : ''
            }`}
        >
            <div className={style.header}>{label}</div>

            <div className={`${style.cell} ${style.over}`}>
                <span
                    onClick={() => {
                        openMatchListDrawer(upper, label, '大');
                    }}
                >
                    大<span className={style.total}>{upper.length}</span>
                </span>
            </div>
            <div className={`${style.cell} ${style.odd}`}>
                <span
                    onClick={() => {
                        openMatchListDrawer(lower, label, '小');
                    }}
                >
                    小 <span className={style.total}>{lower.length}</span>
                </span>
            </div>
        </div>
    );
}

export default MinutesTable;

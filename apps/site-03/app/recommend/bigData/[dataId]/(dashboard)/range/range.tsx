import style from './range.module.scss';

function Range() {
    return (
        <>
            <div className={style.range}>
                <div className={style.eChat} />
                <div className={style.dot}>
                    <span className={style.first}>0-1</span>
                    <span className={style.second}>2-3</span>
                    <span className={style.three}>4-6</span>
                    <span className={style.four}>7以上</span>
                </div>
            </div>
            <div className={style.tableContainer}>
                <div className={style.header}>0-1</div>
                <div className={style.header}>2-3</div>
                <div className={style.header}>4-6</div>
                <div className={style.header}>7以上</div>

                <div className={style.cell}>
                    <span>55</span>
                </div>
                <div className={style.cell}>
                    <span>32</span>
                </div>
                <div className={style.cell}>
                    <span>18</span>
                </div>
                <div className={style.cell}>
                    <span>11</span>
                </div>
            </div>
        </>
    );
}

export default Range;

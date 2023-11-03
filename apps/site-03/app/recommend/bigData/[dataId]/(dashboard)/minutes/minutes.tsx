import style from './minutes.module.scss';

function Minutes() {
    return (
        <>
            <div className={style.minutes}>
                <div className={style.eChat} />
                <div className={style.dot}>
                    <span className={style.big}>大</span>
                    <span className={style.small}>小</span>
                </div>
            </div>
            <div className={style.tableContainer}>
                <div className={style.header}>開場-14:59</div>
                <div className={style.header}>15:00-29:59</div>
                <div className={style.header}>30:00-半場</div>

                <div className={style.cell}>
                    <span>上 40</span>
                </div>
                <div className={style.cell}>
                    <span>上 40</span>
                </div>
                <div className={style.cell}>
                    <span>上 40</span>
                </div>

                <div className={`${style.cell} ${style.odd}`}>
                    <span>下 40</span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span>下 40</span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span>下 40</span>
                </div>
            </div>
            <div className={style.tableContainer}>
                <div className={style.header}>開場-14:59</div>
                <div className={style.header}>15:00-29:59</div>
                <div className={style.header}>30:00-半場</div>

                <div className={style.cell}>
                    <span>上 40</span>
                </div>
                <div className={style.cell}>
                    <span>上 40</span>
                </div>
                <div className={style.cell}>
                    <span>上 40</span>
                </div>

                <div className={`${style.cell} ${style.odd}`}>
                    <span>下 40</span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span>下 40</span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span>下 40</span>
                </div>
            </div>
        </>
    );
}

export default Minutes;

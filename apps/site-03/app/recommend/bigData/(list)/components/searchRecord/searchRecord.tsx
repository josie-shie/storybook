import style from './searchRecord.module.scss';

interface PropsType {
    loading?: boolean;
}

function SearchRecord({ loading }: PropsType) {
    return (
        <div className={style.searchRecord}>
            <div className={style.title}>
                <div className={style.record}>查詢紀錄3</div>
                <div className={style.time}>2023-10-16 11:00</div>
            </div>
            <div className={style.detail}>
                <div className={style.content}>
                    <div className={style.item}>
                        全場讓球 讓方<span>主</span>、盤口<span>2</span>
                    </div>
                    <div className={style.item}>
                        全場大小 盤口<span>不挑選</span>
                    </div>
                    <div className={style.item}>時間區間 2023-10-09 ~ 2023-10-16</div>
                </div>
                <div className={style.buttonContainer}>
                    {loading ? (
                        <button className={style.loadingButton} type="button">
                            運算中...
                        </button>
                    ) : (
                        <button className={style.button} type="button">
                            查看分析
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchRecord;

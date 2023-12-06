import Link from 'next/link';
import { timestampToString } from 'lib';
import style from './searchRecord.module.scss';

interface Record {
    recordId: number;
    recordTime: number;
    handicap: string;
    odds: string;
    overUnder: string;
    startDate: number;
    endDate: number;
    state: number;
}

interface PropsType {
    index: number;
    recordData: Record;
}

function SearchRecord({ index, recordData }: PropsType) {
    const handicapTeam = {
        home: '主',
        away: '客'
    };
    return (
        <div className={style.searchRecord}>
            <div className={style.title}>
                <div className={style.record}>查詢紀錄{index}</div>
                <div className={style.time}>
                    {timestampToString(recordData.recordTime, 'YYYY-MM-DD HH:mm')}
                </div>
            </div>
            <div className={style.detail}>
                <div className={style.content}>
                    <div className={style.item}>
                        全場讓球 讓方
                        <span>{handicapTeam[recordData.handicap] || '全部'}</span>
                        、盤口<span>{recordData.odds}</span>
                    </div>
                    <div className={style.item}>
                        全場大小 盤口<span>{recordData.overUnder || '不挑選'}</span>
                    </div>
                    <div className={style.item}>
                        時間區間 {timestampToString(recordData.startDate, 'YYYY-MM-DD')} ~{' '}
                        {timestampToString(recordData.endDate, 'YYYY-MM-DD')}
                    </div>
                </div>
                <div className={style.buttonContainer}>
                    {recordData.state ? (
                        <Link
                            className={style.button}
                            href={`/recommend/bigData/${recordData.recordId}/handicap`}
                            type="button"
                        >
                            查看分析
                        </Link>
                    ) : (
                        <button className={style.loadingButton} type="button">
                            運算中...
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchRecord;

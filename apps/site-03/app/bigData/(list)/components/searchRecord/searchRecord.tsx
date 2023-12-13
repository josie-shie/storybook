import Link from 'next/link';
import { timestampToString } from 'lib';
import { motion } from 'framer-motion';
import style from './searchRecord.module.scss';

interface Record {
    memberId: number;
    ticketId: string;
    handicapSide: string;
    handicapValues: string;
    overUnderValues: string;
    startTime: number;
    endTime: number;
    analyTime: number;
    isCompleted: boolean;
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
                    {timestampToString(recordData.analyTime, 'YYYY-MM-DD HH:mm')}
                </div>
            </div>
            <div className={style.detail}>
                <div className={style.content}>
                    <div className={style.item}>
                        全場讓球 讓方
                        <span>{handicapTeam[recordData.handicapSide] || '全部'}</span>
                        、盤口<span>{recordData.handicapValues}</span>
                    </div>
                    <div className={style.item}>
                        全場大小 盤口<span>{recordData.overUnderValues || '不挑選'}</span>
                    </div>
                    <div className={style.item}>
                        時間區間 {timestampToString(recordData.startTime, 'YYYY-MM-DD')} ~{' '}
                        {timestampToString(recordData.endTime, 'YYYY-MM-DD')}
                    </div>
                </div>
                <div className={style.buttonContainer}>
                    {recordData.isCompleted ? (
                        <motion.button
                            className={style.button}
                            type="button"
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link href={`/bigData/${recordData.ticketId}/handicap`} type="button">
                                查看分析
                            </Link>
                        </motion.button>
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

'use client';
import { useState } from 'react';
import GoalRangeChart from '../../components/goalRangeChart/goalRangeChart';
import ContestDrawerList from '../components/contestDrawerList';
import style from './range.module.scss';

function Range() {
    const [showList, setShowList] = useState(false);

    return (
        <>
            <div className={style.range}>
                <GoalRangeChart />
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
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        55
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        32
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        18
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        11
                    </span>
                </div>
            </div>
            <ContestDrawerList
                isOpen={showList}
                onClose={() => {
                    setShowList(false);
                }}
                onOpen={() => {
                    setShowList(true);
                }}
                title="進球數區間/4-6"
            />
        </>
    );
}

export default Range;

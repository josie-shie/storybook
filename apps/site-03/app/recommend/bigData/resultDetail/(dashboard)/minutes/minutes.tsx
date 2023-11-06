'use client';
import { useState } from 'react';
import FifteenMinutesChart from '../../../components/fifteenMinutesChart/fifteenMinutesChart';
import ContestDrawerList from '../components/contestDrawerList';
import style from './minutes.module.scss';

function Minutes() {
    const [showList, setShowList] = useState(false);

    return (
        <>
            <div className={style.minutes}>
                <FifteenMinutesChart />
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
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>

                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
                    </span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
                    </span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
                    </span>
                </div>
            </div>
            <div className={style.tableContainer}>
                <div className={style.header}>開場-14:59</div>
                <div className={style.header}>15:00-29:59</div>
                <div className={style.header}>30:00-半場</div>

                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>
                <div className={style.cell}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        上 40
                    </span>
                </div>

                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
                    </span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
                    </span>
                </div>
                <div className={`${style.cell} ${style.odd}`}>
                    <span
                        onClick={() => {
                            setShowList(true);
                        }}
                    >
                        下 40
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
                title="15分鐘進球/75:00-全場/大"
            />
        </>
    );
}

export default Minutes;

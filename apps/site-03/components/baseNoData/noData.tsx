'use client';
import Image from 'next/image';
import NoDataIcon from './img/noData.png';
import style from './noData.module.scss';

function NoData() {
    return (
        <div className={style.noDataBox}>
            <div className={style.content}>
                <Image alt="" src={NoDataIcon} width={100} />
                <p>暫無數據</p>
            </div>
        </div>
    );
}

export default NoData;

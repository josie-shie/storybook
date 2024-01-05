'use client';
import Image from 'next/image';
import NoDataIcon from './img/noData.png';
import style from './noData.module.scss';

function NoData({ text, textSecond }: { text: string; textSecond?: string }) {
    return (
        <div className={style.noDataBox}>
            <div className={style.content}>
                <Image alt="" height={100} src={NoDataIcon} width={100} />
                <div>{text}</div>
                {textSecond ? <div>{textSecond}</div> : null}
            </div>
        </div>
    );
}

export default NoData;

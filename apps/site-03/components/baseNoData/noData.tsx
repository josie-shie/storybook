'use client';
import Image from 'next/image';
import NoDataIcon from './img/noData.png';
import style from './noData.module.scss';

function NoData({
    text,
    textSecond,
    className
}: {
    text: string;
    textSecond?: string;
    className?: string;
}) {
    return (
        <div className={`ui-no-data ${style.noDataBox} ${className}`}>
            <div className={style.content}>
                <Image alt="" height={100} src={NoDataIcon} width={100} />
                <div>{text}</div>
                {textSecond ? <div>{textSecond}</div> : null}
            </div>
        </div>
    );
}

export default NoData;

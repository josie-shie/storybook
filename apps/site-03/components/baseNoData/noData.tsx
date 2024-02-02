'use client';
import Image from 'next/image';
import NoDataIcon from './img/noData.png';
import style from './noData.module.scss';

function NoData({
    text,
    textSecond,
    className,
    isFlex = false
}: {
    text: string;
    textSecond?: string;
    className?: string;
    isFlex?: boolean;
}) {
    return (
        <div className={`ui-no-data ${isFlex ? style.noDataFlex : style.noDataBox} ${className}`}>
            <div className={style.content}>
                <Image alt="" className={style.image} height={100} src={NoDataIcon} width={100} />
                <div className={style.text}>{text}</div>
                {textSecond ? <div>{textSecond}</div> : null}
            </div>
        </div>
    );
}

export default NoData;

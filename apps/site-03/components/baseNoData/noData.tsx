'use client';
import Image from 'next/image';
import NoDataIcon from './img/noData.png';
import style from './noData.module.scss';

function NoData() {
    return (
        <div className={style.noDataBox}>
            <div className={style.content}>
                <Image alt="" height={100} src={NoDataIcon} width={100} />
                <div>此條件查无资料</div>
                <div>请重新修改搜寻条件</div>
            </div>
        </div>
    );
}

export default NoData;

'use client';
import Image from 'next/image';
import PredictList from './predictList';
import Banner from './img/banner.png';
import Filter from './img/filter.png';
import style from './page.module.scss';

function Page() {
    return (
        <>
            <Image alt="" className={style.banner} src={Banner} />
            <div className={style.filterButton}>
                赛事筛选
                <Image alt="" src={Filter} />
            </div>
            <div className="recommendPredict">
                <PredictList />
            </div>
        </>
    );
}

export default Page;

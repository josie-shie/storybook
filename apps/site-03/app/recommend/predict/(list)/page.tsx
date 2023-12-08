'use client';

import Image from 'next/image';
import { useState } from 'react';
import Article from './article/article';
import Banner from './img/banner.png';
import Filter from './img/filter.png';
import style from './page.module.scss';
import WeekButton from './components/weekButton/weekButton';

function Page() {
    const [isActive, setIsActive] = useState<number[]>([]);

    const updateActive = (value: number) => {
        setIsActive(current => {
            const isExist = current.includes(value);
            if (isExist) {
                return current.filter(item => item !== value);
            }
            return [...current, value];
        });
    };
    return (
        <>
            <Image alt="" className={style.banner} src={Banner} />
            <div className={style.filterButton}>
                赛事筛选
                <Image alt="" src={Filter} />
            </div>
            <div className={style.button}>
                <WeekButton isActive={isActive} updateActive={updateActive} />
            </div>
            <div className="recommendPredict">
                <Article />
            </div>
        </>
    );
}

export default Page;

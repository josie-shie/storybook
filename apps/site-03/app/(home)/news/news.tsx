'use client';
import type { GetLeisuNewsListResponse } from 'data-center';
import { creatNewsStore } from './newsStore';
import NewsList from './newsList';
import NewsCarousel from './newsCarousel';
import style from './news.module.scss';

function News({ newsList }: { newsList: GetLeisuNewsListResponse }) {
    creatNewsStore({
        newsList,
        marqueeList: [
            '这是第1条跑馬燈跑馬燈跑馬燈跑馬',
            '这是第2条跑馬燈跑馬燈跑馬燈跑馬',
            '这是第3条跑馬燈跑馬燈跑馬燈跑馬'
        ]
    });

    return (
        <div className={style.news}>
            <NewsCarousel />
            <NewsList />
        </div>
    );
}

export default News;

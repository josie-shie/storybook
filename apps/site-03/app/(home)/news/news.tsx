'use client';
import { creatNewsStore } from './newsStore';
import NewsList from './newsList';
import NewsCarousel from './newsCarousel';
import newsImage from './img/newsImg.jpeg';
import style from './news.module.scss';

function News() {
    creatNewsStore({
        slideList: [
            {
                id: 1,
                image: newsImage.src,
                leagueChs: '美国职业联赛',
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强'
            },
            {
                id: 2,
                image: newsImage.src,
                leagueChs: '美国职业联赛',
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强'
            }
        ],
        newsList: [
            {
                id: 1,
                image: newsImage.src,
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强',
                time: '2023/5/10'
            },
            {
                id: 2,
                image: newsImage.src,
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强',
                time: '2023/5/10'
            },
            {
                id: 3,
                image: newsImage.src,
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强',
                time: '2023/5/10'
            },
            {
                id: 4,
                image: newsImage.src,
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强',
                time: '2023/5/10'
            },
            {
                id: 5,
                image: newsImage.src,
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强',
                time: '2023/5/10'
            },
            {
                id: 6,
                image: newsImage.src,
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强',
                time: '2023/5/10'
            },
            {
                id: 7,
                image: newsImage.src,
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强',
                time: '2023/5/10'
            },
            {
                id: 8,
                image: newsImage.src,
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强',
                time: '2023/5/10'
            },
            {
                id: 9,
                image: newsImage.src,
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强',
                time: '2023/5/10'
            },
            {
                id: 10,
                image: newsImage.src,
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强',
                time: '2023/5/10'
            },
            {
                id: 11,
                image: newsImage.src,
                title: '神! 梅西连3战梅开二度 迈阿密国际PK大战胜出挺进8强',
                time: '2023/5/10'
            }
        ],
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

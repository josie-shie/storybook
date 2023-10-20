'use client';
import { creatNewsStore } from './newsStore';
import NewsBanner from './newsBanner';
import NewsMarquee from './newsMarquee';
import NewsList from './newsList';

function News() {
    creatNewsStore({
        bannerList: [
            {
                image: 'https://storage.googleapis.com/anntw/assets/images/000/074/435/big/%E4%B8%96%E8%B6%B30.jpeg?1670213180',
                tag: '世界杯',
                title: '2022 世界杯，強敵環伺鹿死誰手'
            }
        ]
    });
    return (
        <>
            <div className="news">新聞</div>
            <NewsBanner />
            <NewsMarquee />
            <NewsList />
        </>
    );
}

export default News;

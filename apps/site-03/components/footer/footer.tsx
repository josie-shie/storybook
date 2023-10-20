'use client';
import { Footer } from 'ui';
import HomeIcon from './img/homeIcon.svg';
import GameIcon from './img/game.svg';
import RecommendIcon from './img/recommend.svg';
import DataIcon from './img/data.svg';
import NewsIcon from './img/news.svg';

const CategoryList = [
    {
        label: '首頁',
        value: '/',
        icon: <HomeIcon />
    },
    {
        label: '賽事',
        value: '/contest/football',
        icon: <GameIcon />
    },
    {
        label: '推薦',
        value: '/recommend/guess/contest',
        icon: <RecommendIcon />
    },
    {
        label: '數據',
        value: '/data',
        icon: <DataIcon />
    },
    {
        label: '消息',
        value: '/message',
        icon: <NewsIcon />
    }
];

function FooterComponent() {
    return <Footer activeColor="#276CE1" bgColor="#FFF" menuList={CategoryList} />;
}

export default FooterComponent;

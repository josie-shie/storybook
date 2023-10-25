'use client';
import { Footer } from 'ui';
import { usePathname } from 'next/navigation';
import HomeIcon from './img/homeIcon';
import GameIcon from './img/game';
import RecommendIcon from './img/recommend';
import DataIcon from './img/data';
import NewsIcon from './img/news';
import './footer.module.scss';

const CategoryList = [
    {
        label: '首頁',
        value: '/',
        icon: <HomeIcon fill="#AAAAAA" />
    },
    {
        label: '賽事',
        value: '/contest/football',
        icon: <GameIcon fill="#AAAAAA" />
    },
    {
        label: '推薦',
        value: '/recommend/guess',
        icon: <RecommendIcon fill="#AAAAAA" />
    },
    {
        label: '數據',
        value: '/data',
        icon: <DataIcon fill="#AAAAAA" />
    },
    {
        label: '消息',
        value: '/message',
        icon: <NewsIcon fill="#AAAAAA" />
    }
];

function FooterComponent() {
    const pathname = usePathname();

    return (
        <Footer
            activeColor="#276CE1"
            activeRouter={pathname}
            bgColor="#FFF"
            menuList={CategoryList}
        />
    );
}

export default FooterComponent;

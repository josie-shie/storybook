'use client';
import { Footer } from 'ui';
import { usePathname } from 'next/navigation';
import HomeIcon from './img/homeIcon';
import GameIcon from './img/game';
import RecommendIcon from './img/recommend';
import DataIcon from './img/data';
import NewsIcon from './img/news';
import style from './footer.module.scss';

const CategoryList = [
    {
        label: '首頁',
        value: '/',
        includedRouters: ['/news'],
        icon: <HomeIcon fill="#AAAAAA" />
    },
    {
        label: '賽事',
        value: '/contest/football',
        includedRouters: ['/contest'],
        icon: <GameIcon fill="#AAAAAA" />
    },
    {
        label: '推薦',
        value: '/recommend/guess',
        includedRouters: ['/recommend'],
        icon: <RecommendIcon fill="#AAAAAA" />
    },
    {
        label: '數據',
        value: '/data',
        includedRouters: ['/data'],
        icon: <DataIcon fill="#AAAAAA" />
    },
    {
        label: '消息',
        value: '/message',
        includedRouters: ['/message'],
        icon: <NewsIcon fill="#AAAAAA" />
    }
];

function FooterComponent() {
    const pathname = usePathname();

    return (
        <div className={style.footer}>
            <Footer
                activeColor="#276CE1"
                activeRouter={pathname}
                bgColor="#FFF"
                menuList={CategoryList}
            />
        </div>
    );
}

export default FooterComponent;

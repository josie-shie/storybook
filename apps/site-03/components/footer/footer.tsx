'use client';
import { Footer } from 'ui';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import style from './footer.module.scss';
import homeIcon from './img/homeIcon.png';
import gameIcon from './img/game.png';
import recommendIcon from './img/recommend.png';
import dataIcon from './img/data.png';
import newsIcon from './img/news.png';
import activedHomeIcon from './img/activedHomeIcon.png';
import activedGame from './img/activedGame.png';
import activedReccomand from './img/activedRecommend.png';
import activedData from './img/activedData.png';
import activedNews from './img/activedNews.png';

const CategoryList = [
    {
        label: '首頁',
        value: '/',
        includedRouters: ['/news'],
        icon: <Image alt="" className={style.icon} src={homeIcon} />,
        activedIcon: <Image alt="" className={style.icon} src={activedHomeIcon} />
    },
    {
        label: '賽事',
        value: '/contest/football',
        includedRouters: ['/contest'],
        icon: <Image alt="" className={style.icon} src={gameIcon} />,
        activedIcon: <Image alt="" className={style.icon} src={activedGame} />
    },
    {
        label: '推薦',
        value: '/recommend/guess',
        includedRouters: ['/recommend'],
        icon: <Image alt="" className={style.icon} src={recommendIcon} />,
        activedIcon: <Image alt="" className={style.icon} src={activedReccomand} />
    },
    {
        label: '數據',
        value: '/analytics',
        includedRouters: ['/analytics'],
        icon: <Image alt="" className={style.icon} src={dataIcon} />,
        activedIcon: <Image alt="" className={style.icon} src={activedData} />
    },
    {
        label: '消息',
        value: '/notice',
        includedRouters: ['/notice'],
        icon: <Image alt="" className={style.icon} src={newsIcon} />,
        activedIcon: <Image alt="" className={style.icon} src={activedNews} />
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

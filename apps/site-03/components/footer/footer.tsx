'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import style from './footer.module.scss';
import GameIcon from './img/game.svg';
import GuessIcon from './img/guess.svg';
import AnalyzeIcon from './img/analyze.svg';
import RecommendIcon from './img/recommend.svg';
import DataIcon from './img/data.svg';

const CategoryList = [
    {
        label: '赛事',
        value: '/',
        includedRouters: ['/news'],
        icon: <GameIcon className={`${style.icon} ${style.gameIcon}`} />
    },
    {
        label: '猜球',
        value: '/guess',
        includedRouters: ['/guess'],
        icon: <GuessIcon className={`${style.icon} ${style.guessIcon}`} />
    },
    {
        label: '智能分析',
        value: '/aiBigData/queryForm',
        includedRouters: ['/aiBigData'],
        icon: <AnalyzeIcon className={`${style.icon} ${style.analyzeIcon}`} />,
        validate: true
    },
    {
        label: '专家',
        value: '/master/list/article',
        includedRouters: [
            '/master/article',
            '/master/expert',
            '/master/masterAvatar',
            '/master/memberAvatar'
        ],
        icon: <RecommendIcon className={`${style.icon} ${style.recommendIcon}`} />
    },
    {
        label: '数据',
        value: '/analytics',
        includedRouters: ['/analytics'],
        icon: <DataIcon className={`${style.icon} ${style.dataIcon}`} />
    }
];

function FooterComponent() {
    const pathname = usePathname();
    const isLogin = useUserStore.use.isLogin();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();

    const [activeItem, setActiveItem] = useState(pathname);

    const updateActive = (path: string) => {
        setActiveItem(path);
    };

    const openLoginDrawer = () => {
        setAuthQuery('login');
        setIsDrawerOpen(true);
    };

    return (
        <div className={style.footerPlaceholder}>
            <footer className={style.footer}>
                {CategoryList.map(menu => {
                    return (
                        <Link
                            className={`${style.listItem} ${
                                activeItem === menu.value ? style.active : ''
                            }`}
                            href={menu.value}
                            key={menu.value}
                            onClick={e => {
                                updateActive(menu.value);
                                if (menu.validate && !isLogin) {
                                    openLoginDrawer();
                                    e.preventDefault();
                                }
                            }}
                            title={menu.label}
                        >
                            <div className={style.iconBox}>{menu.icon}</div>

                            <div className={style.textLabel}>{menu.label}</div>
                        </Link>
                    );
                })}
            </footer>
        </div>
    );
}

export default FooterComponent;

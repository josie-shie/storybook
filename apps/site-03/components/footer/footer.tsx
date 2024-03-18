'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import style from './footer.module.scss';
import GameIcon from './img/game.svg';
import GuessIcon from './img/guess.svg';
import AnalyzeIcon from './img/analyze.svg';
import RecommendIcon from './img/recommend.svg';
import AiPredictIcon from './img/aiPredict.svg';
// import DataIcon from './img/data.svg';

interface CategoryItem {
    label: string;
    value: string;
    includedRouters: string[];
    icon: JSX.Element;
}

const CategoryList = [
    {
        label: '赛事',
        value: '/',
        includedRouters: ['/news'],
        icon: <GameIcon className={`${style.icon} ${style.gameIcon}`} />
    },
    {
        label: '专家',
        value: '/master/list/article',
        includedRouters: ['/master/articleDetail', '/master/masterAvatar', '/master/memberAvatar'],
        icon: <RecommendIcon className={`${style.icon} ${style.recommendIcon}`} />
    },
    {
        label: 'FutureAI',
        value: '/aiPredict?status=history',
        includedRouters: ['/aiPredict'],
        icon: <AiPredictIcon className={`${style.icon} ${style.aiPredictIcon}`} />
    },
    {
        label: '数据分析',
        value: '/aiBigData/queryForm',
        includedRouters: ['/aiBigData'],
        icon: <AnalyzeIcon className={`${style.icon} ${style.analyzeIcon}`} />
    },
    {
        label: '猜球',
        value: '/guess',
        includedRouters: ['/guess'],
        icon: <GuessIcon className={`${style.icon} ${style.guessIcon}`} />
    }
    // {
    //     label: '数据',
    //     value: '/analytics',
    //     includedRouters: ['/analytics'],
    //     icon: <DataIcon className={`${style.icon} ${style.dataIcon}`} />
    // }
];

function FooterComponent() {
    const pathname = usePathname();

    const [activeItem, setActiveItem] = useState(pathname);

    const isActive = (menu: CategoryItem): boolean => {
        if (activeItem === menu.value) return true;
        return menu.includedRouters.some(routerPath => {
            const regex = new RegExp(`^${routerPath}(/|$|\\?)`);
            return regex.test(activeItem);
        });
    };

    const updateActive = (path: string) => {
        setActiveItem(path);
    };

    return (
        <div className={style.footerPlaceholder}>
            <footer className={style.footer}>
                {CategoryList.map(menu => {
                    return (
                        <Link
                            className={`${style.listItem} ${isActive(menu) ? style.active : ''}`}
                            href={menu.value}
                            key={menu.value}
                            onClick={() => {
                                updateActive(menu.value);
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

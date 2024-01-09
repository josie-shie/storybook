'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
        value: '/recommend/guess',
        includedRouters: ['/recommend/guess'],
        icon: <GuessIcon className={`${style.icon} ${style.guessIcon}`} />
    },
    {
        label: '智能分析',
        value: '/bigData/analysis?status=analysis',
        includedRouters: ['/bigData'],
        icon: <AnalyzeIcon className={`${style.icon} ${style.analyzeIcon}`} />
    },
    {
        label: '专家',
        value: '/master/article',
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
    // const router = useRouter();
    const pathname = usePathname();

    const [activeItem, setActiveItem] = useState(pathname);

    useEffect(() => {
        setActiveItem(pathname);
    }, [pathname]);

    return (
        <div className={style.footerPlaceholder}>
            <footer className={style.footer}>
                {CategoryList.map(menu => {
                    return (
                        <Link
                            className={`${style.listItem} ${
                                activeItem === menu.value ||
                                menu.includedRouters.some(str => activeItem.includes(str))
                                    ? style.active
                                    : ''
                            }`}
                            href={menu.value}
                            key={menu.value}
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

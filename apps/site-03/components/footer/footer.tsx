'use client';
import { Footer } from 'ui';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import style from './footer.module.scss';
import gameIcon from './img/game.png';
import guessIcon from './img/guess.png';
import recommendIcon from './img/recommend.png';
import dataIcon from './img/data.png';
import analyzeIcon from './img/analyze.png';
import activeAnalyze from './img/activeAnalyze.png';
import activeGame from './img/activeGame.png';
import activeRecommend from './img/activeRecommend.png';
import activeData from './img/activeData.png';
import activeGuess from './img/activeGuess.png';

const CategoryList = [
    {
        label: '赛事',
        value: '/',
        includedRouters: ['/news'],
        icon: <Image alt="" height={24} src={gameIcon} width={24} />,
        activedIcon: <Image alt="" height={24} src={activeGame} width={24} />
    },
    {
        label: '猜球',
        value: '/recommend/guess',
        includedRouters: ['/recommend/guess'],
        icon: <Image alt="" height={24} src={guessIcon} width={24} />,
        activedIcon: <Image alt="" height={24} src={activeGuess} width={24} />
    },
    {
        label: '智能分析',
        value: '/bigData/analysis?status=analysis',
        includedRouters: ['/bigData'],
        icon: <Image alt="" height={24} src={analyzeIcon} width={24} />,
        activedIcon: <Image alt="" height={24} src={activeAnalyze} width={24} />
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
        icon: <Image alt="" height={24} src={recommendIcon} width={24} />,
        activedIcon: <Image alt="" height={24} src={activeRecommend} width={24} />
    },
    {
        label: '数据',
        value: '/analytics',
        includedRouters: ['/analytics'],
        icon: <Image alt="" height={24} src={dataIcon} width={24} />,
        activedIcon: <Image alt="" height={24} src={activeData} width={24} />
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

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
        icon: <Image alt="" className={style.icon} src={gameIcon} />,
        activedIcon: <Image alt="" className={style.icon} src={activeGame} />
    },
    {
        label: '猜球',
        value: '/recommend/guess',
        includedRouters: ['/recommend'],
        icon: <Image alt="" className={style.icon} src={guessIcon} />,
        activedIcon: <Image alt="" className={style.icon} src={activeGuess} />
    },
    {
        label: '智能分析',
        value: '/recommend/bigData?status=analysis',
        includedRouters: ['/recommend'],
        icon: <Image alt="" className={style.icon} src={analyzeIcon} />,
        activedIcon: <Image alt="" className={style.icon} src={activeAnalyze} />
    },
    {
        label: '专家',
        value: '/recommend/predict',
        includedRouters: ['/recommend'],
        icon: <Image alt="" className={style.icon} src={recommendIcon} />,
        activedIcon: <Image alt="" className={style.icon} src={activeRecommend} />
    },
    {
        label: '数据',
        value: '/analytics',
        includedRouters: ['/analytics'],
        icon: <Image alt="" className={style.icon} src={dataIcon} />,
        activedIcon: <Image alt="" className={style.icon} src={activeData} />
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

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Tab, Tabs } from 'ui';
import Header from '@/components/header/headerLogo';
import style from './analytics.module.scss';
import leagueLogo from './img/leagueLogo.png';
import cupLogo from './img/cupLogo.png';

const hotGames = [
    { logo: null, name: '美联职' },
    { logo: null, name: '英超' },
    { logo: null, name: '西甲' },
    { logo: null, name: '德甲' },
    { logo: null, name: '韓Ｋ' },
    { logo: null, name: '中超' },
    { logo: null, name: '歐联职' },
    { logo: null, name: '阿甲' }
];
const nationallist = [
    '欧洲赛事',
    '英格兰',
    '葡萄牙',
    '意大利',
    '法国',
    '德国',
    '西班牙',
    '冰岛',
    '苏格兰',
    '俄罗斯',
    '比利时',
    '乌克兰',
    '土耳其',
    '荷兰',
    '奥地利',
    '瑞士'
];
const competitions = [
    { name: '世欧预', id: 1, matchType: 'league', rule: null },
    { name: '欧洲杯', id: 2, matchType: 'cup', rule: 'group' },
    { name: '欧国联', id: 3, matchType: 'league', rule: null },
    { name: '欧冠杯', id: 4, matchType: 'cup', rule: 'group' },
    { name: '欧联杯', id: 5, matchType: 'cup', rule: 'round' },
    { name: '欧协联', id: 6, matchType: 'league', rule: null },
    { name: '欧超杯', id: 7, matchType: 'cup', rule: 'group' },
    { name: '酋长杯', id: 8, matchType: 'cup', rule: 'round' }
];

function CompetitionBox() {
    return (
        <div className={style.competitionBox}>
            <div className={style.sideBar}>
                {nationallist.map((national, idx) => (
                    <ScrollLink
                        activeClass="actived"
                        className={style.nationName}
                        containerId="containerElement"
                        duration={500}
                        key={idx}
                        offset={-16}
                        smooth
                        spy
                        to={national}
                    >
                        {national}
                    </ScrollLink>
                ))}
            </div>
            <div className={style.teamList} id="containerElement">
                {nationallist.map((national, idx) => (
                    <Element key={idx} name={national}>
                        <h4 className={style.nationalName}>{national}</h4>
                        <ul className={style.competitionList}>
                            {competitions.map(competition => (
                                <li className={style.competition} key={competition.id}>
                                    <Link href={`/analytics/league/${competition.id}`}>
                                        <Image alt="" src={cupLogo} width={32} />
                                        <p className={style.name}>{competition.name}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Element>
                ))}
            </div>
        </div>
    );
}

function Analytics() {
    return (
        <div className={style.data}>
            <Header />
            <div className={style.main}>
                <div className={style.hotGamesContainer}>
                    <div className={style.title}>热门赛事</div>
                    <div className={style.leagues}>
                        {hotGames.map((el, idx) => (
                            <button className={style.league} key={idx} type="button">
                                <Image alt="" src={leagueLogo} width={22} />
                                <span className={style.name}>{el.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Tabs buttonRadius={0} gap={0} position="center" styling="underline" swiperOpen={false}>
                <Tab label="國際">
                    <CompetitionBox />
                </Tab>
                <Tab label="歐洲">
                    <CompetitionBox />
                </Tab>
                <Tab label="美洲">
                    <CompetitionBox />
                </Tab>
                <Tab label="亞洲">
                    <CompetitionBox />
                </Tab>
                <Tab label="大洋洲">
                    <CompetitionBox />
                </Tab>
                <Tab label="非洲">
                    <CompetitionBox />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Analytics;

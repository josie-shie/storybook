'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Tab, Tabs } from 'ui';
import style from './analytics.module.scss';
import searchIcon from './img/search.png';
import Logo from './img/logo.png';
import leagueLogo from './img/leagueLogo.png';
import cupLogo from './img/cupLogo.png';
import { creatDataStore } from './dataStore';
import HeaderFilter from '@/components/header/headerFilter';

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
                                    <Link href={`/data/league/${competition.id}`}>
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
    creatDataStore({
        pointsList: [
            {
                id: 1,
                ranking: 1,
                label: 3,
                name: '曼彻斯特城',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 2,
                ranking: 2,
                label: 3,
                name: '阿森納',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 3,
                ranking: 3,
                label: null,
                name: '曼彻斯特城',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 4,
                ranking: 4,
                label: 3,
                name: '利物浦',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 5,
                ranking: 5,
                label: 2,
                name: '布萊頓',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 6,
                ranking: 6,
                label: 1,
                name: '阿斯頓維拉',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 7,
                ranking: 7,
                label: null,
                name: '托特納姆熱刺',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 8,
                ranking: 8,
                label: null,
                name: '布侖特福德',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 9,
                ranking: 9,
                label: 4,
                name: '布侖特福德',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            }
        ],
        scheduleList: [
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            },
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            },
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            },
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            },
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            },
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            }
        ],
        handicapList: [
            {
                team: '曼彻斯特城',
                game: 0,
                win: 0,
                draw: 0,
                lose: 0,
                winPercent: 0,
                drawPercent: 24,
                losePercent: 33,
                total: 89
            },
            {
                team: '曼彻斯特城',
                game: 0,
                win: 0,
                draw: 0,
                lose: 0,
                winPercent: 0,
                drawPercent: 24,
                losePercent: 33,
                total: 89
            }
        ],
        totalGoalsList: [
            {
                team: '曼彻斯特城',
                game: 0,
                big: 0,
                draw: 0,
                small: 0,
                bigPercent: 0,
                drawPercent: 24,
                smallPercent: 33
            },
            {
                team: '曼彻斯特城',
                game: 0,
                big: 0,
                draw: 0,
                small: 0,
                bigPercent: 0,
                drawPercent: 24,
                smallPercent: 33
            }
        ],
        topScorersList: [
            {
                ranking: 1,
                member: '哈兰德',
                team: '南安普敦',
                score: 36,
                homeScore: 22,
                awayScore: 14
            },
            {
                ranking: 2,
                member: '凯恩',
                team: '切尔西',
                score: 36,
                homeScore: 22,
                awayScore: 14
            },
            {
                ranking: 3,
                member: '哈兰德',
                team: '南安普敦',
                score: 36,
                homeScore: 22,
                awayScore: 14
            },
            {
                ranking: 4,
                member: '凯恩',
                team: '切尔西',
                score: 36,
                homeScore: 22,
                awayScore: 14
            },
            {
                ranking: 5,
                member: '哈兰德',
                team: '南安普敦',
                score: 36,
                homeScore: 22,
                awayScore: 14
            },
            {
                ranking: 6,
                member: '凯恩',
                team: '切尔西',
                score: 36,
                homeScore: 22,
                awayScore: 14
            }
        ]
    });

    return (
        <div className={style.data}>
            <HeaderFilter
                logo={<Image alt="logo" className={style.logoText} height={16} src={Logo} />}
            >
                <Image alt="search" className={style.searchIcon} src={searchIcon} width={32} />
            </HeaderFilter>
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

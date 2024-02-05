'use client';

import { useEffect, useState } from 'react';
import { Slick } from 'ui/stories/slickPro/slick';
import { usePathname } from 'next/navigation';
import type {
    WinLoseCountDate,
    GetAnalysisOthersResponse,
    GetLeaguePointsRankResponse,
    GetBeforeGameIndexResponse,
    GetPostListResponse,
    GetExponentResponse,
    GetInformationResponse,
    GetLiveTextResponse,
    GetLineUpInfoResponse
} from 'data-center';
import {
    getAnalysisOthers,
    getBeforeGameIndex,
    getLeaguePointsRank,
    getPostList,
    getLiveText,
    getInformation
    // getExponent
} from 'data-center';
import style from './tabContent.module.scss';
import LiveBox from './(dashboard)/liveEvent/liveEvent';
import MessageBoard from './(dashboard)/messageBoard/messageBoard';
import LineUp from './(dashboard)/lineUp/lineUp';
import Predict from './(dashboard)/predict/predict';
import Analyze from './(dashboard)/analyze/analyze';
import Exponent from './(dashboard)/exponent/exponent';
import Information from './(dashboard)/information/information';

interface FetchInitData {
    analyze?: {
        analysisData?: GetAnalysisOthersResponse;
        beforeGameData?: GetBeforeGameIndexResponse;
        leaguePointsRank?: GetLeaguePointsRankResponse;
    };
    predict?: GetPostListResponse;
    exponent?: GetExponentResponse;
    information?: GetInformationResponse;
    textLive?: GetLiveTextResponse;
    lineUpData?: GetLineUpInfoResponse;
}

const lineUpData = {
    match_id: 4060168,
    teams: {
        HOME: {
            team_id: 14809,
            array_format: '4-2-3-1',
            team_color: '#248A24',
            coach_id: 11891,
            coach_name_en: 'Tarek El Ashri',
            coach_name_zh: '塔里克·艾尔·艾什里',
            coach_name_zht: '塔裏克·艾爾·艾什裏',
            coach_logo: '',
            players: [
                {
                    player_id: 1746400,
                    name_en: 'amr khalil',
                    name_chs: '0',
                    name_cht: '0',
                    number: 23,
                    position: 0,
                    player_status: 'STARTER',
                    position_y: 12,
                    position_x: 50
                },
                {
                    player_id: 1390281,
                    name_en: 'hisham saleh',
                    name_chs: '希沙姆·萨利赫',
                    name_cht: '希沙姆·薩利赫',
                    number: 7,
                    position: 3,
                    player_status: 'STARTER',
                    position_y: 32,
                    position_x: 13
                },
                {
                    player_id: 111362,
                    name_en: 'Seif Teka',
                    name_chs: '塞弗·泰卡',
                    name_cht: '塞弗·泰卡',
                    number: 5,
                    position: 1,
                    player_status: 'STARTER',
                    position_y: 32,
                    position_x: 36
                },
                {
                    player_id: 111149,
                    name_en: 'Islam Abou Slemma',
                    name_chs: '伊斯兰·阿布·斯莱玛',
                    name_cht: '伊斯蘭·阿布·斯萊瑪',
                    number: 30,
                    position: 1,
                    player_status: 'STARTER',
                    position_y: 32,
                    position_x: 64
                },
                {
                    player_id: 1635730,
                    name_en: 'karim deeb el',
                    name_chs: '卡里姆迪布尔',
                    name_cht: '卡里姆迪布爾',
                    number: 17,
                    position: 3,
                    player_status: 'STARTER',
                    position_y: 32,
                    position_x: 87
                },
                {
                    player_id: 1277384,
                    name_en: 'omar daoud',
                    name_chs: '奥马尔·达乌德',
                    name_cht: '奧馬爾·達烏德',
                    number: 12,
                    position: 3,
                    player_status: 'STARTER',
                    position_y: 50,
                    position_x: 36
                },
                {
                    player_id: 1504015,
                    name_en: 'khaled ghandor el',
                    name_chs: '哈立德·甘杜尔',
                    name_cht: '哈立德·甘杜爾',
                    number: 10,
                    position: 3,
                    player_status: 'STARTER',
                    position_y: 50,
                    position_x: 64
                },
                {
                    player_id: 1269257,
                    name_en: 'amr saleh',
                    name_chs: '',
                    name_cht: '',
                    number: 24,
                    position: 1,
                    player_status: 'STARTER',
                    position_y: 70,
                    position_x: 22
                },
                {
                    player_id: 1262008,
                    name_en: 'abdelghani mohamed',
                    name_chs: '阿卜杜勒哈尼·穆罕默德',
                    name_cht: '阿卜杜勒哈尼·穆罕默德',
                    number: 21,
                    position: 3,
                    player_status: 'STARTER',
                    position_y: 70,
                    position_x: 50
                },
                {
                    player_id: 1353603,
                    name_en: 'mahmoud shabana',
                    name_chs: '马哈茂德·沙巴纳',
                    name_cht: '馬哈茂德·沙巴納',
                    number: 6,
                    position: 1,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 1746399,
                    name_en: 'hany tamy el',
                    name_chs: '0',
                    name_cht: '0',
                    number: 20,
                    position: 3,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 1731454,
                    name_en: 'Alhabib hassane',
                    name_chs: '哈比卜·哈桑',
                    name_cht: '哈比卜·哈桑',
                    number: 37,
                    position: 255,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 1746398,
                    name_en: 'zaghloul mohamed',
                    name_chs: '0',
                    name_cht: '0',
                    number: 13,
                    position: 255,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 1209136,
                    name_en: 'Naser Mohamed Naser',
                    name_chs: '纳赛尔·穆罕默德·纳赛尔',
                    name_cht: '納賽爾·穆罕默德·納賽爾',
                    number: 8,
                    position: 3,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 82584,
                    name_en: 'Omar Salah',
                    name_chs: '奥马尔·萨拉',
                    name_cht: '奧馬爾·薩拉',
                    number: 16,
                    position: 0,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 1390282,
                    name_en: 'fawzi henawy el',
                    name_chs: '菲斯 希纳威',
                    name_cht: '菲斯 希納威',
                    number: 11,
                    position: 4,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                }
            ]
        },
        AWAY: {
            team_id: 30467,
            array_format: '3-5-2',
            team_color: '#0046A8',
            coach_id: 11891,
            coach_name_en: 'Ahmed Samy',
            coach_name_zh: '艾哈迈德·萨米',
            coach_name_zht: '艾哈邁德·薩米',
            coach_logo: '',
            players: [
                {
                    player_id: 1738151,
                    name_en: 'soliman hani el',
                    name_chs: '苏里曼·哈尼',
                    name_cht: '蘇里曼·哈尼',
                    number: 1,
                    position: 0,
                    player_status: 'STARTER',
                    position_y: 12,
                    position_x: 50
                },
                {
                    player_id: 110995,
                    name_en: 'Sherif Reda',
                    name_chs: '谢里夫·雷达',
                    name_cht: '謝裏夫·雷達',
                    number: 11,
                    position: 1,
                    player_status: 'STARTER',
                    position_y: 32,
                    position_x: 13
                },
                {
                    player_id: 1738147,
                    name_en: 'mostafa mido',
                    name_chs: '穆斯塔法·米多',
                    name_cht: '穆斯塔法·米多',
                    number: 21,
                    position: 255,
                    player_status: 'STARTER',
                    position_y: 32,
                    position_x: 36
                },
                {
                    player_id: 1739730,
                    name_en: 'haggag barakat',
                    name_chs: '哈加格·巴拉卡特',
                    name_cht: '哈加格·巴拉卡特',
                    number: 4,
                    position: 255,
                    player_status: 'STARTER',
                    position_y: 32,
                    position_x: 64
                },
                {
                    player_id: 1259924,
                    name_en: 'mahmoud wahid',
                    name_chs: '马赫茂德·瓦希德',
                    name_cht: '馬赫茂德·瓦希德',
                    number: 12,
                    position: 1,
                    player_status: 'STARTER',
                    position_y: 32,
                    position_x: 87
                },
                {
                    player_id: 1738145,
                    name_en: 'dodo dokou',
                    name_chs: '多库',
                    name_cht: '多庫',
                    number: 36,
                    position: 255,
                    player_status: 'STARTER',
                    position_y: 50,
                    position_x: 36
                },
                {
                    player_id: 1738146,
                    name_en: 'liadi abubakar',
                    name_chs: '利亚迪·阿布巴卡尔',
                    name_cht: '利亞迪·阿布巴卡爾',
                    number: 8,
                    position: 255,
                    player_status: 'STARTER',
                    position_y: 50,
                    position_x: 64
                },
                {
                    player_id: 1738148,
                    name_en: 'kalawa amr',
                    name_chs: '卡拉瓦·阿姆鲁',
                    name_cht: '卡拉瓦·阿姆魯',
                    number: 28,
                    position: 255,
                    player_status: 'STARTER',
                    position_y: 70,
                    position_x: 22
                },
                {
                    player_id: 1262468,
                    name_en: 'lahcen dahdouh',
                    name_chs: '拉赫琴·达杜',
                    name_cht: '拉赫琴·達杜',
                    number: 10,
                    position: 3,
                    player_status: 'STARTER',
                    position_y: 70,
                    position_x: 50
                },
                {
                    player_id: 1269875,
                    name_en: 'mostafa badry el',
                    name_chs: '莫斯塔法·巴德里·埃尔',
                    name_cht: '莫斯塔法·巴德里·埃爾',
                    number: 19,
                    position: 4,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 1436351,
                    name_en: 'emmanuel ihezuo',
                    name_chs: '伊曼纽尔·伊贺祖',
                    name_cht: '伊曼紐爾·伊賀祖',
                    number: 25,
                    position: 255,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 1504310,
                    name_en: 'mohamed saeed',
                    name_chs: '穆罕默德·赛义德',
                    name_cht: '穆罕默德·賽義德',
                    number: 14,
                    position: 3,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 1738150,
                    name_en: 'alaa hamdy',
                    name_chs: '0',
                    name_cht: '0',
                    number: 16,
                    position: 255,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 1739731,
                    name_en: 'amer abdelrahman',
                    name_chs: '阿米尔·阿卜杜勒拉赫曼',
                    name_cht: '阿米爾·阿卜杜勒拉赫曼',
                    number: 6,
                    position: 255,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 111057,
                    name_en: 'Islam Gaber',
                    name_chs: '伊斯兰·加博尔',
                    name_cht: '伊斯蘭·加博爾',
                    number: 15,
                    position: 4,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 1739726,
                    name_en: 'hossam haridi',
                    name_chs: '霍萨姆哈里迪',
                    name_cht: '霍薩姆哈里迪',
                    number: 26,
                    position: 255,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                },
                {
                    player_id: 111305,
                    name_en: 'Ahmed Khaled',
                    name_chs: '艾哈迈德·哈立德',
                    name_cht: '艾哈邁德·哈立德',
                    number: 0,
                    position: 3,
                    player_status: 'BACKUP',
                    position_y: 0,
                    position_x: 0
                }
            ]
        }
    }
};

const exponentMock = {
    companyList: {
        handicap: [3, 5],
        overUnder: [3, 7],
        winDrawLose: [3, 8],
        corners: [3, 10]
    },
    companyInfo: {
        handicap: {
            3: {
                companyId: 3,
                companyName: 'Crown',
                initial: {
                    handicap: -0.5,
                    homeOdds: 1.9,
                    awayOdds: 1.9,
                    closed: false
                },
                beforeMatch: {
                    handicap: -0.5,
                    homeOdds: 1.95,
                    awayOdds: 1.85,
                    closed: false
                },
                live: {
                    handicap: -0.75,
                    homeOdds: 1.8,
                    awayOdds: 2.0,
                    closed: false
                }
            },
            5: {
                companyId: 5,
                companyName: 'Bet365',
                initial: {
                    handicap: -1,
                    homeOdds: 2.0,
                    awayOdds: 1.8,
                    closed: false
                },
                beforeMatch: {
                    handicap: 1.5,
                    homeOdds: 2.05,
                    awayOdds: 1.75,
                    closed: false
                },
                live: {
                    handicap: -1.25,
                    homeOdds: 1.85,
                    awayOdds: 1.95,
                    closed: false
                }
            }
        },
        overUnder: {
            3: {
                companyId: 3,
                companyName: 'Crown',
                initial: {
                    line: 2.5,
                    overOdds: 1.9,
                    underOdds: 1.9,
                    closed: false
                },
                beforeMatch: {
                    line: 3,
                    overOdds: 1.95,
                    underOdds: 1.85,
                    closed: false
                },
                live: {
                    line: 2.75,
                    overOdds: 1.85,
                    underOdds: 1.95,
                    closed: false
                }
            },
            7: {
                companyId: 7,
                companyName: 'Unibet',
                initial: {
                    line: 3,
                    overOdds: 2.0,
                    underOdds: 1.8,
                    closed: false
                },
                beforeMatch: {
                    line: 3.25,
                    overOdds: 1.9,
                    underOdds: 1.9,
                    closed: false
                },
                live: {
                    line: 3.25,
                    overOdds: 1.8,
                    underOdds: 2.0,
                    closed: false
                }
            }
        },
        winDrawLose: {
            3: {
                companyId: 3,
                companyName: 'Crown',
                initial: {
                    homeWin: 2.3,
                    draw: 3.2,
                    awayWin: 3.0,
                    closed: false
                },
                beforeMatch: {
                    homeWin: 2.2,
                    draw: 3.1,
                    awayWin: 3.1,
                    closed: false
                },
                live: {
                    homeWin: 2.1,
                    draw: 3.3,
                    awayWin: 3.2,
                    closed: false
                }
            },
            8: {
                companyId: 8,
                companyName: 'Pinnacle',
                initial: {
                    homeWin: 2.4,
                    draw: 3.1,
                    awayWin: 2.9,
                    closed: false
                },
                beforeMatch: {
                    homeWin: 2.25,
                    draw: 3.15,
                    awayWin: 3.05,
                    closed: false
                },
                live: {
                    homeWin: 2.05,
                    draw: 3.25,
                    awayWin: 3.15,
                    closed: false
                }
            }
        },
        corners: {
            3: {
                companyId: 3,
                companyName: 'Crown',
                initial: {
                    line: 9.5,
                    overOdds: 1.9,
                    underOdds: 1.9,
                    closed: false
                },
                beforeMatch: {
                    line: 10,
                    overOdds: 1.85,
                    underOdds: 1.95,
                    closed: false
                },
                live: {
                    line: 10.5,
                    overOdds: 1.8,
                    underOdds: 2.0,
                    closed: false
                }
            },
            10: {
                companyId: 10,
                companyName: 'William Hill',
                initial: {
                    line: 8.5,
                    overOdds: 1.95,
                    underOdds: 1.85,
                    closed: false
                },
                beforeMatch: {
                    line: 9,
                    overOdds: 1.9,
                    underOdds: 1.9,
                    closed: false
                },
                live: {
                    line: 9.5,
                    overOdds: 1.85,
                    underOdds: 1.95,
                    closed: false
                }
            }
        }
    }
};

function TabContent({
    matchId,
    fetchInitData,
    initStatus
}: {
    matchId: number;
    fetchInitData?: FetchInitData;
    initStatus: string;
}) {
    const [secondRender, setSecondRender] = useState(false);
    const route = usePathname().split('/');
    const status = route[route.length - 1] === matchId.toString() ? null : route[route.length - 1];
    const tabList = [
        {
            label: '直播',
            href: `/football/${matchId}/liveEvent`,
            status: 'liveEvent'
        },
        {
            label: '聊天',
            href: `/football/${matchId}/messageBoard`,
            status: 'messageBoard'
        },
        {
            label: '预测',
            href: `/football/${matchId}/predict`,
            status: 'predict'
        },
        {
            label: '阵容',
            href: `/football/${matchId}/lineUp`,
            status: 'lineUp'
        },
        {
            label: '指数',
            href: `/football/${matchId}/exponent`,
            status: 'exponent'
        },
        {
            label: '情报',
            href: `/football/${matchId}/information`,
            status: 'information'
        },
        {
            label: '数据',
            href: `/football/${matchId}/analyze`,
            status: 'analyze'
        }
    ];
    const [fetchData, setFetchData] = useState({
        analyze: {
            analysisData: {
                LastMatches: {
                    away: {},
                    home: {}
                },
                teamInfo: {},
                leagueTrendData: {},
                winLoseCountData: {
                    data: [] as WinLoseCountDate[],
                    totalCount: {
                        homeHome: 0,
                        homeAway: 0,
                        awayHome: 0,
                        awayAway: 0
                    }
                },
                battleRecordData: {}
            } as GetAnalysisOthersResponse,
            beforeGameData: [] as GetBeforeGameIndexResponse,
            leaguePointsRank: {
                homeTeam: {
                    total: {},
                    home: {},
                    away: {},
                    recent: {}
                },
                awayTeam: {
                    total: {},
                    home: {},
                    away: {},
                    recent: {}
                }
            } as GetLeaguePointsRankResponse
        },
        predict: {
            posts: [],
            pagination: {
                pageCount: 1,
                totalCount: 0
            }
        } as GetPostListResponse,
        exponent: {} as GetExponentResponse,
        lineUpData: {} as GetLineUpInfoResponse,
        textLive: [] as GetLiveTextResponse,
        information: {
            bad: {
                home: [],
                away: []
            },
            good: {
                home: [],
                away: []
            },
            neutral: []
        } as GetInformationResponse
    });
    const [analysisDataLoading, setAnalysisDataLoading] = useState(false);
    const [beforeGameDataLoading, setBeforeGameDataLoading] = useState(false);
    const [leaguePointsRankLoading, setLeaguePointsRankLoading] = useState(false);

    const handleSecondFetch = {
        analyze: async () => {
            setAnalysisDataLoading(true);
            setBeforeGameDataLoading(true);
            setLeaguePointsRankLoading(true);

            const [analysisData, beforeGameData, leaguePointsRank] = await Promise.all([
                getAnalysisOthers(matchId),
                getBeforeGameIndex(matchId, 3),
                getLeaguePointsRank(matchId)
            ]);

            setAnalysisDataLoading(false);
            setBeforeGameDataLoading(false);
            setLeaguePointsRankLoading(false);

            if (!analysisData.success || !beforeGameData.success || !leaguePointsRank.success) {
                return {
                    success: false,
                    error: ''
                };
            }

            return {
                success: true,
                data: {
                    analysisData: analysisData.data,
                    beforeGameData: beforeGameData.data,
                    leaguePointsRank: leaguePointsRank.data
                }
            };
        },
        predict: async () => {
            const predictData = await getPostList({
                memberId: 1,
                filterId: [matchId],
                postFilter: ['match'],
                pagination: {
                    currentPage: 1,
                    perPage: 10
                }
            });
            return predictData;
        },
        textLive: async () => {
            const textLive = await getLiveText(Number(matchId));
            return textLive;
        },
        information: async () => {
            const information = await getInformation(Number(matchId));
            return information;
        }
        // exponent: async () => {
        //     const exponentData = await getExponent(matchId);
        //     return exponentData;
        // }
    };

    useEffect(() => {
        setSecondRender(true);
    }, []);

    useEffect(() => {
        const fetchSecondRenderData = () => {
            if (!secondRender) return;

            Object.entries(handleSecondFetch).forEach(async ([key, func]) => {
                if (key !== initStatus) {
                    try {
                        const result = await func();
                        if (result.success) {
                            setFetchData(prevData => ({
                                ...prevData,
                                [key]: result.data
                            }));
                        }
                    } catch (error) {
                        console.error('Error fetching:', key, error);
                    }
                }
            });
        };

        fetchSecondRenderData();
    }, [secondRender]);

    const initialSlide = status ? tabList.findIndex(tab => tab.status === status) : 0;

    const onSlickEnd = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={style.tabContent}>
            <Slick
                autoHeight
                className={style.slick}
                initialSlide={initialSlide}
                onSlickEnd={onSlickEnd}
                resetHeightKey="contestInfo"
                styling="underline"
                tabs={tabList}
            >
                <div className={style.largeGap}>
                    {secondRender || status === 'liveEvent' ? (
                        <LiveBox
                            matchId={matchId}
                            textLive={fetchInitData?.textLive || fetchData.textLive}
                        />
                    ) : null}
                </div>
                <div className={`${style.largeGap} ${style.rimless}`}>
                    {secondRender || !status || status === 'messageBoard' ? (
                        <MessageBoard matchId={matchId} />
                    ) : null}
                </div>
                <div className={style.largeGap}>
                    {secondRender || status === 'predict' ? (
                        <Predict
                            matchId={matchId}
                            predictData={fetchInitData?.predict || fetchData.predict}
                        />
                    ) : null}
                </div>
                <div className={`${style.largeGap} ${style.rimless}`}>
                    {secondRender || status === 'lineUp' ? (
                        <LineUp lineUpData={lineUpData} />
                    ) : null}
                </div>
                <div className={style.largeGap}>
                    {secondRender || status === 'exponent' ? (
                        //  fetchInitData?.exponent || fetchData.exponent
                        <Exponent exponentData={exponentMock} matchId={matchId} />
                    ) : null}
                </div>
                <div className={style.largeGap}>
                    {secondRender || status === 'information' ? (
                        <Information
                            information={fetchInitData?.information || fetchData.information}
                        />
                    ) : null}
                </div>
                <div className={style.largeGap}>
                    {secondRender || status === 'analyze' ? (
                        <Analyze
                            analysisData={
                                fetchInitData?.analyze?.analysisData ||
                                fetchData.analyze.analysisData
                            }
                            analysisDataLoading={analysisDataLoading}
                            beforeGameData={
                                fetchInitData?.analyze?.beforeGameData ||
                                fetchData.analyze.beforeGameData
                            }
                            beforeGameDataLoading={beforeGameDataLoading}
                            leaguePointsRank={
                                fetchInitData?.analyze?.leaguePointsRank ||
                                fetchData.analyze.leaguePointsRank
                            }
                            leaguePointsRankLoading={leaguePointsRankLoading}
                        />
                    ) : null}
                </div>
            </Slick>
        </div>
    );
}

export default TabContent;

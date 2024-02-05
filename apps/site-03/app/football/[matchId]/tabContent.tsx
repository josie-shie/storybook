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
    getLineup,
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
        lineUpData: async () => {
            const lineUpData = await getLineup(Number(matchId));
            return lineUpData;
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
                        <LineUp lineUpData={fetchInitData?.lineUpData || fetchData.lineUpData} />
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

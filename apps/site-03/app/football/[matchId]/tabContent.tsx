'use client';

import { useEffect, useState } from 'react';
import { Slick } from 'ui';
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
    // getAnalysisOthers,
    // getBeforeGameIndex,
    // getLeaguePointsRank,
    getPostList,
    getLiveText,
    getLineup,
    getInformation,
    getExponent
} from 'data-center';
import style from './tabContent.module.scss';
import LiveBox from './(dashboard)/liveEvent/liveEvent';
import MessageBoard from './(dashboard)/messageBoard/messageBoard';
import LineUp from './(dashboard)/lineUp/lineUp';
import Predict from './(dashboard)/predict/predict';
// import Analyze from './(dashboard)/analyze/analyze';
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
        }
        // {
        //     label: '数据',
        //     href: `/football/${matchId}/analyze`,
        //     status: 'analyze'
        // }
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
        exponent: {
            companyInfo: {
                handicap: [],
                overUnder: [],
                winDrawLose: [],
                corners: []
            },
            companyList: {
                handicap: [],
                overUnder: [],
                winDrawLose: [],
                corners: []
            }
        } as GetExponentResponse,
        lineUpData: {
            matchId: 0,
            teams: {
                venueId: 0,
                venueEn: '',
                venueZh: '',
                home: {
                    teamId: 0,
                    arrayFormat: '',
                    winRate: 0,
                    teamColor: '',
                    coachId: 0,
                    coachNameEn: '',
                    coachNameZh: '',
                    coachNameZht: '',
                    coachLogo: '',
                    players: []
                },
                away: {
                    teamId: 0,
                    arrayFormat: '',
                    winRate: 0,
                    teamColor: '',
                    coachId: 0,
                    coachNameEn: '',
                    coachNameZh: '',
                    coachNameZht: '',
                    coachLogo: '',
                    players: []
                }
            }
        } as GetLineUpInfoResponse,
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
    // const [analysisDataLoading, setAnalysisDataLoading] = useState(false);
    // const [beforeGameDataLoading, setBeforeGameDataLoading] = useState(false);
    // const [leaguePointsRankLoading, setLeaguePointsRankLoading] = useState(false);

    const handleSecondFetch = {
        // analyze: async () => {
        //     setAnalysisDataLoading(true);
        //     setBeforeGameDataLoading(true);
        //     setLeaguePointsRankLoading(true);

        //     const [analysisData, beforeGameData, leaguePointsRank] = await Promise.all([
        //         getAnalysisOthers(matchId),
        //         getBeforeGameIndex(matchId, 3),
        //         getLeaguePointsRank(matchId)
        //     ]);

        //     setAnalysisDataLoading(false);
        //     setBeforeGameDataLoading(false);
        //     setLeaguePointsRankLoading(false);

        //     if (!analysisData.success || !beforeGameData.success || !leaguePointsRank.success) {
        //         return {
        //             success: false,
        //             error: ''
        //         };
        //     }

        //     return {
        //         success: true,
        //         data: {
        //             analysisData: analysisData.data,
        //             beforeGameData: beforeGameData.data,
        //             leaguePointsRank: leaguePointsRank.data
        //         }
        //     };
        // },
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
        },
        exponent: async () => {
            const exponentData = await getExponent(matchId);
            return exponentData;
        }
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
    const shouldShowPredict = fetchData.predict.posts.length > 0;
    const shouldShowLineUp =
        fetchData.lineUpData.teams.home.players.length > 0 ||
        fetchData.lineUpData.teams.away.players.length > 0;
    const shouldShowInformation =
        fetchData.information.bad.home.length > 0 ||
        fetchData.information.good.home.length > 0 ||
        fetchData.information.bad.away.length > 0 ||
        fetchData.information.good.away.length > 0 ||
        fetchData.information.neutral.length > 0;

    const filteredTabList = tabList.filter(tab => {
        switch (tab.status) {
            case 'predict':
                return shouldShowPredict;
            case 'lineUp':
                return shouldShowLineUp;
            case 'information':
                return shouldShowInformation;
            default:
                return true;
        }
    });

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
                tabs={filteredTabList}
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
                {shouldShowPredict ? (
                    <div className={style.largeGap}>
                        {secondRender || status === 'predict' ? (
                            <Predict
                                matchId={matchId}
                                predictData={fetchInitData?.predict || fetchData.predict}
                            />
                        ) : null}
                    </div>
                ) : null}
                {shouldShowLineUp ? (
                    <div className={`${style.largeGap} ${style.rimless}`}>
                        {secondRender || status === 'lineUp' ? (
                            <LineUp
                                lineUpData={fetchInitData?.lineUpData || fetchData.lineUpData}
                            />
                        ) : null}
                    </div>
                ) : null}
                <div className={style.largeGap}>
                    {secondRender || status === 'exponent' ? (
                        <Exponent
                            exponentData={fetchInitData?.exponent || fetchData.exponent}
                            matchId={matchId}
                        />
                    ) : null}
                </div>
                {shouldShowInformation ? (
                    <div className={style.largeGap}>
                        {secondRender || status === 'information' ? (
                            <Information
                                information={fetchInitData?.information || fetchData.information}
                            />
                        ) : null}
                    </div>
                ) : null}
                {/* <div className={style.largeGap}>
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
                </div> */}
            </Slick>
        </div>
    );
}

export default TabContent;

'use client';

import { useEffect, useState } from 'react';
import { Slick } from 'ui';
import { usePathname } from 'next/navigation';
import type {
    GetPostListResponse,
    GetExponentResponse,
    GetInformationResponse,
    GetLiveTextResponse,
    GetLineUpInfoResponse,
    GetLeaguePointsRankResponse,
    GetRecentBattleMatchResponse,
    GetRecentMatchResponse,
    GetRecentMatchScheduleResponse,
    GetHalfFullWinCountsResponse,
    GetRecentMatchCompareResponse,
    GetBattleMatchCompareResponse
} from 'data-center';
import {
    getPostList,
    getLiveText,
    getLineup,
    getInformation,
    getExponent,
    getLeaguePointsRank,
    getRecentBattleMatch,
    getRecentMatchData,
    getRecentMatchSchedule,
    getHalfFullWinCounts,
    getBattleMatchCompare,
    getRecentMatchCompare
} from 'data-center';
import style from './tabContent.module.scss';
import LiveBox from './(dashboard)/liveEvent/liveEvent';
import MessageBoard from './(dashboard)/messageBoard/messageBoard';
import LineUp from './(dashboard)/lineUp/lineUp';
import Predict from './(dashboard)/predict/predict';
import Data from './(dashboard)/data/data';
import Exponent from './(dashboard)/exponent/exponent';
import Information from './(dashboard)/information/information';
import { useContestDetailStore } from './contestDetailStore';
import DetailLoader from './components/loadingComponent/detailLoader';
import ExponentLoader from './components/loadingComponent/exponentLoader';
import LiveEventLoader from './components/loadingComponent/liveEventLoader';

interface FetchInitData {
    data?: {
        leaguePointsRank?: GetLeaguePointsRankResponse;
        recentBattleMatch?: GetRecentBattleMatchResponse;
        recentMatchData?: GetRecentMatchResponse;
        recentMatchSchedule?: GetRecentMatchScheduleResponse;
        halfFullWinCounts?: GetHalfFullWinCountsResponse;
        battleMatchCompare?: GetBattleMatchCompareResponse;
        recentMatchCompare?: GetRecentMatchCompareResponse;
    };
    predict?: GetPostListResponse;
    exponent?: GetExponentResponse;
    information?: GetInformationResponse;
    textLive?: GetLiveTextResponse;
    lineUpData?: GetLineUpInfoResponse;
}

type ComponentMap = Record<string, JSX.Element>;

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
    const matchDetail = useContestDetailStore.use.matchDetail();
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
            href: `/football/${matchId}/data`,
            status: 'data'
        }
    ];
    const [fetchData, setFetchData] = useState({
        data: {
            leaguePointsRank: {} as GetLeaguePointsRankResponse,
            recentBattleMatch: {
                matchList: [],
                dashboard: {
                    goalMissRate: {
                        goal: 0,
                        miss: 0
                    },
                    victoryMinusRate: {
                        victory: 0,
                        minus: 0,
                        tie: 0
                    },
                    winLoseRate: {
                        win: 0,
                        lose: 0,
                        go: 0
                    },
                    bigSmallRate: {
                        big: 0,
                        small: 0,
                        go: 0
                    }
                }
            } as GetRecentBattleMatchResponse,
            recentMatchData: {
                homeMatch: [],
                awayMatch: [],
                dashboard: {
                    home: {
                        goalMissRate: {
                            goal: 0,
                            miss: 0
                        },
                        victoryMinusRate: {
                            victory: 0,
                            minus: 0,
                            tie: 0
                        },
                        winLoseRate: {
                            win: 0,
                            lose: 0,
                            go: 0
                        },
                        bigSmallRate: {
                            big: 0,
                            small: 0,
                            go: 0
                        }
                    },
                    away: {
                        goalMissRate: {
                            goal: 0,
                            miss: 0
                        },
                        victoryMinusRate: {
                            victory: 0,
                            minus: 0,
                            tie: 0
                        },
                        winLoseRate: {
                            win: 0,
                            lose: 0,
                            go: 0
                        },
                        bigSmallRate: {
                            big: 0,
                            small: 0,
                            go: 0
                        }
                    }
                }
            } as GetRecentMatchResponse,
            recentMatchSchedule: {
                home: [],
                away: []
            } as GetRecentMatchScheduleResponse,
            halfFullWinCounts: {} as GetHalfFullWinCountsResponse,
            battleMatchCompare: {} as GetBattleMatchCompareResponse,
            recentMatchCompare: {} as GetRecentMatchCompareResponse
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
                    starterValue: 0,
                    backupValue: 0,
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
                    starterValue: 0,
                    backupValue: 0,
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

    const handleSecondFetch = {
        data: async () => {
            const [
                leaguePointsRank,
                recentBattleMatch,
                battleMatchCompare,
                recentMatchData,
                recentMatchCompare,
                recentMatchSchedule,
                halfFullWinCounts
            ] = await Promise.all([
                getLeaguePointsRank(matchDetail.matchId), // 積分排名
                getRecentBattleMatch({
                    matchId: matchDetail.matchId,
                    homeId: matchDetail.homeId
                }), // 詳情 - 歷史交鋒
                getBattleMatchCompare({
                    matchId: matchDetail.matchId
                }), // 對比 - 歷史交鋒
                getRecentMatchData({
                    matchId: matchDetail.matchId,
                    homeId: matchDetail.homeId,
                    awayId: matchDetail.awayId
                }), // 詳情 - 近期戰績
                getRecentMatchCompare({
                    matchId: matchDetail.matchId
                }), // 對比 - 近期戰績
                getRecentMatchSchedule(Number(matchId)), //近期賽程
                getHalfFullWinCounts({
                    matchId: matchDetail.matchId
                }) // 半全場勝負
            ]);

            if (
                !leaguePointsRank.success ||
                !recentBattleMatch.success ||
                !battleMatchCompare.success ||
                !recentMatchData.success ||
                !recentMatchCompare.success ||
                !recentMatchSchedule.success ||
                !halfFullWinCounts.success
            ) {
                return {
                    success: false,
                    error: ''
                };
            }

            return {
                success: true,
                data: {
                    leaguePointsRank: leaguePointsRank.data,
                    recentBattleMatch: recentBattleMatch.data,
                    battleMatchCompare: battleMatchCompare.data,
                    recentMatchData: recentMatchData.data,
                    recentMatchCompare: recentMatchCompare.data,
                    recentMatchSchedule: recentMatchSchedule.data,
                    halfFullWinCounts: halfFullWinCounts.data
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
            if (!secondRender || typeof matchDetail.matchId === 'undefined') return;

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
    }, [secondRender, matchDetail]);

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

    const initialSlide = status ? filteredTabList.findIndex(tab => tab.status === status) : 0;

    const onSlickEnd = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const LoaderMap: ComponentMap = {
        data: <DetailLoader />,
        exponent: <ExponentLoader />
    };

    const getRoader = (): JSX.Element | null => {
        if (status && status !== 'liveEvent') {
            return LoaderMap[status];
        }
        return <LiveEventLoader />;
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
                    ) : (
                        getRoader()
                    )}
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
                    ) : (
                        getRoader()
                    )}
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
                <div className={style.largeGap}>
                    {secondRender || status === 'data' ? (
                        <Data
                            battleMatchCompare={
                                fetchInitData?.data?.battleMatchCompare ||
                                fetchData.data.battleMatchCompare
                            }
                            halfFullWinCounts={
                                fetchInitData?.data?.halfFullWinCounts ||
                                fetchData.data.halfFullWinCounts
                            }
                            leaguePointsRank={
                                fetchInitData?.data?.leaguePointsRank ||
                                fetchData.data.leaguePointsRank
                            }
                            recentBattleMatch={
                                fetchInitData?.data?.recentBattleMatch ||
                                fetchData.data.recentBattleMatch
                            }
                            recentMatchCompare={
                                fetchInitData?.data?.recentMatchCompare ||
                                fetchData.data.recentMatchCompare
                            }
                            recentMatchData={
                                fetchInitData?.data?.recentMatchData ||
                                fetchData.data.recentMatchData
                            }
                            recentMatchSchedule={
                                fetchInitData?.data?.recentMatchSchedule ||
                                fetchData.data.recentMatchSchedule
                            }
                        />
                    ) : (
                        getRoader()
                    )}
                </div>
            </Slick>
            <div className={style.homeIndicatorPlaceHolder} />
        </div>
    );
}

export default TabContent;

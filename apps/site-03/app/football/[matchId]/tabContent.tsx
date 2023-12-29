'use client';

import { useEffect, useState } from 'react';
import { Slick } from 'ui/stories/slickPro/slick';
import { usePathname } from 'next/navigation';
import type {
    WinLoseCountDate,
    GetDetailStatusResponse,
    GetAnalysisOthersResponse,
    GetLeaguePointsRankResponse,
    GetBeforeGameIndexResponse,
    GetPostListResponse,
    GetExponentResponse
} from 'data-center';
import {
    getDetailStatus,
    getAnalysisOthers,
    getBeforeGameIndex,
    getLeaguePointsRank,
    getPostList,
    getExponent
} from 'data-center';
import style from './tabContent.module.scss';
import MessageBoard from './(dashboard)/messageBoard/messageBoard';
import Situation from './(dashboard)/situation/situation';
import Analyze from './(dashboard)/analyze/analyze';
import Predict from './(dashboard)/predict/predict';
import Exponent from './(dashboard)/exponent/exponent';

interface FetchInitData {
    situation?: GetDetailStatusResponse;
    analyze?: {
        analysisData?: GetAnalysisOthersResponse;
        beforeGameData?: GetBeforeGameIndexResponse;
        leaguePointsRank?: GetLeaguePointsRankResponse;
    };
    predict?: GetPostListResponse;
    exponent?: GetExponentResponse;
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
            label: '聊天',
            href: `/football/${matchId}/messageBoard`,
            status: 'messageBoard'
        },
        {
            label: '赛况',
            href: `/football/${matchId}/situation`,
            status: 'situation'
        },
        // 數據源暫無資料 先隱藏
        // {
        //     label: '直播',
        //     href: `/football/${matchId}/textBroadcast`,
        //     status: 'textBroadcast'
        // },
        {
            label: '分析',
            href: `/football/${matchId}/analyze`,
            status: 'analyze'
        },
        {
            label: '预测',
            href: `/football/${matchId}/predict`,
            status: 'predict'
        },
        {
            label: '指数',
            href: `/football/${matchId}/exponent`,
            status: 'exponent'
        }
    ];
    const [fetchData, setFetchData] = useState({
        situation: {} as GetDetailStatusResponse,
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
            totalArticle: 0,
            totalPage: 1
        } as GetPostListResponse,
        exponent: {} as GetExponentResponse
    });

    const handleSecondFetch = {
        situation: async () => {
            const situation = await getDetailStatus(matchId);
            return situation;
        },
        analyze: async () => {
            const [analysisData, beforeGameData, leaguePointsRank] = await Promise.all([
                getAnalysisOthers(matchId),
                getBeforeGameIndex(matchId, 3),
                getLeaguePointsRank(matchId)
            ]);

            return {
                success: true,
                data: {
                    analysisData: analysisData.success ? analysisData.data : {},
                    beforeGameData: beforeGameData.success ? beforeGameData.data : [],
                    leaguePointsRank: leaguePointsRank.success ? leaguePointsRank.data : {}
                }
            };
        },
        predict: async () => {
            const predictData = await getPostList({
                memberId: 1,
                filterId: [matchId],
                postFilter: ['match'],
                currentPage: 1,
                pageSize: 10
            });
            return predictData;
        },
        exponent: async () => {
            const exponentData = await getExponent(matchId, 0);
            return exponentData;
        }
    };

    useEffect(() => {
        setSecondRender(true);
        fetchSecondRenderData();
    }, []);

    const fetchSecondRenderData = () => {
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
                styling="underline"
                tabs={tabList}
            >
                <div className={`${style.largeGap} ${style.rimless}`}>
                    {secondRender || !status || status === 'messageBoard' ? (
                        <MessageBoard matchId={matchId} />
                    ) : null}
                </div>
                <div className={style.largeGap}>
                    {secondRender || status === 'situation' ? (
                        <Situation
                            situationData={fetchInitData?.situation || fetchData.situation}
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
                            beforeGameData={
                                fetchInitData?.analyze?.beforeGameData ||
                                fetchData.analyze.beforeGameData
                            }
                            leaguePointsRank={
                                fetchInitData?.analyze?.leaguePointsRank ||
                                fetchData.analyze.leaguePointsRank
                            }
                        />
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
                <div className={style.largeGap}>
                    {secondRender || status === 'exponent' ? (
                        <Exponent exponentData={fetchInitData?.exponent || fetchData.exponent} />
                    ) : null}
                </div>
            </Slick>
        </div>
    );
}

export default TabContent;

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
    GetExponentResponse,
    GetInformationResponse
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
// import LiveBox from './(dashboard)/liveEvent/liveEvent';
import MessageBoard from './(dashboard)/messageBoard/messageBoard';
import Predict from './(dashboard)/predict/predict';
import Situation from './(dashboard)/situation/situation';
import Analyze from './(dashboard)/analyze/analyze';
import Exponent from './(dashboard)/exponent/exponent';
import Information from './(dashboard)/information/information';

interface FetchInitData {
    situation?: GetDetailStatusResponse;
    analyze?: {
        analysisData?: GetAnalysisOthersResponse;
        beforeGameData?: GetBeforeGameIndexResponse;
        leaguePointsRank?: GetLeaguePointsRankResponse;
    };
    predict?: GetPostListResponse;
    exponent?: GetExponentResponse;
    information?: GetInformationResponse;
}

const information = {
    bad: {
        away: [
            {
                content: '拉齐奥近6次联赛面对国米2胜4负，过往交锋完全处于劣势。',
                importance: 5
            },
            {
                content: '拉齐奥近期比赛进球数较少，近15场正赛多达12场进球数不超过2个。',
                importance: 5
            },
            {
                content:
                    '★★★拉齐奥客场和中立场表现欠佳，近10个客场和中立场输掉5场，而近10个主场只输1场，而对手国米客场甚至高于主场，近10个客场豪取7胜3平，外加球队贵为卫冕冠军，以及本赛季联赛榜首，实力面也有明显优势，综合来看，本场国米赢球的希望不小。',
                importance: 5
            }
        ],
        home: [
            {
                content:
                    '国米杯赛比赛进球数较少，本赛季7场杯赛多达5场进球数不超过2个，近2场杯赛更是连续贡献0-0。',
                importance: 5
            }
        ]
    },
    good: {
        away: [
            {
                content:
                    '拉齐奥成立于1900年，曾2次夺得意大利顶级联赛冠军，7次夺得意大利杯，1次拿下欧洲优胜者杯。',
                importance: 5
            },
            {
                content: '拉齐奥状态提升明显，上轮联赛主场1-0小胜莱切，取得各项赛事5连胜。',
                importance: 5
            },
            {
                content: '拉齐奥进攻能力提升不少，近6场正赛打入9球，场均效率也有1.5球。',
                importance: 5
            }
        ],
        home: [
            {
                content:
                    '国际米兰成立于1908年，是唯一一支从未从意大利顶级联赛降级的球队。国际米兰队史获得过19个联赛冠军，9个意大利杯，7个意大利超级杯冠军，3次欧冠冠军和3次欧联杯冠军。从2006年到2010年，俱乐部连续五次夺得联赛冠军，平了当时的纪录。在2020-2021赛季，国际米兰时隔11年后再度夺得意甲冠军。',
                importance: 5
            },
            {
                content: '国米状态出色，上轮联赛客场5-1大胜蒙扎，近15场正赛豪取10胜5平的不败战绩。',
                importance: 5
            },
            {
                content:
                    '国米主帅西蒙尼·因扎吉在球员时代效力于皮亚琴察和拉齐奥，他在罗马俱乐部效力了十多年。退役后，他开始管理生涯，最初在拉齐奥青年队，然后于2016年接管高级球队，并率领他们夺得意大利杯和两次意大利超级杯。在2021年6月3日，因扎吉接替孔蒂成为了国际米兰主教练。',
                importance: 5
            },
            {
                content: '国米防守能力出众，近15场正赛仅丢8球，且多达9场比赛零封对手。',
                importance: 5
            },
            {
                content: '国米半场有球能力实际不错，近10场正赛多达8场比赛半场有得失球。',
                importance: 5
            }
        ]
    },
    neutral: [
        {
            content: '国米意甲一线强队，新赛季状态出色，攻防俱佳，目前暂居联赛榜首。',
            importance: 5
        },
        {
            content: '拉齐奥意甲准豪门，该队整体实力不俗，但缺乏稳定性，目前暂居联赛第5位。',
            importance: 5
        },
        {
            content: '本届意超杯由沙特承办，场地为利雅得的沙特国王大学体育场进行。',
            importance: 5
        }
    ]
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
        // {
        //     label: '直播',
        //     href: `/football/${matchId}/liveEvent`,
        //     status: 'liveEvent'
        // },
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
            label: '赛况',
            href: `/football/${matchId}/situation`,
            status: 'situation'
        },
        {
            label: '分析',
            href: `/football/${matchId}/analyze`,
            status: 'analyze'
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
    const [analysisDataLoading, setAnalysisDataLoading] = useState(false);
    const [beforeGameDataLoading, setBeforeGameDataLoading] = useState(false);
    const [leaguePointsRankLoading, setLeaguePointsRankLoading] = useState(false);

    const handleSecondFetch = {
        situation: async () => {
            const situation = await getDetailStatus(matchId);
            return situation;
        },
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
                {/* <div className={style.largeGap}>
                    {secondRender || status === 'liveEvent' ? <LiveBox broadcastList={[]} /> : null}
                </div> */}
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
                <div className={style.largeGap}>
                    {secondRender || status === 'exponent' ? (
                        <Exponent exponentData={fetchInitData?.exponent || fetchData.exponent} />
                    ) : null}
                </div>
                <div className={style.largeGap}>
                    {secondRender || status === 'information' ? (
                        <Information information={information} />
                    ) : null}
                </div>
            </Slick>
        </div>
    );
}

export default TabContent;

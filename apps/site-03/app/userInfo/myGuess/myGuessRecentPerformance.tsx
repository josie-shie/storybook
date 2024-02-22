'use client';
import { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
    getMemberIndividualGuess,
    type GetMemberIndividualGuessResponse,
    type MemberIndividualGuessRecord,
    type IndividualGuessRecordDetail
} from 'data-center';
import Loading from '@/components/loading/loading';
import { useUserStore } from '@/store/userStore';
import { useMyGuessStore } from './myGuessStore';
import style from './myGuess.module.scss';
import { formatRate, sizeAndHandicapWinRate } from 'lib';

const dateActiveMap = {
    byWeek: { display: '周', value: 'byWeek' },
    byMonth: { display: '月', value: 'byMonth' },
    byQuarter: { display: '季', value: 'byQuarter' }
};

type FocusDetailType = 'summary' | 'handicap' | 'size';

function ReactEchartsComponent({
    myGuessData,
    focusDetail
}: {
    myGuessData: MemberIndividualGuessRecord;
    focusDetail: FocusDetailType;
}) {
    const chartOption = {
        tooltip: {
            trigger: 'item',
            showContent: false
        },
        title: {
            text: `{win|胜率}{large|${sizeAndHandicapWinRate(
                formatRate(myGuessData.size.lose, myGuessData.size.win),
                formatRate(myGuessData.handicap.lose, myGuessData.handicap.win)
            )}}{point|%} \n{small|共${myGuessData.summary.play}场}`,
            left: '46%',
            top: '47%',
            textAlign: 'center',
            textVerticalAlign: 'middle',
            textStyle: {
                fontSize: 12, // 调整字体大小
                fontWeight: 'bold',
                lineHeight: 20,
                rich: {
                    win: {
                        fontSize: 12,
                        color: '#fff',
                        fontWeight: 'bold'
                    },
                    large: {
                        fontSize: 18,
                        color: '#fff',
                        fontWeight: 'bold'
                    },
                    point: {
                        fontSize: 12,
                        color: '#fff',
                        fontWeight: 'bold'
                    },
                    small: {
                        color: '#9fc2ff',
                        fontSize: 12,
                        borderWidth: 4,
                        borderRadius: 2,
                        borderColor: '#3d6ebf',
                        backgroundColor: '#3d6ebf'
                    }
                }
            }
        },
        graphic: [
            {
                type: 'ring', // 或者使用 'circle' 並自己設定一個邊框寬度
                left: 'center',
                top: 'center',
                shape: {
                    r: 44, // 內半徑，取決於你的圓餅圖的大小和期望的邊框大小
                    r0: 45.5 // 外半徑，應該比內半徑大，差值決定邊框寬度
                },
                style: {
                    fill: 'none', // 無填充色
                    stroke: '#3d6ebf', // 邊框顏色
                    lineWidth: 17, // 邊框寬度
                    shadowColor: 'none' // 可選，邊框陰影顏色
                }
            }
        ],
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['65%', '85%'],
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'transparent'
                    },
                    scaleSize: 4
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: myGuessData[focusDetail].win,
                        name: 'Plan1',
                        itemStyle: {
                            color: '#e34b4b',
                            borderWidth: 6,
                            borderRadius: 6,
                            borderColor: '#3d6ebf'
                        }
                    },
                    {
                        value: myGuessData[focusDetail].draw,
                        name: 'Plan2',
                        itemStyle: {
                            color: '#9fc2ff',
                            borderWidth: 6,
                            borderRadius: 6,
                            borderColor: '#3d6ebf'
                        }
                    },
                    {
                        value: myGuessData[focusDetail].lose,
                        name: 'Plan3',
                        itemStyle: {
                            color: '#d9d9d9',
                            borderWidth: 6,
                            borderRadius: 6,
                            borderColor: '#3d6ebf'
                        }
                    }
                ]
            }
        ]
    };
    return <ReactEcharts option={chartOption} style={{ width: 120, height: 120 }} />;
}

function PerformanceBar({
    guessDetail,
    title
}: {
    guessDetail: IndividualGuessRecordDetail;
    title?: string;
}) {
    return (
        <>
            <div className={style.top}>
                <div className={style.total}>
                    {title} {guessDetail.play} 场
                </div>
                <div className={style.winRate}>
                    胜率
                    {formatRate(guessDetail.lose, guessDetail.win)}%
                </div>
            </div>
            <div className={style.bot}>
                <div className={style.percentage}>
                    <div className={style.win}>
                        <i></i>胜 {guessDetail.win}
                    </div>
                    <div className={style.walk}>
                        <i></i>走 {guessDetail.draw}
                    </div>
                    <div className={style.defeat}>
                        <i></i>负 {guessDetail.lose}
                    </div>
                </div>
            </div>
        </>
    );
}

function RecentPerformanceContent({ dateActiveTab }: { dateActiveTab: string }) {
    const myGuessData =
        useMyGuessStore.use.myGuess().recentPerformance[
            dateActiveTab as keyof GetMemberIndividualGuessResponse
        ];
    return (
        <>
            <ReactEchartsComponent focusDetail={'summary'} myGuessData={myGuessData} />
            <div className={style.detailContainer}>
                <div className={style.detailBlock}>
                    <PerformanceBar guessDetail={myGuessData.handicap} title="胜负" />
                </div>
                <div className={style.detailBlock}>
                    <PerformanceBar guessDetail={myGuessData.size} title="总进球" />
                </div>
            </div>
        </>
    );
}

function MyGuessRecentPerformance() {
    const [dateActiveTab, setDateActiveTab] = useState(dateActiveMap.byWeek.value);
    const handleTabClick = (tabName: string) => {
        setDateActiveTab(tabName);
    };
    const [isPerformanceLoading, setIsPerformanceLoading] = useState(false);
    const uid = useUserStore.use.userInfo().uid;
    const setRecentPerformance = useMyGuessStore.use.setRecentPerformance();

    useEffect(() => {
        const getPerformanceData = async () => {
            setIsPerformanceLoading(true);
            const performanceData = await getMemberIndividualGuess({ memberId: uid });
            if (performanceData.success) setRecentPerformance(performanceData.data);
            setIsPerformanceLoading(false);
        };

        if (uid) void getPerformanceData();
    }, [setRecentPerformance, uid]);
    return (
        <div className={style.echart}>
            <div className={style.title}>
                <div className={style.tab}>
                    {Object.entries(dateActiveMap).map(([key, value]) => (
                        <span
                            className={`${dateActiveTab === value.value && style.active} ${
                                isPerformanceLoading && style.disable
                            }`}
                            key={key}
                            onClick={() => {
                                handleTabClick(value.value);
                            }}
                        >
                            {value.display}榜
                        </span>
                    ))}
                </div>
            </div>
            <div className={style.recentGames}>
                {isPerformanceLoading ? (
                    <div className={style.loaderBox}>
                        <Loading />
                    </div>
                ) : (
                    <RecentPerformanceContent dateActiveTab={dateActiveTab} />
                )}
            </div>
        </div>
    );
}

export default MyGuessRecentPerformance;

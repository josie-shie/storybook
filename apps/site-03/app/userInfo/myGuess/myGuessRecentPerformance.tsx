'use client';
import { ProgressBar } from 'ui';
import { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { getMemberIndividualGuess } from 'data-center';
import Loading from '@/components/loading/loading';
import { useUserStore } from '@/app/userStore';
import {
    useMyGuessStore,
    type RecentPerformance,
    type Performance,
    type PerformanceDetail
} from './myGuessStore';
import style from './myGuess.module.scss';

const dateActiveMap = {
    byWeek: { display: '周', value: 'byWeek' },
    byMonth: { display: '月', value: 'byMonth' },
    byQuarter: { display: '季', value: 'byQuarter' }
};

type FocusDetailType = 'summary' | 'handicap' | 'size';

function ReactEchartsComponent({
    myGuessData,
    dateActiveTab,
    focusDetail
}: {
    myGuessData: Performance;
    dateActiveTab: string;
    focusDetail: FocusDetailType;
}) {
    const dateType = dateActiveMap[dateActiveTab as keyof typeof dateActiveMap].display;
    const chartOption = {
        tooltip: {
            trigger: 'item',
            showContent: false
        },
        title: {
            text: `{large|${
                myGuessData.rank === 0 ? '1000+' : myGuessData.rank
            }} \n${dateType}排名`,
            left: '46%',
            top: '47%',
            textAlign: 'center',
            textVerticalAlign: 'middle',
            textStyle: {
                fontSize: 12, // 调整字体大小
                fontWeight: 'bold',
                lineHeight: 20,
                rich: {
                    large: {
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                }
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['60%', '85%'],
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
                        itemStyle: { color: '#ED3A45', borderWidth: 2, borderColor: '#fff' }
                    },
                    {
                        value: myGuessData[focusDetail].draw,
                        name: 'Plan2',
                        itemStyle: { color: '#F3F3F3', borderWidth: 2, borderColor: '#fff' }
                    },
                    {
                        value: myGuessData[focusDetail].lose,
                        name: 'Plan3',
                        itemStyle: { color: '#BFBFBF', borderWidth: 2, borderColor: '#fff' }
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
    guessDetail: PerformanceDetail;
    title?: string;
}) {
    const formatRate = (lose: number, win: number) => {
        if (lose === 0 && win === 0) return 0;
        const winRate = (win / (lose + win)) * 100;
        return Number.isInteger(winRate) ? winRate : Number(winRate.toFixed(1));
    };
    return (
        <>
            <div className={style.top}>
                <div className={style.total}>
                    {title}共{guessDetail.play}场
                </div>
                <div className={style.percentage}>
                    <div className={style.win}>胜 {guessDetail.win}</div>
                    <div className={style.walk}>走 {guessDetail.draw}</div>
                    <div className={style.defeat}>负 {guessDetail.lose}</div>
                </div>
            </div>
            <div className={style.bot}>
                <div className={style.winRate}>
                    胜率
                    {formatRate(guessDetail.lose, guessDetail.win)}%
                </div>
                <div>{guessDetail.win}</div>
                <ProgressBar
                    background="#8D8D8D"
                    gapSize="small"
                    height={4}
                    radius
                    value={formatRate(guessDetail.lose, guessDetail.win)}
                />
            </div>
        </>
    );
}

function RecentPerformanceContent({ dateActiveTab }: { dateActiveTab: string }) {
    const [focusDetail, setFocusDetail] = useState<FocusDetailType>('summary');

    const handleChangeFocusDetail = (value: FocusDetailType) => {
        setFocusDetail(value);
    };

    const myGuessData =
        useMyGuessStore.use.myGuess().recentPerformance[dateActiveTab as keyof RecentPerformance];
    return (
        <>
            <ReactEchartsComponent
                dateActiveTab={dateActiveTab}
                focusDetail={focusDetail}
                myGuessData={myGuessData}
            />
            <div className={style.detailContainer}>
                <div
                    className={`${style.detailBlock} ${
                        focusDetail === 'summary' && style.focusDetail
                    }`}
                    onClick={() => {
                        handleChangeFocusDetail('summary');
                    }}
                >
                    <PerformanceBar guessDetail={myGuessData.summary} title="" />
                </div>
                <div
                    className={`${style.detailBlock} ${
                        focusDetail === 'size' && style.focusDetail
                    }`}
                    onClick={() => {
                        handleChangeFocusDetail('size');
                    }}
                >
                    <PerformanceBar guessDetail={myGuessData.handicap} title="让分" />
                </div>
                <div
                    className={`${style.detailBlock} ${
                        focusDetail === 'handicap' && style.focusDetail
                    }`}
                    onClick={() => {
                        handleChangeFocusDetail('handicap');
                    }}
                >
                    <PerformanceBar guessDetail={myGuessData.size} title="大小" />
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
        <>
            <div className={style.title}>
                <span>近期战绩</span>
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
        </>
    );
}

export default MyGuessRecentPerformance;

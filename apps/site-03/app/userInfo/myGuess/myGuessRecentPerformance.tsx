'use client';
import { ProgressBar } from 'ui';
import { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { getMemberIndividualGuess } from 'data-center';
import { useMyGuessStore, type RecentPerformance, type Performance } from './myGuessStore';
import style from './myGuess.module.scss';
import Loading from '@/components/loading/loading';
import { useUserStore } from '@/app/userStore';

const dateActiveMap = {
    byWeek: { display: '周', value: 'byWeek' },
    byMonth: { display: '月', value: 'byMonth' },
    byQuarter: { display: '季', value: 'byQuarter' }
};

type FocusDetailType = 'summary' | 'handicap' | 'size';

function ReactEchartsConponent({
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
            text: `{large|${myGuessData.rank}} \n${dateType}排名`,
            left: '46%',
            top: '47%',
            textAlign: 'center',
            textVerticalAlign: 'middle',
            textStyle: {
                fontSize: 12, // 調整字體大小
                fontWeight: 'bold',
                lineHeight: 20,
                rich: {
                    large: {
                        fontSize: 24,
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
                        itemStyle: { color: '#F3F3F3', borderWidth: 2, borderColor: '#fff' }
                    },
                    {
                        value: myGuessData[focusDetail].draw,
                        name: 'Plan2',
                        itemStyle: { color: '#BFBFBF', borderWidth: 2, borderColor: '#fff' }
                    },
                    {
                        value: myGuessData[focusDetail].lose,
                        name: 'Plan3',
                        itemStyle: { color: '#ED3A45', borderWidth: 2, borderColor: '#fff' }
                    }
                ]
            }
        ]
    };
    return <ReactEcharts option={chartOption} style={{ width: 120, height: 120 }} />;
}

function RecentPerformenceContent({ dateActiveTab }: { dateActiveTab: string }) {
    const [focusDetail, setFocusDetail] = useState<FocusDetailType>('summary');

    const formatRate = (lose: number, win: number) => {
        if (lose === 0 && win === 0) return 0;
        const winRate = (win / (lose + win)) * 100;
        return Number.isInteger(winRate) ? winRate : winRate.toFixed(1);
    };

    const handleChangeFocusDetail = (value: FocusDetailType) => {
        setFocusDetail(value);
    };

    const myGuessData =
        useMyGuessStore.use.myGuess().recentPerformance[dateActiveTab as keyof RecentPerformance];
    return (
        <>
            <ReactEchartsConponent
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
                    <div className={style.top}>
                        <div className={style.total}>共{myGuessData.summary.play}场</div>
                        <div className={style.percentage}>
                            <div className={style.win}>胜 {myGuessData.summary.win}</div>
                            <div className={style.walk}>走 {myGuessData.summary.draw}</div>
                            <div className={style.defeat}>負 {myGuessData.summary.lose}</div>
                        </div>
                    </div>
                    <div className={style.bot}>
                        <div className={style.winRate}>
                            勝率
                            {formatRate(myGuessData.summary.lose, myGuessData.summary.win)}%
                        </div>
                        <ProgressBar
                            background="#8D8D8D"
                            gapSize="small"
                            height={4}
                            radius
                            value={myGuessData.summary.win}
                        />
                    </div>
                </div>
                <div
                    className={`${style.detailBlock} ${
                        focusDetail === 'size' && style.focusDetail
                    }`}
                    onClick={() => {
                        handleChangeFocusDetail('size');
                    }}
                >
                    <div className={style.top}>
                        <div className={style.total}>讓球{myGuessData.handicap.play}场</div>
                        <div className={style.percentage}>
                            <div className={style.win}>胜 {myGuessData.handicap.win}</div>
                            <div className={style.walk}>走 {myGuessData.handicap.draw}</div>
                            <div className={style.defeat}>負 {myGuessData.handicap.lose}</div>
                        </div>
                    </div>
                    <div className={style.bot}>
                        <div className={style.winRate}>
                            勝率
                            {formatRate(myGuessData.handicap.lose, myGuessData.handicap.win)}%
                        </div>
                        <ProgressBar
                            background="#8D8D8D"
                            gapSize="small"
                            height={4}
                            radius
                            value={myGuessData.handicap.win}
                        />
                    </div>
                </div>
                <div
                    className={`${style.detailBlock} ${
                        focusDetail === 'handicap' && style.focusDetail
                    }`}
                    onClick={() => {
                        handleChangeFocusDetail('handicap');
                    }}
                >
                    <div className={style.top}>
                        <div className={style.total}>大小{myGuessData.size.play}场</div>
                        <div className={style.percentage}>
                            <div className={style.win}>胜 {myGuessData.size.win}</div>
                            <div className={style.walk}>走 {myGuessData.size.lose}</div>
                            <div className={style.defeat}>負 {myGuessData.size.lose}</div>
                        </div>
                    </div>
                    <div className={style.bot}>
                        <div className={style.winRate}>
                            勝率
                            {formatRate(myGuessData.size.lose, myGuessData.size.win)}%
                        </div>
                        <ProgressBar
                            background="#8D8D8D"
                            gapSize="small"
                            height={4}
                            radius
                            value={myGuessData.size.win}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

function MyGuessRecentPerformence() {
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
                    <div className={style.loderBox}>
                        <Loading />
                    </div>
                ) : (
                    <RecentPerformenceContent dateActiveTab={dateActiveTab} />
                )}
            </div>
        </>
    );
}

export default MyGuessRecentPerformence;

'use client';
import { useState } from 'react';
import { ProgressBar } from 'ui';
import { useSearchParams } from 'next/navigation';
import ReactEcharts from 'echarts-for-react';
import { creatMasterAvatarStore } from './masterAvatarStore';
import AnalysisItem from './components/analysisItem/analysisItem';
import MasterItem from './components/masterItem/masterItem';
import BettingPlan from './components/bettingPlan/bettingPlan';
import style from './infoTabs.module.scss';

function InfoTabs({ params }: { params: { masterId: string } }) {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const [dateActiveTab, setDateActiveTab] = useState('日榜');
    const [planActiveTab, setPlanActiveTab] = useState('全部');

    creatMasterAvatarStore({
        predictArticleList: []
    });

    const chartOption = {
        tooltip: {
            trigger: 'item',
            showContent: false
        },
        title: {
            text: '{large|1} \n周排名',
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
                        value: 548,
                        name: 'Plan1',
                        itemStyle: { color: '#F3F3F3', borderWidth: 2, borderColor: '#fff' }
                    },
                    {
                        value: 415,
                        name: 'Plan2',
                        itemStyle: { color: '#BFBFBF', borderWidth: 2, borderColor: '#fff' }
                    },
                    {
                        value: 680,
                        name: 'Plan3',
                        itemStyle: { color: '#ED3A45', borderWidth: 2, borderColor: '#fff' }
                    }
                ]
            }
        ]
    };

    const handleTabClick = (tabName: string) => {
        setDateActiveTab(tabName);
    };

    const handlePlanTabClick = (tabName: string) => {
        setPlanActiveTab(tabName);
    };

    return (
        <div className={style.infoTabs}>
            {status === 'analysis' && (
                <div className={style.tabContest}>
                    <AnalysisItem params={params} />
                </div>
            )}

            {status === 'guess' && (
                <div className={style.tabContest}>
                    <div className={style.title}>
                        <span>近期战绩</span>
                        <div className={style.tab}>
                            <span
                                className={dateActiveTab === '日榜' ? style.active : ''}
                                onClick={() => {
                                    handleTabClick('日榜');
                                }}
                            >
                                日榜
                            </span>
                            <span
                                className={dateActiveTab === '周榜' ? style.active : ''}
                                onClick={() => {
                                    handleTabClick('周榜');
                                }}
                            >
                                周榜
                            </span>
                            <span
                                className={dateActiveTab === '月榜' ? style.active : ''}
                                onClick={() => {
                                    handleTabClick('月榜');
                                }}
                            >
                                月榜
                            </span>
                        </div>
                    </div>
                    <div className={style.recentGames}>
                        <ReactEcharts option={chartOption} style={{ width: 120, height: 120 }} />
                        <div className={style.detailContainer}>
                            <div className={`${style.detailBlock} ${style.focusDetail}`}>
                                <div className={style.top}>
                                    <div className={style.total}>共100场</div>
                                    <div className={style.percentage}>
                                        <div className={style.win}>胜 50</div>
                                        <div className={style.walk}>走 10</div>
                                        <div className={style.defeat}>負 40</div>
                                    </div>
                                </div>
                                <div className={style.bot}>
                                    <div className={style.winRate}>勝率 50%</div>
                                    <ProgressBar
                                        background="#8D8D8D"
                                        gapSize="small"
                                        height={4}
                                        radius
                                    />
                                </div>
                            </div>
                            <div className={style.detailBlock}>
                                <div className={style.top}>
                                    <div className={style.total}>让分75场</div>
                                    <div className={style.percentage}>
                                        <div className={style.win}>胜 50</div>
                                        <div className={style.walk}>走 10</div>
                                        <div className={style.defeat}>負 40</div>
                                    </div>
                                </div>
                                <div className={style.bot}>
                                    <div className={style.winRate}>勝率 50%</div>
                                    <ProgressBar
                                        background="#8D8D8D"
                                        gapSize="small"
                                        height={4}
                                        radius
                                    />
                                </div>
                            </div>
                            <div className={style.detailBlock}>
                                <div className={style.top}>
                                    <div className={style.total}>大小25场</div>
                                    <div className={style.percentage}>
                                        <div className={style.win}>胜 50</div>
                                        <div className={style.walk}>走 10</div>
                                        <div className={style.defeat}>負 40</div>
                                    </div>
                                </div>
                                <div className={style.bot}>
                                    <div className={style.winRate}>勝率 50%</div>
                                    <ProgressBar
                                        background="#8D8D8D"
                                        gapSize="small"
                                        height={4}
                                        radius
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.title}>
                        <span>方案</span>
                        <div className={style.tabText}>
                            <span
                                className={planActiveTab === '全部' ? style.active : ''}
                                onClick={() => {
                                    handlePlanTabClick('全部');
                                }}
                            >
                                全部
                            </span>
                            <span
                                className={planActiveTab === '让分' ? style.active : ''}
                                onClick={() => {
                                    handlePlanTabClick('让分');
                                }}
                            >
                                让分
                            </span>
                            <span
                                className={planActiveTab === '大小' ? style.active : ''}
                                onClick={() => {
                                    handlePlanTabClick('大小');
                                }}
                            >
                                大小
                            </span>
                        </div>
                    </div>
                    <div>
                        <BettingPlan />
                        <BettingPlan result="win" />
                        <BettingPlan result="defeat" />
                    </div>
                </div>
            )}
            {status === 'focus' && (
                <div className={style.tabContest}>
                    <MasterItem params={params} />
                </div>
            )}
        </div>
    );
}

export default InfoTabs;

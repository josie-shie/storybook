'use client';
import { Tab, Tabs } from 'ui';
import ReactEcharts from 'echarts-for-react';
import AnalysisItem from '../components/analysisItem/analysisItem';
import MasterItem from '../components/masterItem/masterItem';
import style from './infoTabs.module.scss';

function InfoTabs() {
    const tabStyle = {
        gap: 0,
        swiperOpen: false,
        buttonRadius: 0
    };

    const masterList = [
        {
            id: 12,
            name: '老梁聊球',
            hotStreak: 2,
            ranking: 10,
            followed: false,
            unlockNumber: 1800,
            fansNumber: 34516,
            description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
        },
        {
            id: 17,
            name: '柯侯配',
            hotStreak: 6,
            ranking: 7,
            followed: true,
            unlockNumber: 2200,
            fansNumber: 54321,
            description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
        },
        {
            id: 18,
            name: '柯侯配',
            hotStreak: 6,
            ranking: 7,
            followed: true,
            unlockNumber: 2200,
            fansNumber: 54321,
            description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
        },
        {
            id: 19,
            name: '柯侯配',
            hotStreak: 6,
            ranking: 7,
            followed: true,
            unlockNumber: 2200,
            fansNumber: 54321,
            description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
        },
        {
            id: 20,
            name: '柯侯配',
            hotStreak: 6,
            ranking: 7,
            followed: true,
            unlockNumber: 2200,
            fansNumber: 54321,
            description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
        },
        {
            id: 21,
            name: '柯侯配',
            hotStreak: 6,
            ranking: 7,
            followed: true,
            unlockNumber: 2200,
            fansNumber: 54321,
            description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
        }
    ];

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
                    { value: 548, name: 'Plan1', itemStyle: { color: '#F3F3F3' } },
                    { value: 415, name: 'Plan2', itemStyle: { color: '#BFBFBF' } },
                    { value: 680, name: 'Plan3', itemStyle: { color: '#ED3A45' } }
                ]
            }
        ]
    };

    return (
        <div className={style.infoTabs}>
            <Tabs
                buttonRadius={tabStyle.buttonRadius}
                gap={tabStyle.gap}
                position="center"
                styling="underline"
                swiperOpen={tabStyle.swiperOpen}
            >
                <Tab label="分析">
                    <div className={style.tabContest}>
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                        <AnalysisItem />
                    </div>
                </Tab>
                <Tab label="竟猜">
                    <div className={style.tabContest}>
                        <div className={style.recentGames}>
                            <ReactEcharts
                                option={chartOption}
                                style={{ width: 100, height: 100 }}
                            />
                            <div className={style.detail}>
                                <div className={style.listItem}>
                                    <span className={style.total}>总共: 100场</span>
                                    <span className={style.win}>胜 50</span>
                                    <span className={style.work}>走 10</span>
                                    <span className={style.defeat}>負 40</span>
                                    <span className={style.winRate}>勝率 50%</span>
                                </div>
                                <div className={style.listItem}>
                                    <span className={style.total}>总共: 100场</span>
                                    <span className={style.win}>胜 50</span>
                                    <span className={style.work}>走 10</span>
                                    <span className={style.defeat}>負 40</span>
                                    <span className={style.winRate}>勝率 50%</span>
                                </div>
                                <div className={style.listItem}>
                                    <span className={style.total}>总共: 100场</span>
                                    <span className={style.win}>胜 50</span>
                                    <span className={style.work}>走 10</span>
                                    <span className={style.defeat}>負 40</span>
                                    <span className={style.winRate}>勝率 50%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab label="关注">
                    <div className={style.tabContest}>
                        {masterList.map(item => (
                            <MasterItem item={item} key={item.id} />
                        ))}
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}

export default InfoTabs;

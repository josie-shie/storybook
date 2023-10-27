'use client';
import { Tab, Tabs } from 'ui';
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
                    <div className={style.tabContest}>Container</div>
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

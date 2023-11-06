'use client';
import { Tab, Tabs } from 'ui';
import Handicap from './(dashboard)/handicap/page';
import GoalMinutes from './(dashboard)/minutes/page';
import Rang from './(dashboard)/range/page';
import Bodan from './(dashboard)/bodan/page';
import style from './dashboard.module.scss';

function Dashboard() {
    const tabStyle = {
        gap: 18,
        swiperOpen: true,
        scrolling: true,
        buttonRadius: 30
    };
    return (
        <div className={style.dashboard}>
            <Tabs
                buttonRadius={tabStyle.buttonRadius}
                gap={tabStyle.gap}
                position="flexStart"
                scrolling={tabStyle.scrolling}
                styling="button"
                swiperOpen={tabStyle.swiperOpen}
            >
                <Tab label="讓球大小">
                    <Handicap />
                </Tab>
                <Tab label="15分鐘進球">
                    <GoalMinutes />
                </Tab>
                <Tab label="進球數區間">
                    <Rang />
                </Tab>
                <Tab label="全場波膽">
                    <Bodan />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Dashboard;

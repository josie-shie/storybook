'use client';

import { Suspense } from 'react';
import { Tab, Tabs } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import GameSituation from './(dashboard)/gameSituation/page';
import TextBroadcast from './(dashboard)/textBroadcast/page';
import style from './dashboard.module.scss';

function Dashboard() {
    const tabStyle = {
        gap: 0,
        swiperOpen: true,
        buttonRadius: 0
    };
    return (
        <div className={style.dashboard}>
            <Tabs
                buttonRadius={tabStyle.buttonRadius}
                gap={tabStyle.gap}
                position="center"
                styling="underline"
                swiperOpen={tabStyle.swiperOpen}
            >
                <Tab label="赛况">
                    <Suspense fallback={<CircularProgress />}>
                        <GameSituation />
                    </Suspense>
                </Tab>
                <Tab label="直播">
                    <Suspense fallback={<CircularProgress />}>
                        <TextBroadcast />
                    </Suspense>
                </Tab>
                <Tab label="分析">
                    <Suspense fallback={<CircularProgress />}>Analyze</Suspense>
                </Tab>
                <Tab label="指数">
                    <Suspense fallback={<CircularProgress />}>Exponent</Suspense>
                </Tab>
                <Tab label="预测">
                    <Suspense fallback={<CircularProgress />}>Predict</Suspense>
                </Tab>
                <Tab label="聊天">MessageBoard</Tab>
            </Tabs>
        </div>
    );
}

export default Dashboard;

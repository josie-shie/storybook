'use client';

import { Suspense } from 'react';
import { Tab, Tabs } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';

function Dashboard() {
    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };
    return (
        <div>
            <Tabs
                buttonRadius={tabStyle.buttonRadius}
                gap={tabStyle.gap}
                position="center"
                styling="underline"
                swiperOpen={tabStyle.swiperOpen}
            >
                <Tab label="赛况">
                    <Suspense fallback={<CircularProgress />}>GameStatus</Suspense>
                </Tab>
                <Tab label="直播">
                    <Suspense fallback={<CircularProgress />}>LiveText</Suspense>
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

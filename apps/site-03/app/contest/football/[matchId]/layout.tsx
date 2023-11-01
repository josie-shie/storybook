'use client';

import { Suspense } from 'react';
import type { ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './dataTable.scss';
import { Tab, Tabs } from 'ui';
import LiveBox from './liveBox';
import GuessBar from './guessBar';
import style from './contestDetail.module.scss';

export default function DashboardLayout({
    children,
    params
}: {
    children: ReactNode;
    params: { matchId: string };
}) {
    const tabStyle = {
        gap: 0,
        swiperOpen: true,
        buttonRadius: 0
    };

    const tabList = [
        {
            label: '聊天',
            to: `/contest/football/${params.matchId}/messageBoard`
        },
        {
            label: '赛况',
            to: `/contest/football/${params.matchId}/situation`
        },
        {
            label: '直播',
            to: `/contest/football/${params.matchId}/textBroadcast`
        },
        {
            label: '分析',
            to: `/contest/football/${params.matchId}/analyze`
        },
        {
            label: '预测',
            to: `/contest/football/${params.matchId}/predict`
        },
        {
            label: '指数',
            to: `/contest/football/${params.matchId}/exponent`
        }
    ];

    return (
        <>
            <LiveBox />
            <GuessBar />
            <div className={style.contestDetail}>
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
                    gap={tabStyle.gap}
                    position="center"
                    styling="underline"
                    swiperOpen={tabStyle.swiperOpen}
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.label} label={item.label} to={item.to}>
                                <Suspense fallback={<CircularProgress />}>{children}</Suspense>
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </>
    );
}

'use client';
import { Tab, Tabs } from 'ui';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';
import style from './contestDetail.module.scss';
import MessageBoard from './(dashboard)/messageBoard/messageBoard';
import Loading from '@/components/loading/loading';

function TabBar({ children, matchId }: { children: ReactNode; matchId: number }) {
    const tabStyle = {
        gap: 0,
        swiperOpen: true,
        buttonRadius: 0
    };

    const route = usePathname().split('/');
    const tabList = [
        {
            label: '聊天',
            to: `/football/${matchId}/messageBoard`,
            params: 'messageBoard'
        },
        {
            label: '赛况',
            to: `/football/${matchId}/situation`,
            params: 'situation'
        },
        // 數據源暫無資料 先隱藏
        // {
        //     label: '直播',
        //     to: `/football/${matchId}/textBroadcast`,
        //     params: 'textBroadcast'
        // },
        {
            label: '分析',
            to: `/football/${matchId}/analyze`,
            params: 'analyze'
        },
        {
            label: '预测',
            to: `/football/${matchId}/predict`,
            params: 'predict'
        },
        {
            label: '指数',
            to: `/football/${matchId}/exponent`,
            params: 'exponent'
        }
    ];
    return (
        <div className={style.contestDetail}>
            <Tabs
                buttonRadius={tabStyle.buttonRadius}
                defaultValue={route[route.length - 1] === matchId.toString() ? 0 : undefined}
                fullBlock={
                    route[route.length - 1] === matchId.toString() ||
                    route[route.length - 1] === 'messageBoard'
                }
                gap={tabStyle.gap}
                position="center"
                styling="underline"
                swiperOpen={tabStyle.swiperOpen}
            >
                {tabList.map(item => {
                    return (
                        <Tab key={item.label} label={item.label} to={item.to}>
                            {item.params === route[route.length - 1] && (
                                <Suspense fallback={<Loading />}>{children}</Suspense>
                            )}

                            {route[route.length - 1] === matchId.toString() &&
                                item.params === 'messageBoard' && (
                                    <MessageBoard matchId={matchId} />
                                )}
                        </Tab>
                    );
                })}
            </Tabs>
        </div>
    );
}

export default TabBar;

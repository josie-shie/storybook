'use client';

import type { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tab, Tabs } from 'ui';
import style from './layout.module.scss';
import Info from './info';
import Header from '@/components/header/headerTitle';

function MasterAvatarLayout({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const headerProps = {
        title: '专家预测'
    };
    const tabStyle = {
        gap: 0,
        swiperOpen: true,
        buttonRadius: 0
    };
    const tabList = [
        {
            label: `预测文章(${199})`,
            to: '/master/article/masterAvatar?status=analysis',
            status: 'analysis'
        },
        {
            label: '猜球',
            to: '/master/article/masterAvatar?status=guess',
            status: 'guess'
        },
        {
            label: '关注',
            to: '/master/article/masterAvatar?status=focus',
            status: 'focus'
        }
    ];

    return (
        <>
            <Header title={headerProps.title} />
            <Info />
            <div className={style.masterAvatar}>
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
                                {item.status === status && children}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </>
    );
}

export default MasterAvatarLayout;

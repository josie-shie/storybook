'use client';

import { type ReactNode } from 'react';
import { Tab, Tabs } from 'ui';
import { usePathname } from 'next/navigation';
import Footer from '@/components/footer/footer';
import Header from './header';
import style from './layout.module.scss';
import { createNoticeStore } from './noticeStore';
import EditBar from './editBar';

function NoticeLayout({ children }: { children: ReactNode }) {
    createNoticeStore({
        mailList: []
    });

    const route = usePathname().split('/');
    const pathName = route[route.length - 1];

    const tabStyle = {
        gap: 0,
        swiperOpen: false,
        buttonRadius: 0
    };

    const tabList = [
        {
            label: '消息',
            to: '/notice',
            status: 'notice'
        },
        {
            label: '聊天',
            to: '/notice/chat',
            status: 'chat'
        }
    ];

    return (
        <div className={style.noticeLayout}>
            <Header />
            <div className={style.noticeContent}>
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
                                {item.status === pathName && children}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
            <Footer />
            <EditBar />
        </div>
    );
}

export default NoticeLayout;

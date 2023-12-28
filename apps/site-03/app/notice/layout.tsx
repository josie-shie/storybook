'use client';

import { type ReactNode } from 'react';
import { Tab, Tabs } from 'ui';
import { usePathname } from 'next/navigation';
import Footer from '@/components/footer/footer';
import { useMessageStore } from '@/app/messageStore';
import Header from './header';
import style from './layout.module.scss';
import { createNoticeStore } from './noticeStore';
import EditBar from './editBar';

function NoticeLayout({ children }: { children: ReactNode }) {
    const unreadMessageNotify = useMessageStore.use.unreadMessageNotify();

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

    const mailCountString = unreadMessageNotify.mailCount
        ? `（${unreadMessageNotify.mailCount}）`
        : '';
    const chatCountString = unreadMessageNotify.chatCount
        ? `（${unreadMessageNotify.chatCount}）`
        : '';

    const tabList = [
        {
            label: `消息${mailCountString}`,
            to: '/notice',
            status: 'notice'
        },
        {
            label: `聊天${chatCountString}`,
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

'use client';

import { type ReactNode } from 'react';
import { Tab, Tabs } from 'ui';
import { usePathname } from 'next/navigation';
import { useMessageStore } from '@/app/messageStore';
import Header from './header';
import style from './layout.module.scss';
import { createNoticeStore } from './noticeStore';
import EditBar from './editBar';

function CreateNoticeStore({ children }: { children: ReactNode }) {
    createNoticeStore({
        mailList: []
    });

    return <>{children}</>;
}

function NoticeTabs({ children }: { children: ReactNode }) {
    const unreadMessageNotify = useMessageStore.use.unreadMessageNotify();

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
            status: 'notice',
            id: 'notice,'
        },
        {
            label: `聊天${chatCountString}`,
            to: '/notice/chat',
            status: 'chat',
            id: 'chat'
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
                            <Tab key={item.id} label={item.label} to={item.to}>
                                {item.status === pathName && children}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
            <EditBar />
        </div>
    );
}

function NoticeLayout({ children }: { children: ReactNode }) {
    return (
        <CreateNoticeStore>
            <NoticeTabs>{children}</NoticeTabs>
        </CreateNoticeStore>
    );
}

export default NoticeLayout;

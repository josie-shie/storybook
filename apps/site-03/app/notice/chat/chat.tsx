'use client';
import { useEffect, useRef } from 'react';
import type { MessageResponse } from 'lib';
import { messageService, getMessageResponse, cancelMessage } from 'lib';
import NoData from '@/components/baseNoData/noData';
import { useNoticeStore } from '../noticeStore';
import style from '../notice.module.scss';
import ChatCard from './components/chatCard';
import ChatInfo from './components/chatInfo';

function ChatList() {
    const firstTimeRef = useRef(true);
    const editStatus = useNoticeStore.use.editStatus();
    const chatList = useNoticeStore.use.chatList();
    const setChatList = useNoticeStore.use.setChatList();

    useEffect(() => {
        if (firstTimeRef.current) {
            firstTimeRef.current = false;
            void messageService.send({
                action: 'get_room_list',
                type: 'private'
            });
        }
    }, []);

    useEffect(() => {
        const handleMessage = (res: MessageResponse) => {
            if (res.action === 'new_message' && window.location.pathname === '/notice/chat') {
                void messageService.send({
                    action: 'get_room_list',
                    type: 'private'
                });
            }
        };

        getMessageResponse(handleMessage);
    }, []);

    useEffect(() => {
        const handleRes = (res: MessageResponse) => {
            if (res.action === 'get_room_list') {
                if (res.rooms) {
                    setChatList(res.rooms);
                }
            }
        };
        getMessageResponse(handleRes);
        return () => {
            cancelMessage(handleRes);
        };
    }, [setChatList]);

    if (chatList.length === 0) {
        return <NoData />;
    }

    return (
        <ul className={`${style.noticeList} ${editStatus && style.isEdit}`}>
            {chatList.map(chat =>
                chat.lastMessages.length > 0 ? <ChatCard chatData={chat} key={chat.roomId} /> : null
            )}
        </ul>
    );
}

function Chat() {
    return (
        <>
            <ChatList />
            <ChatInfo />
        </>
    );
}

export default Chat;

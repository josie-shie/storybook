'use client';
import { useEffect } from 'react';
import type { MessageResponse } from 'lib';
import { messageService, getMessageResponse, cancelMessage } from 'lib';
import { useNoticeStore } from '../noticeStore';
import style from '../notice.module.scss';
import ChatCard from './components/chatCard';
import ChatInfo from './components/chatInfo';

function ChatList() {
    const editStatus = useNoticeStore.use.editStatus();
    const chatList = useNoticeStore.use.chatList();
    const setChatList = useNoticeStore.use.setChatList();

    useEffect(() => {
        void messageService.send({
            action: 'get_room_list',
            type: 'private'
        });
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

    return (
        <ul className={`${style.noticeList} ${editStatus && style.isEdit}`}>
            {chatList.map(chat => (
                <ChatCard chatData={chat} key={chat.roomId} />
            ))}
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

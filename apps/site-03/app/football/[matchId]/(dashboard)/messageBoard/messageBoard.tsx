'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { cancelMessage, getMessageResponse, messageService, getRandomInt } from 'lib';
import type { MessageResponse, MessageItem } from 'lib';
import MessageRoom from '@bf/message-board';
import '@bf/message-board/style.css';
import type { Message } from '@bf/message-board/types';
import Skeleton from '@mui/material/Skeleton';
import style from './messageBoard.module.scss';
import SentIcon from './img/sent.png';
import SmileIcon from './img/smile.png';
import { useMessageStore } from '@/app/messageStore';
import { useUserStore } from '@/app/userStore';
import { useAuthStore } from '@/app/(auth)/authStore';

function MessageBoard({ matchId }: { matchId: number }) {
    const firstTimeRef = useRef(true);
    const readyChat = useRef(false);
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();
    const forbiddenWords = useMessageStore.use.forbiddenWords();
    const [messageList, setMessageList] = useState<MessageItem[]>([]);
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const chatSkeleton = Array(16).fill(null);

    useEffect(() => {
        const handleMsgRes = (data: MessageResponse) => {
            if (!readyChat.current) readyChat.current = true;

            if (data.action === 'new_message' && data.roomId === matchId.toString()) {
                setMessageList(prev => {
                    if (data.message) {
                        return [...prev, data.message];
                    }
                    return prev;
                });
            }
            if (data.action === 'get_message') {
                setMessageList(prev => {
                    if (data.list) {
                        return [...prev, ...data.list];
                    }
                    return prev;
                });
            }
        };

        getMessageResponse(handleMsgRes);

        if (firstTimeRef.current) {
            firstTimeRef.current = false;
            void messageService.send({
                roomId: matchId.toString(),
                correlationId: `c${getRandomInt(1, 10000)}`,
                action: 'join_room'
            });

            void messageService.send({
                roomId: matchId.toString(),
                action: 'get_message',
                page: 1
            });
        }
        return () => {
            cancelMessage(handleMsgRes);
            if (readyChat.current) {
                void messageService.send({
                    roomId: matchId.toString(),
                    correlationId: `c${getRandomInt(1, 10000)}`,
                    action: 'leave_room'
                });
            }
        };
    }, [matchId]);

    const addMessage = (message: Message) => {
        if (!isLogin) {
            setAuthQuery('login');
            setIsDrawerOpen(true);
            return;
        }

        if (message.emoticon) {
            void messageService.send({
                roomId: matchId.toString(),
                correlationId: `c${getRandomInt(1, 10000)}`,
                action: 'upload_picture',
                ...message
            });
        }
        void messageService.send({
            roomId: matchId.toString(),
            correlationId: `c${getRandomInt(1, 10000)}`,
            action: 'send_message',
            ...message
        });
    };

    return (
        <>
            {readyChat.current ? (
                <div className={style.messageBoard}>
                    <MessageRoom
                        addMessage={addMessage}
                        group
                        messagesList={messageList}
                        sendBtn
                        sendIcon={<Image alt="sent" height={24} src={SentIcon} width={24} />}
                        silence={forbiddenWords}
                        smileIcon={<Image alt="sent" height={24} src={SmileIcon} width={24} />}
                        uid={String(userInfo.uid) || ''}
                    />
                </div>
            ) : (
                <div className={style.chatSkeleton}>
                    {chatSkeleton.map((_, idx) => (
                        <Skeleton
                            height={20}
                            key={`skeleton_${idx.toString()}`}
                            variant="rounded"
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default MessageBoard;

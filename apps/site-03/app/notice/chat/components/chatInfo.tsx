'use client';

import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Image from 'next/image';
import { messageService, getMessageResponse, cancelMessage, getRandomInt } from 'lib';
import type { MessageResponse, Message, MessageItem } from 'lib';
import MessageRoom from '@bf/message-board';
import '@bf/message-board/style.css';
import { useNoticeStore } from '../../noticeStore';
import backLeftArrowImg from '../../img/backLeftArrow.png';
import SentIcon from '../img/sent.png';
import SmileIcon from '../img/smile.png';
import style from './chatInfo.module.scss';
import { useLockBodyScroll } from '@/hooks/lockScroll';
import { useMessageStore } from '@/app/messageStore';
import { useUserStore } from '@/app/userStore';

function Header({ userName }: { userName: string }) {
    const resetSelectedChatData = useNoticeStore.use.resetSelectedChatData();

    return (
        <div className={style.headerDetail}>
            <div className={style.pageTitle}>
                <Image
                    alt=""
                    className={style.back}
                    height={24}
                    onClick={() => {
                        resetSelectedChatData();
                    }}
                    src={backLeftArrowImg}
                    width={24}
                />
                <div className={style.text}>{userName}</div>
            </div>
        </div>
    );
}

function ChatInfo() {
    const [infoStatus, setInfoStatus] = useState(false);
    const [messagesList, setMessageList] = useState<MessageItem[]>([]);
    const selectedChatData = useNoticeStore.use.selectedChatData();
    const forbiddenWords = useMessageStore.use.forbiddenWords();
    const userInfo = useUserStore.use.userInfo();

    useEffect(() => {
        if (selectedChatData.roomId) {
            setInfoStatus(true);
        } else {
            setInfoStatus(false);
        }
    }, [selectedChatData.roomId]);

    useLockBodyScroll();

    useEffect(() => {
        const handleMessage = (res: MessageResponse) => {
            if (res.action === 'get_message' && res.list) {
                const lastMessage = res.list.slice(-1)[0];

                if (lastMessage.status === 'sent') {
                    void messageService.send({
                        action: 'read_msg',
                        roomId: selectedChatData.roomId,
                        correlationId: `c${getRandomInt(1, 10000)}`,
                        messageId: lastMessage.messageId
                    });
                }
                setMessageList(res.list);
            }
            if (
                res.action === 'new_message' &&
                res.message &&
                selectedChatData.roomId === res.roomId
            ) {
                setMessageList(prev => {
                    if (res.message) {
                        return [...prev, res.message];
                    }
                    return prev;
                });
            }
        };

        getMessageResponse(handleMessage);
        if (selectedChatData.roomId) {
            void messageService.send({
                receiver: selectedChatData.user,
                correlationId: `c${getRandomInt(1, 10000)}`,
                action: 'join_room'
            });
            void messageService.send({
                action: 'get_message',
                roomId: selectedChatData.roomId
            });
        }

        return () => {
            cancelMessage(handleMessage);
            if (selectedChatData.roomId) {
                void messageService.send({
                    roomId: selectedChatData.roomId,
                    correlationId: `c${getRandomInt(1, 10000)}`,
                    action: 'leave_room'
                });
                void messageService.send({
                    action: 'get_room_list',
                    type: 'private'
                });
            }
        };
    }, [selectedChatData.roomId]);

    const addMessage = (message: Message) => {
        void messageService.send({
            action: 'send_message',
            correlationId: `c${getRandomInt(1, 10000)}`,
            roomId: selectedChatData.roomId,
            ...message
        });
    };

    return (
        <div>
            <Drawer
                anchor="right"
                onClose={() => {
                    setInfoStatus(false);
                }}
                open={infoStatus}
            >
                <div className={style.chatInfo}>
                    <Header
                        userName={
                            typeof selectedChatData.user !== 'undefined'
                                ? selectedChatData.user.name
                                : ''
                        }
                    />
                    {selectedChatData.roomId ? (
                        <div className={style.chat}>
                            <MessageRoom
                                addMessage={addMessage}
                                messagesList={messagesList}
                                sendBtn
                                sendIcon={
                                    <Image alt="sent" height={24} src={SentIcon} width={24} />
                                }
                                silence={forbiddenWords}
                                smileIcon={
                                    <Image alt="sent" height={24} src={SmileIcon} width={24} />
                                }
                                uid={String(userInfo.uid) || ''}
                            />
                        </div>
                    ) : null}
                </div>
            </Drawer>
        </div>
    );
}

export default ChatInfo;

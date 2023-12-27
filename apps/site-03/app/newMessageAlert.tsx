'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { mqttService } from 'lib';
import { Badge } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import type { NotifyMessage } from 'lib';
import Link from 'next/link';
import style from './newMessageAlert.module.scss';
import MessageInfo from './img/messageInfo.png';
import { useMessageStore } from './messageStore';

function NewMessageAlert() {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const firstTimeRef = useRef(true);
    const newMessageNotify = useMessageStore.use.newMessageNotify();
    const isNewMessageVisible = useMessageStore.use.isNewMessageVisible();

    useEffect(() => {
        const updateNewMessageNotify = useMessageStore.getState().updateNewMessageNotify;
        const updateUnreadMessageNotify = useMessageStore.getState().updateUnreadMessageNotify;
        const setIsNewMessageVisible = useMessageStore.getState().setIsNewMessageVisible;

        if (!firstTimeRef.current) return;
        firstTimeRef.current = false;
        const syncGlobalNotifyStore = (notify: NotifyMessage) => {
            if (notify.notifyType === 'newMessage') {
                timerRef.current && clearTimeout(timerRef.current);
                updateNewMessageNotify({
                    uid: notify.uid,
                    ...notify.newMessageNotify
                });
                setIsNewMessageVisible(true);
                timerRef.current = setTimeout(() => {
                    setIsNewMessageVisible(false);
                }, 2000);
            }
            if (notify.notifyType === 'unreadMessage') {
                updateUnreadMessageNotify({
                    uid: notify.uid,
                    ...notify.unreadMessageNotify
                });
            }
        };
        mqttService.getNotifyMessage(syncGlobalNotifyStore);
    }, []);

    return (
        <div className={style.newMessageAlert}>
            <AnimatePresence>
                {isNewMessageVisible ? (
                    <motion.div
                        animate={{ x: 0, opacity: 1 }}
                        className={style.newMessageBox}
                        exit={{ x: '100vw', opacity: 0 }}
                        initial={{ x: '100vw', opacity: 0 }}
                        style={{ position: 'relative', zIndex: 1 }}
                        transition={{ ease: 'easeOut', duration: 0.3 }}
                    >
                        <Badge badgeContent={0} color="primary">
                            <Image alt="football" src={MessageInfo} width={21} />
                        </Badge>
                        <p className={style.message}>
                            來自&nbsp;<span>{newMessageNotify.sender}</span>&nbsp;的新訊息
                        </p>
                        <Link className={style.goSingle} href="/notice/chat">
                            查看
                        </Link>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

export default NewMessageAlert;

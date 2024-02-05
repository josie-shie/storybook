'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { mqttService } from 'lib';
import { Badge } from '@mui/material';
import { motion } from 'framer-motion';
import type { NotifyMessage } from 'lib';
import Link from 'next/link';
import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import style from './newMessageAlert.module.scss';
import MessageInfo from './img/messageInfo.png';

function NewMessageAlert() {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const firstTimeRef = useRef(true);
    const newMessageNotify = useMessageStore.use.newMessageNotify();
    const isNewMessageVisible = useMessageStore.use.isNewMessageVisible();
    const unreadMessageNotify = useMessageStore.use.unreadMessageNotify();

    useEffect(() => {
        const updateNewMessageNotify = useMessageStore.getState().updateNewMessageNotify;
        const updateUnreadMessageNotify = useMessageStore.getState().updateUnreadMessageNotify;
        const setIsNewMessageVisible = useMessageStore.getState().setIsNewMessageVisible;
        const userUid = useUserStore.getState().userInfo.uid;
        if (!firstTimeRef.current) return;
        firstTimeRef.current = false;
        const syncGlobalNotifyStore = (notify: NotifyMessage) => {
            if (notify.notifyType === 2) {
                const pathname = window.location.pathname;
                timerRef.current && clearTimeout(timerRef.current);
                updateNewMessageNotify({
                    uid: notify.uid,
                    ...notify.newMessageNotify
                });
                if (pathname === '/notice' || pathname === '/notice/chat') return;
                setIsNewMessageVisible(true);
                timerRef.current = setTimeout(() => {
                    setIsNewMessageVisible(false);
                }, 2000);
            }
            if (notify.notifyType === 1 && notify.uid === `${userUid}`) {
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
            {isNewMessageVisible ? (
                <motion.div
                    animate={{ x: 0, opacity: 1 }}
                    className={style.newMessageBox}
                    exit={{ x: '100vw', opacity: 0 }}
                    initial={{ x: '100vw', opacity: 0 }}
                    style={{ position: 'relative', zIndex: 1 }}
                    transition={{ ease: 'easeOut', duration: 0.3 }}
                >
                    <Badge badgeContent={unreadMessageNotify.totalCount} color="primary">
                        <Image alt="football" src={MessageInfo} width={21} />
                    </Badge>
                    <div className={style.message}>
                        <div>來自 &nbsp;</div>
                        <div className={style.content}>{newMessageNotify.sender}</div>
                        <div> &nbsp; 的新訊息</div>
                    </div>
                    <Link className={style.goSingle} href="/notice/chat">
                        查看
                    </Link>
                </motion.div>
            ) : null}
        </div>
    );
}

export default NewMessageAlert;

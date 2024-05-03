'use client';
import { useEffect, useRef, useState } from 'react';
import { mqttService } from 'lib';
import { motion } from 'framer-motion';
import type { NotifyMessage } from 'lib';
import Link from 'next/link';
import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import style from './newMessageAlert.module.scss';
import Bill from './img/bill.svg';

function MessageAlert() {
    const newMessageNotify = useMessageStore.use.newMessageNotify();
    const unreadMessageNotify = useMessageStore.use.unreadMessageNotify();

    return (
        <Link className={style.newMessageBox} href="/notice/chat">
            <div className={style.message}>
                <div>来自</div>
                <div className={style.bold}> {newMessageNotify.sender}</div>
                <div className={style.content}> 的 {unreadMessageNotify.totalCount} 讯息</div>
            </div>
            <p className={style.goSingle}>查看</p>
        </Link>
    );
}
function TradeAlert() {
    return (
        <Link className={style.newMessageBox} href="/userInfo/tradeDetail">
            <div className={style.message}>
                <Bill />
                <div>您有新的交易明细</div>
            </div>
            <p className={style.goSingle}>查看</p>
        </Link>
    );
}

function NewMessageAlert() {
    const [notifyType, setNotifyType] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const firstTimeRef = useRef(true);
    const isNewMessageVisible = useMessageStore.use.isNewMessageVisible();

    const getAlertComponent = () => {
        return notifyType === 2 ? <MessageAlert /> : <TradeAlert />;
    };

    useEffect(() => {
        const updateNewMessageNotify = useMessageStore.getState().updateNewMessageNotify;
        const updateUnreadMessageNotify = useMessageStore.getState().updateUnreadMessageNotify;
        const setIsNewMessageVisible = useMessageStore.getState().setIsNewMessageVisible;
        const getNewMailMessage = useMessageStore.getState().getNewMailMessage;
        const getNewChatMessage = useMessageStore.getState().getNewChatMessage;
        const userUid = useUserStore.getState().userInfo.uid;
        if (!firstTimeRef.current) return;
        firstTimeRef.current = false;
        const syncGlobalNotifyStore = (notify: NotifyMessage) => {
            if (notify.notifyType === 1 && notify.uid === `${userUid}`) {
                updateUnreadMessageNotify({
                    uid: notify.uid,
                    ...notify.unreadMessageNotify
                });
            }
            if (notify.notifyType === 2) {
                setNotifyType(notify.notifyType);
                const pathname = window.location.pathname;
                timerRef.current && clearTimeout(timerRef.current);
                updateNewMessageNotify({
                    uid: notify.uid,
                    ...notify.newMessageNotify
                });
                if (pathname === '/notice' || pathname === '/notice/chat') return;
                setIsNewMessageVisible(true);
                getNewChatMessage();
                timerRef.current = setTimeout(() => {
                    setIsNewMessageVisible(false);
                }, 2000);
            }
            if (notify.notifyType === 3) {
                getNewMailMessage();
            }
            if (notify.notifyType === 4) {
                setNotifyType(notify.notifyType);
                getNewMailMessage();
                timerRef.current && clearTimeout(timerRef.current);
                setIsNewMessageVisible(true);
                timerRef.current = setTimeout(() => {
                    setIsNewMessageVisible(false);
                }, 2000);
            }
        };
        mqttService.getNotifyMessage(syncGlobalNotifyStore);
    }, []);

    return (
        <div className={style.newMessageAlert}>
            {isNewMessageVisible ? (
                <motion.div
                    animate={{ transform: 'translateX(0)', opacity: 1 }}
                    exit={{ transform: 'translateX(100%)', opacity: 0 }}
                    initial={{ transform: 'translateX(100%)', opacity: 0 }}
                    style={{ position: 'fixed', top: '74px', zIndex: 10001 }}
                    transition={{ ease: 'easeOut', duration: 0.3 }}
                >
                    {getAlertComponent()}
                </motion.div>
            ) : null}
        </div>
    );
}

export default NewMessageAlert;

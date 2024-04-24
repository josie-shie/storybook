'use client';

import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { deleteMailMember } from 'data-center';
import { usePathname } from 'next/navigation';
import type { MessageResponse } from 'lib';
import { messageService, getMessageResponse, cancelMessage } from 'lib';
import { useNotificationStore } from '@/store/notificationStore';
import { useMessageStore } from '@/store/messageStore';
import style from './editBar.module.scss';
import { useNoticeStore } from './noticeStore';

function EditBar() {
    const mailList = useNoticeStore.use.mailList();
    const setMailList = useNoticeStore.use.setMailList();
    const editStatus = useNoticeStore.use.editStatus();
    const setEditStatus = useNoticeStore.use.setEditStatus();
    const selected = useNoticeStore.use.selected();
    const setSelected = useNoticeStore.use.setSelected();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const setChatList = useNoticeStore.use.setChatList();
    const updateUnreadMessageNotify = useMessageStore.use.updateUnreadMessageNotify();

    const route = usePathname().split('/');
    const pathName = route[route.length - 1];

    const handleDeleteMail = async () => {
        if (selected.size === 0) return;

        if (pathName === 'notice') {
            const params = { mailMemberIds: Array.from(selected) };
            const res = await deleteMailMember(params as { mailMemberIds: number[] });
            if (res.success) {
                setIsVisible('刪除成功！', 'success');
                setEditStatus(false);
                const newList = mailList.filter(notice => !selected.has(notice.notifyId));
                const unreadMessageNotify = useMessageStore.getState().unreadMessageNotify;

                const unReadCount = newList.reduce((previousValue, currentValue) => {
                    if (currentValue.readAt === 0) {
                        return previousValue + 1;
                    }
                    return previousValue;
                }, 0);

                updateUnreadMessageNotify({
                    ...unreadMessageNotify,
                    totalCount: unreadMessageNotify.mailCount + unReadCount,
                    mailCount: unReadCount
                });
                setMailList(newList);
            }
        } else {
            void messageService.send({
                action: 'delete_private_room',
                roomIds: Array.from(selected) as string[]
            });
        }
    };

    const handleSelectAll = () => {
        if (pathName === 'notice') {
            setSelected(0, 'allMail');
        } else {
            setSelected(0, 'allChat');
        }
    };

    const handleCounterSelect = () => {
        if (pathName === 'notice') {
            setSelected(0, 'counterMail');
        } else {
            setSelected(0, 'counterChat');
        }
    };

    useEffect(() => {
        const handleRes = (res: MessageResponse) => {
            if (res.action === 'delete_private_room') {
                if (res.status === 'success') {
                    setEditStatus(false);
                    const currentChatList = useNoticeStore.getState().chatList;
                    const currentSelected = useNoticeStore.getState().selected;
                    const unreadMessageNotify = useMessageStore.getState().unreadMessageNotify;
                    const filterChatList = currentChatList.filter(
                        chat => !currentSelected.has(chat.roomId)
                    );
                    const unReadCount = filterChatList.reduce((previousValue, currentValue) => {
                        if (currentValue.lastMessages.length > 0) {
                            return previousValue + 1;
                        }
                        return previousValue;
                    }, 0);

                    updateUnreadMessageNotify({
                        ...unreadMessageNotify,
                        totalCount: unreadMessageNotify.chatCount + unReadCount,
                        chatCount: unReadCount
                    });
                    setChatList(filterChatList);
                }
            }
        };

        getMessageResponse(handleRes);

        return () => {
            cancelMessage(handleRes);
        };
    }, [setChatList, setEditStatus, updateUnreadMessageNotify]);

    return (
        <div className={`${style.editBar} ${editStatus && style.isEdit}`}>
            <div className={style.group}>
                <Button onClick={handleSelectAll} size="small" variant="outlined">
                    全选
                </Button>
                <Button onClick={handleCounterSelect} size="small" variant="outlined">
                    反选
                </Button>
            </div>

            <p className={style.selection}>
                已选<span>{selected.size}</span>則
            </p>
            <div className={style.deleteBox}>
                <Button
                    className={style.delete}
                    onClick={handleDeleteMail}
                    size="small"
                    variant="contained"
                >
                    刪除
                </Button>
            </div>
        </div>
    );
}

export default EditBar;

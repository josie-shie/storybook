'use client';

import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { deleteMailMember } from 'data-center';
import { usePathname } from 'next/navigation';
import type { MessageResponse } from 'lib';
import { messageService, getMessageResponse, cancelMessage } from 'lib';
import style from './editBar.module.scss';
import { useNoticeStore } from './noticeStore';
import { useNotificationStore } from '@/app/notificationStore';

function EditBar() {
    const mailList = useNoticeStore.use.mailList();
    const setMailList = useNoticeStore.use.setMailList();
    const editStatus = useNoticeStore.use.editStatus();
    const setEditStatus = useNoticeStore.use.setEditStatus();
    const selected = useNoticeStore.use.selected();
    const setSelected = useNoticeStore.use.setSelected();
    const setIsVisible = useNotificationStore.use.setIsVisible();
    const chatList = useNoticeStore.use.chatList();
    const setChatList = useNoticeStore.use.setChatList();

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
                const newList = mailList.filter(notice => !selected.has(notice.mailMemberId));
                setMailList(newList);
            }
        } else {
            void messageService.send({
                action: 'delete_private_room',
                roomIds: Array.from(selected) as string[]
            });
        }
    };

    useEffect(() => {
        const handleRes = (res: MessageResponse) => {
            if (res.action === 'delete_private_room') {
                if (res.status === 'success') {
                    setEditStatus(false);
                    const params = chatList.filter(chat => !selected.has(chat.roomId));
                    setChatList(params);
                }
            }
        };

        getMessageResponse(handleRes);

        return () => {
            cancelMessage(handleRes);
        };
    }, [chatList, selected, setChatList, setEditStatus]);

    return (
        <div className={`${style.editBar} ${editStatus && style.isEdit}`}>
            <div className={style.group}>
                <Button
                    onClick={() => {
                        setSelected(0, 'clear');
                    }}
                    size="small"
                    variant="outlined"
                >
                    反選
                </Button>
                <Button
                    onClick={() => {
                        setSelected(0, 'allMail');
                    }}
                    size="small"
                    variant="outlined"
                >
                    全選
                </Button>
            </div>

            <p className={style.selection}>
                已選<span>{selected.size}</span>則
            </p>
            <div className={style.deleteBox}>
                <Button
                    className={style.delete}
                    onClick={() => {
                        void handleDeleteMail();
                    }}
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

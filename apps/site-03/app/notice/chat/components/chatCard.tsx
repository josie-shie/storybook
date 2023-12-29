'use client';

import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Badge from '@mui/material/Badge';
import type { MessageRoomType } from 'lib';
import { timestampToString } from 'lib';
import { useNoticeStore } from '@/app/notice/noticeStore';
import Avatar from '@/components/avatar/avatar';
import { useMessageStore } from '@/app/messageStore';
import AvatarIcon from '../img/mentorIcon.jpg';
import style from './chatCard.module.scss';

function ChatCard({ chatData }: { chatData: MessageRoomType }) {
    const editStatus = useNoticeStore.use.editStatus();
    const selected = useNoticeStore.use.selected();
    const setSelected = useNoticeStore.use.setSelected();
    const setSelectedChatData = useNoticeStore.use.setSelectedChatData();
    const readChatMessage = useMessageStore.use.readChatMessage();

    const roomUserId = chatData.roomId.split('-');

    const handleChatInfo = () => {
        setSelectedChatData(chatData);
        if (!chatData.messageIsRead) {
            readChatMessage();
        }
    };

    const handleChange = () => {
        if (selected.has(chatData.roomId)) {
            setSelected(chatData.roomId, 'delete');
        } else {
            setSelected(chatData.roomId, 'add');
        }
    };

    const handleLastMessage = () => {
        const lastMessages = chatData.lastMessages[0];
        if (lastMessages.content) {
            return lastMessages.content;
        }
        return lastMessages.user.uid === roomUserId[0]
            ? '贴图已传送'
            : `${lastMessages.user.name}传送了贴图`;
    };

    return (
        <li className={`${style.chatCard}  ${editStatus && style.isEdit}`}>
            <Checkbox
                checked={selected.has(chatData.roomId)}
                checkedIcon={<CheckCircleOutlineIcon />}
                className={style.check}
                icon={<RadioButtonUncheckedIcon />}
                onChange={handleChange}
            />
            <div className={style.card}>
                <Badge
                    className={style.avatar}
                    color="error"
                    invisible={chatData.messageIsRead}
                    variant="dot"
                >
                    <Avatar
                        borderColor="#FFFFFF"
                        size={40}
                        src={chatData.user.avatar || AvatarIcon.src}
                    />
                </Badge>
                <div className={style.right} onClick={handleChatInfo}>
                    <div className={style.topBar}>
                        <div className={style.name}>{chatData.user.name || 'unknown name'}</div>
                        <p className={style.date}>
                            {timestampToString(Number(chatData.date), 'YYYY-M-DD HH:mm')}
                        </p>
                    </div>
                    <div className={style.bottomBar}>
                        <p className={style.content}>{handleLastMessage()}</p>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default ChatCard;

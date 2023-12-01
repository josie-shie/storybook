'use client';

import { useNoticeStore } from '../noticeStore';
import style from '../notice.module.scss';
import ChatCard from './components/chatCard';

function ChatList() {
    const editStatus = useNoticeStore.use.editStatus();
    return (
        <ul className={`${style.noticeList} ${editStatus && style.isEdit}`}>
            <ChatCard />
        </ul>
    );
}

export default ChatList;

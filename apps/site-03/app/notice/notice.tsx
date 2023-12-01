'use client';
import { useEffect } from 'react';
import { getMailMemberList } from 'data-center';
import MailCard from './components/mailCard';
import style from './notice.module.scss';
import { useNoticeStore } from './noticeStore';
import MailInfo from './components/mailInfo';

function MailList() {
    const editStatus = useNoticeStore.use.editStatus();
    const setNoticeData = useNoticeStore.use.setNoticeData();
    const noticeData = useNoticeStore.use.noticeData();

    useEffect(() => {
        const getMailList = async () => {
            const res = await getMailMemberList();
            if (!res.success) {
                console.error(res.error);
                return;
            }
            setNoticeData(res.data);
        };

        void getMailList();
    }, []);

    return (
        <ul className={`${style.noticeList} ${editStatus && style.isEdit}`}>
            {noticeData.map(notice => (
                <MailCard key={notice.mailMemberId} notice={notice} />
            ))}
        </ul>
    );
}

function Notice() {
    return (
        <>
            <MailList />
            <MailInfo />
        </>
    );
}

export default Notice;

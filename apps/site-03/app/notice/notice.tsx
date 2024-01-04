'use client';
import { useEffect, useRef } from 'react';
import { getMailMemberList } from 'data-center';
import NoData from '@/components/baseNoData/noData';
import MailCard from './components/mailCard';
import style from './notice.module.scss';
import { useNoticeStore } from './noticeStore';
import MailInfo from './components/mailInfo';

function MailList() {
    const editStatus = useNoticeStore.use.editStatus();
    const mailList = useNoticeStore.use.mailList();
    const fetchTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const setMailList = useNoticeStore.getState().setMailList;
        const getMailList = async () => {
            const res = await getMailMemberList();
            if (!res.success) {
                console.error(res.error);
                return;
            }
            setMailList(res.data);
            fetchTimerRef.current = setTimeout(getMailList, 30000);
        };

        void getMailList();

        return () => {
            if (fetchTimerRef.current) {
                clearTimeout(fetchTimerRef.current);
            }
        };
    }, []);

    if (mailList.length === 0) {
        return <NoData />;
    }

    return (
        <ul className={`${style.noticeList} ${editStatus ? style.isEdit : ''}`}>
            {mailList.map(mail => (
                <MailCard key={mail.mailMemberId} mailData={mail} />
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

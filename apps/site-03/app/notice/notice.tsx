'use client';
import { useEffect } from 'react';
import { getMailMemberList } from 'data-center';
import MailCard from './components/mailCard';
import style from './notice.module.scss';
import { useNoticeStore } from './noticeStore';
import MailInfo from './components/mailInfo';

function MailList() {
    const editStatus = useNoticeStore.use.editStatus();
    const setMailList = useNoticeStore.use.setMailList();
    const mailList = useNoticeStore.use.mailList();

    useEffect(() => {
        const getMailList = async () => {
            const res = await getMailMemberList();
            if (!res.success) {
                console.error(res.error);
                return;
            }
            setMailList(res.data);
        };

        void getMailList();
    }, []);

    return (
        <ul className={`${style.noticeList} ${editStatus && style.isEdit}`}>
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

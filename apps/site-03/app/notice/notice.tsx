'use client';
import { useEffect } from 'react';
import { getMailMemberList } from 'data-center';
import { mqttService } from 'lib';
import type { NotifyMessage } from 'lib';
import NoData from '@/components/baseNoData/noData';
import MailCard from './components/mailCard';
import style from './notice.module.scss';
import { useNoticeStore } from './noticeStore';
import MailInfo from './components/mailInfo';

function MailList() {
    const editStatus = useNoticeStore.use.editStatus();
    const mailList = useNoticeStore.use.mailList();

    useEffect(() => {
        const setMailList = useNoticeStore.getState().setMailList;
        const getMailList = async (notify?: NotifyMessage) => {
            if (notify?.notifyType === 3) {
                const res = await getMailMemberList();
                if (!res.success) {
                    console.error(res.error);
                    return;
                }
                setMailList(res.data);
            }
        };

        void getMailList();
        mqttService.getNotifyMessage(getMailList);
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

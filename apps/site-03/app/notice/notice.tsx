'use client';
import { useEffect, useState } from 'react';
import { getMailMemberList } from 'data-center';
import { mqttService } from 'lib';
import type { NotifyMessage } from 'lib';
import ButtonBase from '@mui/material/ButtonBase';
import NoData from '@/components/baseNoData/noData';
import MailCard from './components/mailCard';
import style from './notice.module.scss';
import { useNoticeStore } from './noticeStore';
import MailInfo from './components/mailInfo';
import SkeletonLayout from './components/skeleton/skeleton';

function MailList() {
    const editStatus = useNoticeStore.use.editStatus();
    const mailList = useNoticeStore.use.mailList();
    const [isNoData, setIsNoData] = useState<boolean | null>(null);

    useEffect(() => {
        const setMailList = useNoticeStore.getState().setMailList;
        const getMailList = async () => {
            const res = await getMailMemberList();
            if (!res.success) {
                console.error(res.error);
                return;
            }
            setMailList(res.data);
            setIsNoData(res.data.length === 0);
        };

        const refetchMailList = async (notify?: NotifyMessage) => {
            if (notify?.notifyType === 3) {
                await getMailList();
            }
        };

        void getMailList();
        mqttService.getNotifyMessage(refetchMailList);
    }, []);

    const tagNames = Array.from(
        new Set(mailList.filter(mail => mail.tag.tagName).map(mail => mail.tag.tagName))
    );

    tagNames.unshift('全部');

    const [activeTagName, setActiveTagName] = useState(tagNames[0]);
    const [filteredMailList, setFilteredMailList] = useState(mailList);

    useEffect(() => {
        if (activeTagName === '全部') {
            setFilteredMailList(mailList);
        } else {
            setFilteredMailList(mailList.filter(mail => mail.tag.tagName === activeTagName));
        }
    }, [activeTagName, mailList]);

    const handleTagClick = (tagName: string) => {
        setActiveTagName(tagName);
    };

    return (
        <>
            {tagNames.length ? (
                <div className={style.typeList}>
                    {tagNames.map(tagName => (
                        <ButtonBase
                            className={`${style.tag} ${
                                tagName === activeTagName ? style.active : ''
                            }`}
                            key={tagName}
                            onClick={() => {
                                handleTagClick(tagName);
                            }}
                            type="button"
                        >
                            {tagName}
                        </ButtonBase>
                    ))}
                </div>
            ) : null}

            {isNoData === null && <SkeletonLayout />}

            {filteredMailList.length === 0 && isNoData ? (
                <NoData text="暂无资料" />
            ) : (
                <ul className={`${style.noticeList} ${editStatus ? style.isEdit : ''}`}>
                    {filteredMailList.map(mail => (
                        <MailCard key={mail.mailMemberId} mailData={mail} />
                    ))}
                </ul>
            )}
        </>
    );
}

function Notice() {
    return (
        <>
            <MailList />
            <MailInfo />
            <div className={style.homeIndicatorPlaceHolder} />
        </>
    );
}

export default Notice;

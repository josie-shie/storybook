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

function MailList() {
    const editStatus = useNoticeStore.use.editStatus();
    const mailList = useNoticeStore.use.mailList();

    useEffect(() => {
        const setMailList = useNoticeStore.getState().setMailList;
        const getMailList = async () => {
            const res = await getMailMemberList();
            if (!res.success) {
                console.error(res.error);
                return;
            }
            //假資料先保留等api整後刪除
            // const list = [
            //     {
            //       "mailMemberId": 5636,
            //       "title": "TEstesetest",
            //       "content": "tetsetsetsetestsetsetsetset",
            //       "coverImage": "https://twtest8.s3.ap-northeast-1.amazonaws.com/4f8ce81a7331ade7dfb814df7ee7138b87581f2b881418fda7042ef777c33114.jpg",
            //       "contentImage": "https://twtest8.s3.ap-northeast-1.amazonaws.com/4f8ce81a7331ade7dfb814df7ee7138b87581f2b881418fda7042ef777c33114.jpg",
            //       "ctaButtonName": "現在去看",
            //       "ctaLink": "www.google.com",
            //       "isRead": true,
            //       "createdAt": 0,
            //       "tag": {
            //         "id": 0,
            //         "tagName": "系統通知",
            //         "colorCode": "#4489ff"
            //       }
            //     },
            //     {
            //       "mailMemberId": 6597,
            //       "title": "TEstesetest",
            //       "content": "tetsetsetsetestsetsetsetset",
            //       "coverImage": "",
            //       "contentImage": "",
            //       "ctaButtonName": "",
            //       "ctaLink": "",
            //       "isRead": true,
            //       "createdAt": 0,
            //       "tag": {
            //         "id": 1,
            //         "tagName": "交易明細",
            //         "colorCode": "#00b976"
            //       }
            //     },
            //     {
            //       "mailMemberId": 6907,
            //       "title": "TEstesetest",
            //       "content": "tetsetsetsetestsetsetsetset",
            //       "coverImage": "https://twtest8.s3.ap-northeast-1.amazonaws.com/4f8ce81a7331ade7dfb814df7ee7138b87581f2b881418fda7042ef777c33114.jpg",
            //       "contentImage": "https://twtest8.s3.ap-northeast-1.amazonaws.com/4f8ce81a7331ade7dfb814df7ee7138b87581f2b881418fda7042ef777c33114.jpg",
            //       "ctaButtonName": "現在去看",
            //       "ctaLink": "www.google.com",
            //       "isRead": true,
            //       "createdAt": 0,
            //       "tag": {
            //         "id": 2,
            //         "tagName": "最新活動",
            //         "colorCode": "#f2d122"
            //       }
            //     }
            // ]
            setMailList(res.data);
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

    if (mailList.length === 0) {
        return <NoData text="暂无资料" />;
    }

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

            <ul className={`${style.noticeList} ${editStatus ? style.isEdit : ''}`}>
                {filteredMailList.map(mail => (
                    <MailCard key={mail.mailMemberId} mailData={mail} />
                ))}
            </ul>
        </>
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

'use client';

import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { getMailMember } from 'data-center';
import { timestampToString } from 'lib';
import type { GetMailMemberResponse } from 'data-center';
import { useNoticeStore } from '../noticeStore';
import style from './mailCard.module.scss';

function MailCard({ mailData }: { mailData: GetMailMemberResponse }) {
    const editStatus = useNoticeStore.use.editStatus();
    const setSelectedMailData = useNoticeStore.use.setSelectedMailData();
    const selected = useNoticeStore.use.selected();
    const setSelected = useNoticeStore.use.setSelected();
    const [isRead, setIsRead] = useState(mailData.isRead);

    const handleMailInfo = () => {
        setSelectedMailData(mailData);
        if (!mailData.isRead) {
            void readMail();
        }
    };

    const readMail = async () => {
        const res = await getMailMember({ mailMemberId: mailData.mailMemberId });
        if (!res.success) {
            console.error(res.error);
        }
        setIsRead(true);
    };

    const handleChange = () => {
        if (selected.has(mailData.mailMemberId)) {
            setSelected(mailData.mailMemberId, 'delete');
        } else {
            setSelected(mailData.mailMemberId, 'add');
        }
    };

    return (
        <li
            className={`${style.mailCard}  ${editStatus && style.isEdit} ${isRead && style.isRead}`}
        >
            <Checkbox
                checked={selected.has(mailData.mailMemberId)}
                checkedIcon={<CheckCircleOutlineIcon />}
                className={style.check}
                icon={<RadioButtonUncheckedIcon />}
                onChange={handleChange}
            />
            <div
                className={style.card}
                onClick={() => {
                    handleMailInfo();
                }}
            >
                <div className={style.topBar}>
                    <div className={style.tag}>站內信</div>
                    <p className={style.date}>
                        {timestampToString(mailData.createdAt, 'YYYY-M-DD HH:mm')}
                    </p>
                </div>
                <h6 className={style.title}>{mailData.title}</h6>
                <div className={style.bottomBar}>
                    <p className={style.content}>{mailData.content}</p>
                </div>
            </div>
        </li>
    );
}

export default MailCard;

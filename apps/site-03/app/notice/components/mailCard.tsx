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

function MailCard({ notice }: { notice: GetMailMemberResponse }) {
    const editStatus = useNoticeStore.use.editStatus();
    const setMailData = useNoticeStore.use.setMailData();
    const selected = useNoticeStore.use.selected();
    const setSelected = useNoticeStore.use.setSelected();
    const [isRead, setIsRead] = useState(notice.isRead);

    const handleMailInfo = () => {
        setMailData(notice);
        if (!notice.isRead) {
            void readMail();
        }
    };

    const readMail = async () => {
        const res = await getMailMember({ mailMemberId: notice.mailMemberId });
        if (!res.success) {
            console.error(res.error);
        }
        setIsRead(true);
    };

    const handleChange = () => {
        if (selected.has(notice.mailMemberId)) {
            setSelected(notice.mailMemberId, 'delete');
        } else {
            setSelected(notice.mailMemberId, 'add');
        }
    };

    return (
        <li
            className={`${style.mailCard}  ${editStatus && style.isEdit} ${isRead && style.isRead}`}
        >
            <Checkbox
                checked={selected.has(notice.mailMemberId)}
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
                    <p className={style.date}>{timestampToString(notice.createdAt, 'YYYY-M-DD')}</p>
                </div>
                <h6 className={style.title}>{notice.title}</h6>
                <div className={style.bottomBar}>
                    <p className={style.content}>{notice.content}</p>
                </div>
            </div>
        </li>
    );
}

export default MailCard;

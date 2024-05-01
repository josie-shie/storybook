'use client';
import Image from 'next/image';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { updateMailReadAt } from 'data-center';
import { timestampToString } from 'lib';
import type { GetMailMemberResponse } from 'data-center';
import { useMessageStore } from '@/store/messageStore';
import { useNoticeStore } from '../noticeStore';
import style from './mailCard.module.scss';

function MailCard({ mailData }: { mailData: GetMailMemberResponse }) {
    const editStatus = useNoticeStore.use.editStatus();
    const setSelectedMailData = useNoticeStore.use.setSelectedMailData();
    const setSelectMailTag = useNoticeStore.use.setSelectMailTag();
    const selected = useNoticeStore.use.selected();
    const setSelected = useNoticeStore.use.setSelected();
    const readMailMessage = useMessageStore.use.readMailMessage();
    const [isRead, setIsRead] = useState(mailData.readAt === 0);

    const handleMailInfo = () => {
        setSelectedMailData(mailData);
        setSelectMailTag(mailData.tag);
        if (!mailData.readAt) {
            void readMail();
            readMailMessage();
        }
    };
    const readMail = async () => {
        const res = await updateMailReadAt({ id: [mailData.mrlId] });
        if (!res.success) {
            console.error(res.error);
        }
        setIsRead(true);
    };

    const handleChange = () => {
        if (selected.has(mailData.notifyId)) {
            setSelected(mailData.notifyId, 'delete');
        } else {
            setSelected(mailData.notifyId, 'add');
        }
    };

    return (
        <li
            className={`${style.mailCard}  ${editStatus && style.isEdit} ${isRead && style.isRead}`}
        >
            <Checkbox
                checked={selected.has(mailData.notifyId)}
                checkedIcon={<CheckCircleOutlineIcon />}
                className={style.check}
                icon={<RadioButtonUncheckedIcon />}
                onChange={handleChange}
            />
            <div className={style.card} onClick={handleMailInfo}>
                <div className={style.topBar}>
                    <div className={style.tag} style={{ background: mailData.tag.tagColor }}>
                        {mailData.tag.tagName || '站內信'}
                    </div>
                    <p className={style.date}>
                        {timestampToString(mailData.notifyAt, 'YYYY-M-DD HH:mm')}
                    </p>
                </div>
                <h6 className={style.title}>{mailData.message.title}</h6>
                <div className={style.bottomBar}>
                    <p className={style.content}>{mailData.message.content}</p>
                </div>
                {mailData.message.coverImage ? (
                    <div className={style.coverImage}>
                        <Image
                            alt="cover"
                            height={180}
                            layout="responsive"
                            src={mailData.message.coverImage}
                            width={342}
                        />
                    </div>
                ) : null}
            </div>
        </li>
    );
}

export default MailCard;

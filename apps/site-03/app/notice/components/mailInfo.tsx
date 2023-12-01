'use client';

import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Image from 'next/image';
import { timestampToString } from 'lib';
import { useNoticeStore } from '../noticeStore';
import backLeftArrowImg from '../img/backLeftArrow.png';
import style from './mailInfo.module.scss';

function Header() {
    const resetMailData = useNoticeStore.use.resetMailData();

    return (
        <div className={style.headerDetail}>
            <div className={style.pageTitle}>
                <Image
                    alt=""
                    className={style.back}
                    height={24}
                    onClick={() => {
                        resetMailData();
                    }}
                    src={backLeftArrowImg}
                    width={24}
                />
                <div className={style.text}>消息內容</div>
            </div>
        </div>
    );
}

function MailInfo() {
    const [infoStatus, setInfoStatus] = useState(false);
    const mailData = useNoticeStore.use.mailData();

    useEffect(() => {
        if (mailData.mailMemberId) {
            setInfoStatus(true);
        } else {
            setInfoStatus(false);
        }
    }, [mailData]);

    return (
        <div className={style.mailInfo}>
            <Drawer
                anchor="right"
                onClose={() => {
                    setInfoStatus(false);
                }}
                open={infoStatus}
            >
                <Header />
                <div className={style.outer}>
                    <div className={style.box}>
                        <div className={style.date}>
                            {timestampToString(mailData.createdAt, 'YYYY-M-DD')}
                        </div>
                        <h2 className={style.title}>{mailData.title}</h2>
                        <p className={style.content}>{mailData.content}</p>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default MailInfo;

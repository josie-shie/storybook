'use client';

import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Image from 'next/image';
import { timestampToString } from 'lib';
import { useNoticeStore } from '../noticeStore';
import backLeftArrowImg from '../img/backLeftArrow.png';
import style from './mailInfo.module.scss';

function Header() {
    const resetSelectedMailData = useNoticeStore.use.resetSelectedMailData();

    return (
        <div className={style.headerDetail}>
            <div className={style.pageTitle}>
                <Image
                    alt=""
                    className={style.back}
                    height={24}
                    onClick={() => {
                        resetSelectedMailData();
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
    const selectedMailData = useNoticeStore.use.selectedMailData();

    useEffect(() => {
        if (selectedMailData.mailMemberId) {
            setInfoStatus(true);
        } else {
            setInfoStatus(false);
        }
    }, [selectedMailData]);

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
                            {timestampToString(selectedMailData.createdAt, 'YYYY-M-DD')}
                        </div>
                        <h2 className={style.title}>{selectedMailData.title}</h2>
                        <p className={style.content}>{selectedMailData.content}</p>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default MailInfo;

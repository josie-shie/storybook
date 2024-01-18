'use client';

import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Image from 'next/image';
import Link from 'next/link';
import { timestampToString } from 'lib';
import { useNoticeStore } from '../noticeStore';
import backLeftArrowImg from '../img/backLeftArrow.png';
import style from './mailInfo.module.scss';

function Header({ tagName }: { tagName: string }) {
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
                <div className={style.text}>{tagName || '消息内容'}</div>
            </div>
        </div>
    );
}

function MailInfo() {
    const [infoStatus, setInfoStatus] = useState(false);
    const selectedMailData = useNoticeStore.use.selectedMailData();
    const selectMailTag = useNoticeStore.use.selectMailTag();

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
                <Header tagName={selectMailTag.tagName} />
                <div className={style.outer}>
                    <div className={style.box}>
                        <div className={style.rows}>
                            <div className={style.date}>
                                {timestampToString(selectedMailData.createdAt, 'YYYY-MM-DD HH:MM')}
                            </div>
                            <div
                                className={style.tag}
                                style={{ background: selectMailTag.colorCode }}
                            >
                                {selectMailTag.tagName || '站內信'}
                            </div>
                        </div>

                        <h2 className={style.title}>{selectedMailData.title}</h2>
                        {selectedMailData.contentImage ? (
                            <div className={style.contentImage}>
                                <Image
                                    alt="cover"
                                    height={180}
                                    src={selectedMailData.contentImage}
                                    width={342}
                                />
                            </div>
                        ) : null}
                        <p className={style.content}>{selectedMailData.content}</p>
                        {selectedMailData.ctaButtonName ? (
                            <Link
                                className={style.ctaButton}
                                href={`https://${selectedMailData.ctaLink}`}
                            >
                                {selectedMailData.ctaButtonName}
                            </Link>
                        ) : null}
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default MailInfo;

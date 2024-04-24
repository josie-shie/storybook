'use client';

import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Image from 'next/image';
import Link from 'next/link';
import { timestampToString } from 'lib';
import { updateMailReadAt } from 'data-center';
import { useNoticeStore } from '../noticeStore';
import backLeftArrowImg from '../img/backLeftArrow.png';
import edit from '../img/edit.png';
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

    const readMail = async () => {
        if (selectedMailData.mrlId) {
            const res = await updateMailReadAt({ id: [selectedMailData.mrlId] });
            if (!res.success) {
                return new Error();
            }
        }
    };

    useEffect(() => {
        if (selectedMailData.notifyId) {
            setInfoStatus(true);
            void readMail();
        } else {
            setInfoStatus(false);
        }
    }, [selectedMailData]);

    if (Object.keys(selectedMailData).length === 0) {
        return null;
    }
    const showCta = selectedMailData.cta.label || selectedMailData.cta.url;

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
                                {timestampToString(selectedMailData.notifyAt, 'YYYY-MM-DD HH:MM')}
                            </div>
                            <div
                                className={style.tag}
                                style={{ background: selectMailTag.tagColor }}
                            >
                                {selectMailTag.tagName || '站內信'}
                            </div>
                        </div>

                        <h2 className={style.title}>{selectedMailData.message.title}</h2>

                        {selectMailTag.tagName !== '交易明細' && (
                            <>
                                {selectedMailData.message.senderAvatar &&
                                selectedMailData.message.senderName ? (
                                    <div className={style.editUser}>
                                        <span className={style.avatar}>
                                            <Image
                                                alt="edit"
                                                height={30}
                                                src={
                                                    selectedMailData.message.senderAvatar ||
                                                    edit.src
                                                }
                                                width={30}
                                            />
                                        </span>
                                        <span className={style.name}>
                                            {selectedMailData.message.senderName}
                                        </span>
                                    </div>
                                ) : null}
                            </>
                        )}
                        {selectedMailData.message.contentImage ? (
                            <div className={style.contentImage}>
                                <Image
                                    alt="cover"
                                    height={180}
                                    layout="responsive"
                                    src={selectedMailData.message.contentImage}
                                    width={342}
                                />
                            </div>
                        ) : null}
                        <p className={style.content}>{selectedMailData.message.content}</p>
                        {selectMailTag.tagName === '交易明細' ? (
                            <div className={style.detailButton}>
                                <Link href="/userInfo/tradeDetail">查看交易明細</Link>
                            </div>
                        ) : null}
                        {showCta ? (
                            <Link
                                className={style.ctaButton}
                                href={`https://${selectedMailData.cta.url}`}
                            >
                                {selectedMailData.cta.label}
                            </Link>
                        ) : null}
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default MailInfo;

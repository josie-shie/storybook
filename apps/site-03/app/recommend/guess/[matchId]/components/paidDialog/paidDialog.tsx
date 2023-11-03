'use client';
import React from 'react';
import { Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import Image from 'next/image';
import Star from '../../img/star.png';
import style from './paidDialog.module.scss';

interface PaidDialogProps {
    plan?: boolean;
    amount?: number;
    balance?: number;
    openPaid?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PaidDialog({
    plan = true,
    amount,
    balance,
    openPaid = false,
    onClose,
    onConfirm
}: PaidDialogProps) {
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    return (
        <Dialog
            PaperProps={{
                style: {
                    backgroundColor: '#fff',
                    borderRadius: '15px',
                    boxShadow: 'none'
                }
            }}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            open={openPaid}
        >
            <div className={style.paidDialog}>
                {plan ? (
                    <>
                        <div className={style.content}>
                            <div className={style.price}>
                                <span className={style.text}>支付</span>
                                <span className={style.number}>
                                    <Image alt="" className={style.image} src={Star} width={14} />
                                    {amount}
                                </span>
                            </div>
                            <span className={style.text}>進行查看？</span>
                        </div>
                        <div className={style.balance}>我的餘額: {balance}金幣</div>
                    </>
                ) : (
                    <>
                        <div className={style.content}>
                            <div className={style.price}>
                                <span className={style.text}>支付</span>
                                <span className={style.number}>
                                    <Image alt="" className={style.image} src={Star} width={14} />
                                    {amount}
                                </span>
                            </div>
                            <span className={style.text}>付費包月訂閱?</span>
                        </div>
                        <div className={style.date}>
                            生效期間: {formatDate(today)}~{formatDate(nextMonth)}
                        </div>
                    </>
                )}
                <div className={style.footer}>
                    <div className={style.close} onClick={onClose}>
                        取消
                    </div>
                    <div className={style.confirm} onClick={onConfirm}>
                        確認
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default PaidDialog;

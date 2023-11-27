'use client';
import React from 'react';
import { Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import style from './guessDialog.module.scss';

interface GuessDialogProps {
    id?: number;
    play?: string;
    handicap?: string;
    teamName?: string;
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

function GuessDialog({
    play,
    handicap,
    teamName,
    openPaid = false,
    onClose,
    onConfirm
}: GuessDialogProps) {
    // const formatDate = (date: Date): string => {
    //     const year = date.getFullYear();
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //     const day = date.getDate().toString().padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // };

    // const today = new Date();
    // const nextMonth = new Date();
    // nextMonth.setMonth(today.getMonth() + 1);

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
            <div className={style.guessDialog}>
                <div className={style.game}>
                    <span>{play}</span>
                    <span>{teamName}</span>
                    <span>受{handicap}</span>
                </div>
                <div className={style.useCount}>
                    今日还可以参与 <span>5</span> 次競猜
                </div>
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

export default GuessDialog;

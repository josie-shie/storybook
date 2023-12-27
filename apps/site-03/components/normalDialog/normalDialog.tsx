'use client';
import { forwardRef } from 'react';
import type { ReactElement } from 'react';
import { Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import style from './normalDialog.module.scss';

interface NormalDialogProps {
    content: ReactElement;
    openDialog: boolean;
    cancelText?: string;
    confirmText: string;
    onClose: () => void;
    onConfirm: () => void;
    srcImage?: StaticImageData;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function NormalDialog({
    content,
    openDialog,
    cancelText,
    confirmText,
    onClose,
    onConfirm,
    srcImage
}: NormalDialogProps) {
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
            open={openDialog}
        >
            <div className={style.normalDialog}>
                {srcImage ? <Image alt="wallet" src={srcImage} /> : null}
                <div className={style.content}>{content}</div>
                <div className={style.footer}>
                    {cancelText ? (
                        <div className={style.close} onClick={onClose}>
                            {cancelText}
                        </div>
                    ) : null}
                    {confirmText ? (
                        <div className={style.confirm} onClick={onConfirm}>
                            {confirmText}
                        </div>
                    ) : null}
                </div>
            </div>
        </Dialog>
    );
}

export default NormalDialog;

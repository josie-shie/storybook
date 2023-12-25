'use client';
import { forwardRef } from 'react';
import type { ReactElement } from 'react';
import { Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import style from './dialog.module.scss';

interface NormalDialogProps {
    content: ReactElement;
    openDialog: boolean;
    onClose: () => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ErrorDialog({ content, openDialog, onClose }: NormalDialogProps) {
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
                <div className={style.content}>{content}</div>
            </div>
        </Dialog>
    );
}

export default ErrorDialog;

'use client';
import { forwardRef } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import { Dialog, DialogProps } from '@mui/material';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import style from './dialog.module.scss';

interface NormalDialogProps {
    content: ReactElement;
    openDialog: boolean;
    onClose: () => void;
    customStyle?: CSSProperties;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ErrorDialog({ content, openDialog, onClose, customStyle }: NormalDialogProps) {
    const handleClose: DialogProps['onClose'] = (event, reason) => {
        if (reason === 'backdropClick') return;
        onClose();
    };

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
            onClose={handleClose}
            open={openDialog}
            disableEscapeKeyDown
        >
            <div className={style.normalDialog} style={customStyle}>
                <div className={style.content}>{content}</div>
            </div>
        </Dialog>
    );
}

export default ErrorDialog;

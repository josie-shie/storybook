import type { ReactNode } from 'react';
import { Alert } from '@mui/material';
import FadeTransition from './fadeTransition';
import style from './notification.module.scss';

interface PropsType {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    showIcon?: boolean;
    icon?: ReactNode;
    handleClose: () => void;
}

function Notification({
    message,
    type,
    showIcon = false,
    icon,
    isVisible,
    handleClose
}: PropsType) {
    return (
        <FadeTransition onClose={handleClose} show={isVisible}>
            {showIcon ? (
                <div className={style.iconTip}>
                    {icon}
                    {message}
                </div>
            ) : (
                <Alert severity={type}>{message}</Alert>
            )}
        </FadeTransition>
    );
}

export default Notification;

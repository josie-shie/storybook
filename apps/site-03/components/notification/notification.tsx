import { Alert } from '@mui/material';
import SlideTransition from './slideTransition';
import style from './notification.module.scss';

interface PropsType {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    handleClose: () => void;
}

function Notification({ message, type, isVisible, handleClose }: PropsType) {
    return (
        <div className={style.slideTransition__position}>
            <SlideTransition onClose={handleClose} show={isVisible}>
                <Alert severity={type}>{message}</Alert>
            </SlideTransition>
        </div>
    );
}

export default Notification;

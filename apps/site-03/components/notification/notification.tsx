import { Alert } from '@mui/material';
import SlideTransition from './slideTransition';

interface PropsType {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    handleClose: () => void;
}

function Notification({ message, type, isVisible, handleClose }: PropsType) {
    return (
        <SlideTransition onClose={handleClose} show={isVisible}>
            <Alert severity={type}>{message}</Alert>
        </SlideTransition>
    );
}

export default Notification;

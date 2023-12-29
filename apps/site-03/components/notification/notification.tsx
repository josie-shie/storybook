import { Alert } from '@mui/material';
import FadeTransition from './fadeTransition';

interface PropsType {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    handleClose: () => void;
}

function Notification({ message, type, isVisible, handleClose }: PropsType) {
    return (
        <FadeTransition onClose={handleClose} show={isVisible}>
            <Alert severity={type}>{message}</Alert>
        </FadeTransition>
    );
}

export default Notification;

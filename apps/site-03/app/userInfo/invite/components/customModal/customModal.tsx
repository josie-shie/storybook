import { useEffect } from 'react';
import style from './customModal.module.scss';

interface CustomModalProps {
    show: boolean;
    message: string;
    onHide: () => void;
}

function CustomModal({ show, message, onHide }: CustomModalProps) {
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (show) {
            timeoutId = setTimeout(() => {
                onHide();
            }, 1000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [show, onHide]);

    if (!show) {
        return null;
    }

    return (
        <div className={style.customModal}>
            <div className={style.modalContent}>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default CustomModal;

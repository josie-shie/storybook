'use client';
import NotificationComponent from '@/components/notification/notification';
import { useNotificationStore } from '@/store/notificationStore';

function Notification() {
    const message = useNotificationStore.use.message();
    const type = useNotificationStore.use.type();
    const isVisible = useNotificationStore.use.isVisible();
    const handleClose = useNotificationStore.use.handleClose();

    return (
        <NotificationComponent
            handleClose={handleClose}
            isVisible={isVisible}
            message={message}
            type={type}
        />
    );
}

export default Notification;

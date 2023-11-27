import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

type NotificationType = 'success' | 'error';

interface InitState {
    message: string;
    type: NotificationType;
    isVisible: boolean;
}

interface NotificationState extends InitState {
    handleClose: () => void;
}

let isInit = true;
let useNotificationStore: StoreWithSelectors<NotificationState>;

const initialState = (set: (data: Partial<NotificationState>) => void) => ({
    message: '',
    type: 'success' as NotificationType,
    isVisible: false,
    handleClose: () => {
        set({ isVisible: false, message: '' });
    }
});

const creatNotificationStore = (init: InitState) => {
    if (isInit) {
        useNotificationStore = initStore<NotificationState>(initialState, init);
        isInit = false;
    }
};

export { creatNotificationStore, useNotificationStore };

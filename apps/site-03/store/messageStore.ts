import { initStore } from 'lib';
import type { StoreWithSelectors, NewMessageNotify, UnreadMessageNotify } from 'lib';

interface NewMessageNotifyWithId extends NewMessageNotify {
    uid: string;
}
interface UnreadMessageNotifyWithId extends UnreadMessageNotify {
    uid: string;
}
interface InitState {
    forbiddenWords: string[];
    newMessageNotify: NewMessageNotifyWithId;
    unreadMessageNotify: UnreadMessageNotifyWithId;
    isNewMessageVisible: boolean;
}

interface MessageInfo extends InitState {
    setForbiddenWords: ({ forbiddenWords }: { forbiddenWords: string[] }) => void;
    updateNewMessageNotify: (newMessageNotify: NewMessageNotifyWithId) => void;
    updateUnreadMessageNotify: (unreadMessageNotify: UnreadMessageNotifyWithId) => void;
    setIsNewMessageVisible: (unreadMessageNotify: boolean) => void;
    resetNewMessageNotify: () => void;
    resetUnreadMessageNotify: () => void;
    readMailMessage: () => void;
    getNewMailMessage: () => void;
    readChatMessage: () => void;
    getNewChatMessage: () => void;
}

let isInit = true;
let useMessageStore: StoreWithSelectors<MessageInfo>;

const initialState = (set: (updater: (state: MessageInfo) => Partial<MessageInfo>) => void) => ({
    forbiddenWords: [],
    setForbiddenWords: ({ forbiddenWords }: { forbiddenWords: string[] }) => {
        set(() => ({ forbiddenWords }));
    },
    newMessageNotify: {} as NewMessageNotifyWithId,
    updateNewMessageNotify: (newMessageNotify: NewMessageNotifyWithId) => {
        set(() => ({ newMessageNotify }));
    },
    resetNewMessageNotify: () => {
        set(() => ({ newMessageNotify: {} as NewMessageNotifyWithId }));
    },
    unreadMessageNotify: {} as UnreadMessageNotifyWithId,
    updateUnreadMessageNotify: (unreadMessageNotify: UnreadMessageNotifyWithId) => {
        set(state => ({
            unreadMessageNotify: { ...state.unreadMessageNotify, ...unreadMessageNotify }
        }));
    },
    resetUnreadMessageNotify: () => {
        set(() => ({ unreadMessageNotify: {} as UnreadMessageNotifyWithId }));
    },
    isNewMessageVisible: false,
    setIsNewMessageVisible: (isNewMessageVisible: boolean) => {
        set(() => ({
            isNewMessageVisible
        }));
    },
    readMailMessage: () => {
        set(state => {
            if (state.unreadMessageNotify.mailCount > 0) {
                return {
                    unreadMessageNotify: {
                        ...state.unreadMessageNotify,
                        mailCount: state.unreadMessageNotify.mailCount - 1,
                        totalCount: state.unreadMessageNotify.totalCount - 1
                    }
                };
            }
            return state;
        });
    },
    getNewMailMessage: () => {
        set(state => {
            return {
                unreadMessageNotify: {
                    ...state.unreadMessageNotify,
                    mailCount: state.unreadMessageNotify.mailCount + 1,
                    totalCount: state.unreadMessageNotify.totalCount + 1
                }
            };
        });
    },
    readChatMessage: () => {
        set(state => {
            if (state.unreadMessageNotify.chatCount > 0) {
                return {
                    unreadMessageNotify: {
                        ...state.unreadMessageNotify,
                        chatCount: state.unreadMessageNotify.chatCount - 1,
                        totalCount: state.unreadMessageNotify.totalCount - 1
                    }
                };
            }
            return state;
        });
    },
    getNewChatMessage: () => {
        set(state => {
            return {
                unreadMessageNotify: {
                    ...state.unreadMessageNotify,
                    chatCount: state.unreadMessageNotify.chatCount + 1,
                    totalCount: state.unreadMessageNotify.totalCount + 1
                }
            };
        });
    }
});

const createMessageStore = (init: InitState) => {
    if (isInit) {
        useMessageStore = initStore<MessageInfo>(initialState, init);
        isInit = false;
    }
};

export { createMessageStore, useMessageStore };

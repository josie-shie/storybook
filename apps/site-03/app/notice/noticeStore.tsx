import { initStore } from 'lib';
import type { StoreWithSelectors, MessageRoomType } from 'lib';
import type { GetMailMemberListResponse, GetMailMemberResponse } from 'data-center';

interface InitState {
    mailList: GetMailMemberListResponse;
}

interface NoticeInfo extends InitState {
    chatList: MessageRoomType[];
    editStatus: boolean;
    selected: Set<number | string>;
    selectedMailData: GetMailMemberResponse;
    selectedChatData: MessageRoomType;
    setMailList: (data: GetMailMemberListResponse) => void;
    setChatList: (data: MessageRoomType[]) => void;
    setEditStatus: (editStatus: boolean) => void;
    setSelected: (selectId: number | string, action: string) => void;
    setSelectedMailData: (selectedMailData: GetMailMemberResponse) => void;
    setSelectedChatData: (selectedChatData: MessageRoomType) => void;
    resetSelectedMailData: () => void;
    resetSelectedChatData: () => void;
}

let useNoticeStore: StoreWithSelectors<NoticeInfo>;

const initialState = (
    set: (updater: (state: NoticeInfo) => Partial<NoticeInfo>) => void
): NoticeInfo => ({
    mailList: [],
    chatList: [],
    editStatus: false,
    selected: new Set<number | string>(),
    selectedMailData: {} as GetMailMemberResponse,
    selectedChatData: {} as MessageRoomType,
    setMailList: (mailList: GetMailMemberListResponse) => {
        set(() => ({ mailList }));
    },
    setChatList: (chatList: MessageRoomType[]) => {
        set(() => ({ chatList }));
    },
    setEditStatus: (editStatus: boolean) => {
        set(() => ({ editStatus }));
    },
    setSelected: (selectId: number | string, action: string) => {
        set(state => {
            const newSelected = new Set(state.selected);
            switch (action) {
                case 'add':
                    newSelected.add(selectId);
                    break;
                case 'delete':
                    newSelected.delete(selectId);
                    break;
                case 'clear':
                    newSelected.clear();
                    break;
                case 'allMail':
                    for (const notice of state.mailList) newSelected.add(notice.mailMemberId);
                    break;
                case 'allChat':
                    for (const chat of state.chatList) newSelected.add(chat.roomId);
                    break;
                default:
                    break;
            }
            return { selected: newSelected };
        });
    },
    setSelectedMailData: (selectedMailData: GetMailMemberResponse) => {
        set(() => ({ selectedMailData }));
    },
    setSelectedChatData: (selectedChatData: MessageRoomType) => {
        set(() => ({ selectedChatData }));
    },
    resetSelectedMailData: () => {
        set(() => ({ selectedMailData: {} as GetMailMemberResponse }));
    },
    resetSelectedChatData: () => {
        set(() => ({ selectedChatData: {} as MessageRoomType }));
    }
});

const createNoticeStore = (init: InitState) =>
    (useNoticeStore = initStore<NoticeInfo>(initialState, init));

export { createNoticeStore, useNoticeStore };

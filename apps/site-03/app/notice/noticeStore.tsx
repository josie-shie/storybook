import { initStore } from 'lib';
import type { StoreWithSelectors, MessageRoomType } from 'lib';
import type { GetMailMemberListResponse, GetMailMemberResponse } from 'data-center';

interface Tags {
    tagId: number;
    tagName: string;
    tagColor: string;
}

export interface InitMailData {
    全部: GetMailMemberListResponse;
    系统通知: GetMailMemberListResponse;
    交易明细: GetMailMemberListResponse;
    最新活动: GetMailMemberListResponse;
}

interface InitState {
    mailList: GetMailMemberResponse[];
    initMailData: InitMailData;
}

interface NoticeInfo extends InitState {
    chatList: MessageRoomType[];
    editStatus: boolean;
    selected: Set<number | string>;
    selectedMailData: GetMailMemberResponse;
    selectMailTag: Tags;
    selectedChatData: MessageRoomType;
    setMailList: (data: GetMailMemberResponse[]) => void;
    setInitMailData: (data: InitMailData) => void;
    setChatList: (data: MessageRoomType[]) => void;
    setEditStatus: (editStatus: boolean) => void;
    setSelected: (selectId: number | string, action: string) => void;
    setSelectedMailData: (selectedMailData: GetMailMemberResponse) => void;
    setSelectMailTag: (selectedMailData: Tags) => void;
    setSelectedChatData: (selectedChatData: MessageRoomType) => void;
    resetSelectedMailData: () => void;
    resetSelectedChatData: () => void;
}

let useNoticeStore: StoreWithSelectors<NoticeInfo>;

const initialState = (
    set: (updater: (state: NoticeInfo) => Partial<NoticeInfo>) => void
): NoticeInfo => ({
    initMailData: {} as InitMailData,
    mailList: [],
    chatList: [],
    editStatus: false,
    selected: new Set<number | string>(),
    selectedMailData: {} as GetMailMemberResponse,
    selectMailTag: {} as Tags,
    selectedChatData: {} as MessageRoomType,
    setInitMailData: (initMailData: InitMailData) => {
        set(() => ({ initMailData }));
    },
    setMailList: (mailList: GetMailMemberResponse[]) => {
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
            const scratchPool = new Set<string | number>();

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
                    for (const notice of state.mailList) newSelected.add(notice.notifyId);
                    break;
                case 'allChat':
                    for (const chat of state.chatList) newSelected.add(chat.roomId);
                    break;
                case 'counterMail':
                    for (const notice of state.mailList) {
                        if (!newSelected.has(notice.notifyId)) {
                            scratchPool.add(notice.notifyId);
                        }
                    }
                    return { selected: scratchPool };
                case 'counterChat':
                    for (const chat of state.chatList) {
                        if (!newSelected.has(chat.roomId)) {
                            scratchPool.add(chat.roomId);
                        }
                    }
                    return { selected: scratchPool };

                default:
                    break;
            }

            return { selected: newSelected };
        });
    },
    setSelectedMailData: (selectedMailData: GetMailMemberResponse) => {
        set(() => ({ selectedMailData }));
    },
    setSelectMailTag: (selectMailTag: Tags) => {
        set(() => ({ selectMailTag }));
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

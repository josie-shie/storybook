import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetMailMemberListResponse, GetMailMemberResponse } from 'data-center';

interface InitState {
    noticeData: GetMailMemberListResponse;
}

interface NoticeInfo extends InitState {
    editStatus: boolean;
    selected: Set<number>;
    mailData: GetMailMemberResponse;
    setNoticeData: (data: GetMailMemberListResponse) => void;
    setEditStatus: (editStatus: boolean) => void;
    addSelected: (mailId: number) => void;
    deleteSelected: (mailId: number) => void;
    setSelected: (mailId: number, action: string) => void;
    setMailData: (mailData: GetMailMemberResponse) => void;
    resetMailData: () => void;
}

let useNoticeStore: StoreWithSelectors<NoticeInfo>;

const initialState = (
    set: (updater: (state: NoticeInfo) => Partial<NoticeInfo>) => void
): NoticeInfo => ({
    noticeData: [],
    editStatus: false,
    selected: new Set<number>(),
    mailData: {} as GetMailMemberResponse,
    setNoticeData: (noticeData: GetMailMemberListResponse) => {
        set(() => ({ noticeData }));
    },
    setEditStatus: (editStatus: boolean) => {
        set(() => ({ editStatus }));
    },
    addSelected: (mailId: number) => {
        set(state => {
            const newSelected = new Set(state.selected);
            newSelected.add(mailId);
            return { selected: newSelected };
        });
    },
    deleteSelected: (mailId: number) => {
        set(state => {
            const newSelected = new Set(state.selected);
            newSelected.delete(mailId);
            return { selected: newSelected };
        });
    },
    setSelected: (mailId: number, action: string) => {
        set(state => {
            const newSelected = new Set(state.selected);
            switch (action) {
                case 'add':
                    newSelected.add(mailId);
                    break;
                case 'delete':
                    newSelected.delete(mailId);
                    break;
                case 'clear':
                    newSelected.clear();
                    break;
                case 'all':
                    for (const notice of state.noticeData) newSelected.add(notice.mailMemberId);
                    break;
                default:
                    break;
            }
            return { selected: newSelected };
        });
    },
    setMailData: (mailData: GetMailMemberResponse) => {
        set(() => ({ mailData }));
    },
    resetMailData: () => {
        set(() => ({ mailData: {} as GetMailMemberResponse }));
    }
});

const createNoticeStore = (init: InitState) =>
    (useNoticeStore = initStore<NoticeInfo>(initialState, init));

export { createNoticeStore, useNoticeStore };

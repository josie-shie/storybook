import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    loading: boolean;
}

interface InviteState extends InitState {
    invitedCount: number;
    totalCoins: number;
    inviteCode: string;
    setInvitedCount: (invitedCount: number) => void;
    setTotalCoins: (totalCoins: number) => void;
    setInviteCode: (inviteCode: string) => void;
}

let useInviteStore: StoreWithSelectors<InviteState>;

const initialState = (set: (updater: (state: InviteState) => Partial<InviteState>) => void) => ({
    loading: false,
    invitedCount: 0,
    totalCoins: 0,
    inviteCode: '',
    setInvitedCount: (invitedCount: number) => {
        set(state => ({ ...state, invitedCount }));
    },
    setTotalCoins: (totalCoins: number) => {
        set(state => ({ ...state, totalCoins }));
    },
    setInviteCode: (inviteCode: string) => {
        set(state => ({ ...state, inviteCode }));
    }
});

const createIntiveStore = (init: InitState) => {
    useInviteStore = initStore<InviteState>(initialState, init);
};

export { createIntiveStore, useInviteStore };

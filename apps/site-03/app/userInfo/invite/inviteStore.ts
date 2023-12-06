import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Invite {
    invitedCount: number;
    totalCoins: number;
    inviteLink: string;
}

interface InviteState {
    invite: Invite;
}

let useInviteStore: StoreWithSelectors<InviteState>;

const initialState = (set: (updater: (state: InviteState) => Partial<InviteState>) => void) => ({
    invite: {
        invitedCount: 0,
        totalCoins: 0,
        inviteLink: ''
    },
    setInvitedCount: (invitedCount: number) => {
        set(state => ({
            ...state,
            invite: { ...state.invite, invitedCount }
        }));
    },
    setTotalCoins: (totalCoins: number) => {
        set(state => ({
            ...state,
            invite: { ...state.invite, totalCoins }
        }));
    },
    setInviteLink: (inviteLink: string) => {
        set(state => ({
            ...state,
            invite: { ...state.invite, inviteLink }
        }));
    }
});

const createIntiveStore = (init: Partial<InviteState>) => {
    useInviteStore = initStore<InviteState>(set => {
        return {
            ...initialState(set),
            ...init
        };
    });
};

export { createIntiveStore, useInviteStore };

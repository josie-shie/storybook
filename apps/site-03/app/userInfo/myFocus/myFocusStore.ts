import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
// import type { GetFollowersResponse } from 'data-center';

interface FocusMember {
    memberId: number;
    username: string;
    avatarPath: string;
    profile: string;
    fans: number;
    unlocked: number;
    hotStreak: number;
    ranking: number;
    followed: boolean;
}

interface InitState {
    focusMemberItem: FocusMember[];
}

interface FocusMemberState extends InitState {
    setFocusMemberItem: (focusMemberItem: FocusMember[]) => void;
}

let useFocusMemberStore: StoreWithSelectors<FocusMemberState>;

const initialState = (set: (data: Partial<FocusMemberState>) => void) => ({
    focusMemberItem: [],
    setFocusMemberItem: (focusMemberItem: FocusMember[]) => {
        set({ focusMemberItem });
    }
});

const creatFocusMemberStore = (init: InitState) =>
    (useFocusMemberStore = initStore<FocusMemberState>(initialState, init));

export { creatFocusMemberStore, useFocusMemberStore };

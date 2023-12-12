import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetFollowersResponse } from 'data-center';

interface InitState {
    focusMemberItem: GetFollowersResponse;
}

interface FocusMemberState extends InitState {
    setFocusMemberItem: (focusMemberItem: GetFollowersResponse) => void;
}

let useFocusMemberStore: StoreWithSelectors<FocusMemberState>;

const initialState = (set: (data: Partial<FocusMemberState>) => void) => ({
    focusMemberItem: [],
    setFocusMemberItem: (focusMemberItem: GetFollowersResponse) => {
        set({ focusMemberItem });
    }
});

const creatFocusMemberStore = (init: InitState) =>
    (useFocusMemberStore = initStore<FocusMemberState>(initialState, init));

export { creatFocusMemberStore, useFocusMemberStore };

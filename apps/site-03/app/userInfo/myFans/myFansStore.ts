import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetFollowersResponse } from 'data-center';

interface InitState {
    fansMemberItem: GetFollowersResponse;
}

interface FansMemberState extends InitState {
    setFansMemberItem: (fansMemberItem: GetFollowersResponse) => void;
}

let useFansMemberStore: StoreWithSelectors<FansMemberState>;

const initialState = (set: (data: Partial<FansMemberState>) => void) => ({
    fansMemberItem: [],
    setFansMemberItem: (fansMemberItem: GetFollowersResponse) => {
        set({ fansMemberItem });
    }
});

const creatFansMemberStore = (init: InitState) =>
    (useFansMemberStore = initStore<FansMemberState>(initialState, init));

export { creatFansMemberStore, useFansMemberStore };

import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface FansMember {
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
    fansMemberItem: FansMember[];
}

interface FansMemberState extends InitState {
    setFansMemberItem: (fansMemberItem: FansMember[]) => void;
}

let useFansMemberStore: StoreWithSelectors<FansMemberState>;

const initialState = (set: (data: Partial<FansMemberState>) => void) => ({
    fansMemberItem: [],
    setFansMemberItem: (fansMemberItem: FansMember[]) => {
        set({ fansMemberItem });
    }
});

const creatFansMemberStore = (init: InitState) =>
    (useFansMemberStore = initStore<FansMemberState>(initialState, init));

export { creatFansMemberStore, useFansMemberStore };

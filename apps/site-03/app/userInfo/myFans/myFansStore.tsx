import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface FansMember {
    id: number;
    name: string;
    hotStreak: number;
    ranking: number;
    followed: boolean;
    unlockNumber: number;
    fansNumber: number;
    description: string;
}

interface InitState {
    fansMemberItem: FansMember[];
}

interface FansMemberState extends InitState {
    setFansMemberList?: (fansMemberItem: FansMember[]) => void;
}

let useFansMemberStore: StoreWithSelectors<FansMemberState>;

const initialState = (set: (data: Partial<FansMemberState>) => void) => ({
    fansMemberItem: [],
    setFansMemberList: (fansMemberItem: FansMember[]) => {
        set({ fansMemberItem });
    }
});

const creatFansMemberStore = (init: InitState) =>
    (useFansMemberStore = initStore<FansMemberState>(initialState, init));

export { creatFansMemberStore, useFansMemberStore };

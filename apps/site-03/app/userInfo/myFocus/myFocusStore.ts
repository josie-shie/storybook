import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface FocusMember {
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
    focusMemberItem: FocusMember[];
}

interface FocusMemberState extends InitState {
    setFocusMemberList?: (focusMemberItem: FocusMember[]) => void;
}

let useFocusMemberStore: StoreWithSelectors<FocusMemberState>;

const initialState = (set: (data: Partial<FocusMemberState>) => void) => ({
    focusMemberItem: [],
    setFocusMemberList: (focusMemberItem: FocusMember[]) => {
        set({ focusMemberItem });
    }
});

const creatFocusMemberStore = (init: InitState) =>
    (useFocusMemberStore = initStore<FocusMemberState>(initialState, init));

export { creatFocusMemberStore, useFocusMemberStore };

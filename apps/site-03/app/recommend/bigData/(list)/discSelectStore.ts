import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface HandicapTipType {
    id: number;
    betType: 'handicap' | 'total';
    betStatus: 'win' | 'lose' | 'big' | 'small';
    gamesNumber: number;
    hot: boolean;
}

interface InitState {
    handicapTips: HandicapTipType[];
}

interface DiscSelectState extends InitState {
    setHandicapTips: (handicapTips: HandicapTipType[]) => void;
}

let useDiscSelectStore: StoreWithSelectors<DiscSelectState>;

const initialState = (set: (data: Partial<DiscSelectState>) => void) => ({
    handicapTips: [],
    setHandicapTips: (handicapTips: HandicapTipType[]) => {
        set({ handicapTips });
    }
});

const creatDiscSelectStore = (init: InitState) =>
    (useDiscSelectStore = initStore<DiscSelectState>(initialState, init));

export { creatDiscSelectStore, useDiscSelectStore };

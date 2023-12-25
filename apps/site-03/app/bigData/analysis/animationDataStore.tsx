import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    analysisTimes: boolean;
}

interface AnimationDataState extends InitState {
    setAnalysisTimes: (analysisTimes: boolean) => void;
}

let useAnimationDataStore: StoreWithSelectors<AnimationDataState>;

const initialState = (
    set: (updater: (state: AnimationDataState) => Partial<AnimationDataState>) => void
) => ({
    analysisTimes: true,
    setAnalysisTimes: (analysisTimes: boolean) => {
        set(state => {
            return { ...state, analysisTimes };
        });
    }
});

const creatAnimationDataStore = (init: InitState) =>
    (useAnimationDataStore = initStore<AnimationDataState>(initialState, init));

export { creatAnimationDataStore, useAnimationDataStore };

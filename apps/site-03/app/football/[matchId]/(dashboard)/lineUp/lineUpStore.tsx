import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetLineUpInfoResponse } from 'data-center';

interface InitState {
    lineUpListInfo: GetLineUpInfoResponse;
}

interface LineUpState extends InitState {
    setLineUpListInfo: (lineUpListInfo: GetLineUpInfoResponse) => void;
}

let useLineUpStore: StoreWithSelectors<LineUpState>;

const initialState = (set: (updater: (state: LineUpState) => Partial<LineUpState>) => void) => ({
    lineUpListInfo: {} as GetLineUpInfoResponse,
    setLineUpListInfo: (lineUpListInfo: GetLineUpInfoResponse) => {
        set(state => {
            return { ...state, lineUpListInfo };
        });
    }
});

const creatLineUpStore = (init: InitState) =>
    (useLineUpStore = initStore<LineUpState>(initialState, init));

export { creatLineUpStore, useLineUpStore };

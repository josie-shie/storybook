import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { OriginalContestInfo } from 'data-center';

type ContestTable = Record<string, Partial<OriginalContestInfo>>;

interface InitState {
    contestInfo: ContestTable;
}
interface ContestInfoContest extends InitState {
    setContestInfoContest: (info: Partial<OriginalContestInfo>) => void;
}

let useContestInfoStore: StoreWithSelectors<ContestInfoContest>;

const initialState = (
    set: (updater: (state: ContestInfoContest) => Partial<ContestInfoContest>) => void
) => ({
    contestInfo: {},
    setContestInfoContest: (info: Partial<OriginalContestInfo>) => {
        const id = info.matchId?.toString();
        if (!id) return;
        set(state => {
            const newContestInfo: ContestTable = { ...state.contestInfo };
            if (Object.hasOwnProperty.call(newContestInfo, id)) {
                newContestInfo[id] = {
                    ...newContestInfo[id],
                    ...info
                };
            } else {
                newContestInfo[id] = info;
            }

            return { ...state, contestInfo: newContestInfo };
        });
    }
});

const creatContestInfoStore = (init: InitState) =>
    (useContestInfoStore = initStore<ContestInfoContest>(initialState, init));

export { creatContestInfoStore, useContestInfoStore };

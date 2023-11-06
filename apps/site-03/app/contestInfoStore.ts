import { initStore, convertHandicap, truncateFloatingPoint, timestampToString } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { OriginalContestInfo, ContestInfo } from 'data-center';

type ContestTable = Record<string, Partial<ContestInfo>>;

interface InitState {
    contestInfo: ContestTable;
}
interface ContestInfoContest extends InitState {
    setContestInfoContest: (info: Partial<OriginalContestInfo>) => void;
}

let isInit = true;
let useContestInfoStore: StoreWithSelectors<ContestInfoContest>;

const initialState = (
    set: (updater: (state: ContestInfoContest) => Partial<ContestInfoContest>) => void
) => ({
    contestInfo: {},
    setContestInfoContest: (info: Partial<OriginalContestInfo>) => {
        const id = info.matchId?.toString();
        if (!id) return;
        const updatedInfo = {
            ...info,
            ...(typeof info.matchTime === 'number' && {
                matchTime: timestampToString(info.matchTime, 'M-DD HH:mm')
            }),
            ...(typeof info.startTime === 'number' &&
                typeof info.matchTime === 'number' && {
                    startTime: timestampToString(
                        info.startTime || info.matchTime,
                        'YYYY-M-DD HH:mm'
                    )
                }),
            ...(typeof info.handicapCurrent === 'number' && {
                handicapCurrent: convertHandicap(info.handicapCurrent)
            }),
            ...(typeof info.overUnderCurrent === 'number' && {
                overUnderCurrent: convertHandicap(info.overUnderCurrent)
            }),
            ...(typeof info.handicapHomeCurrentOdds === 'number' && {
                handicapHomeCurrentOdds: truncateFloatingPoint(info.handicapHomeCurrentOdds, 2)
            }),
            ...(typeof info.handicapAwayCurrentOdds === 'number' && {
                handicapAwayCurrentOdds: truncateFloatingPoint(info.handicapAwayCurrentOdds, 2)
            }),
            ...(typeof info.overUnderUnderCurrentOdds === 'number' && {
                overUnderUnderCurrentOdds: truncateFloatingPoint(info.overUnderUnderCurrentOdds, 2)
            }),
            ...(typeof info.overUnderOverCurrentOdds === 'number' && {
                overUnderOverCurrentOdds: truncateFloatingPoint(info.overUnderOverCurrentOdds, 2)
            })
        } as Partial<ContestInfo>;

        set(state => {
            const newContestInfo: ContestTable = { ...state.contestInfo };
            if (Object.hasOwnProperty.call(newContestInfo, id)) {
                newContestInfo[id] = {
                    ...newContestInfo[id],
                    ...updatedInfo
                };
            } else {
                newContestInfo[id] = updatedInfo;
            }

            // eslint-disable-next-line -- test info
            console.log('New global store', newContestInfo);

            return { ...state, contestInfo: newContestInfo };
        });
    }
});

const creatContestInfoStore = (init: InitState) => {
    if (isInit) {
        useContestInfoStore = initStore<ContestInfoContest>(initialState, init);
        isInit = false;
    }
};

export { creatContestInfoStore, useContestInfoStore };

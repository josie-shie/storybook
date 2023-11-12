import { initStore, convertHandicap, truncateFloatingPoint } from 'lib';
import type { StoreWithSelectors, OddsHashTable } from 'lib';
import type { OriginalContestInfo, ContestInfo } from 'data-center';

type ContestTable = Record<string, Partial<ContestInfo>>;

interface InitState {
    contestInfo: ContestTable;
}
interface ContestInfoContest extends InitState {
    setContestInfoContest: (info: Partial<OriginalContestInfo>) => void;
    setContestOdds: (odds: OddsHashTable) => void;
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

            // console.log('New global store', newContestInfo);

            return { ...state, contestInfo: newContestInfo };
        });
    },

    setContestOdds: (odds: OddsHashTable) => {
        Object.keys(odds).forEach(matchId => {
            Object.keys(odds[matchId]).forEach(companyId => {
                if (companyId === '3') {
                    const obj = odds[matchId][companyId];
                    // console.log('matchId', matchId, companyId);
                    // console.log('odds', odds);
                    // console.log('obj', obj);
                    set(state => {
                        const newContestInfo: ContestTable = { ...state.contestInfo };
                        const updatedOdds = {
                            ...(typeof obj.handicap.currentHandicap === 'number' && {
                                handicapCurrent: convertHandicap(obj.handicap.currentHandicap)
                            }),
                            ...(typeof obj.overUnder.currentHandicap === 'number' && {
                                overUnderCurrent: convertHandicap(obj.overUnder.currentHandicap)
                            }),
                            ...(typeof obj.handicap.homeCurrentOdds === 'number' && {
                                handicapHomeCurrentOdds: truncateFloatingPoint(
                                    obj.handicap.homeCurrentOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.handicap.awayCurrentOdds === 'number' && {
                                handicapAwayCurrentOdds: truncateFloatingPoint(
                                    obj.handicap.awayCurrentOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.overUnder.currentUnderOdds === 'number' && {
                                overUnderUnderCurrentOdds: truncateFloatingPoint(
                                    obj.overUnder.currentUnderOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.overUnder.currentOverOdds === 'number' && {
                                overUnderOverCurrentOdds: truncateFloatingPoint(
                                    obj.overUnder.currentOverOdds,
                                    2
                                )
                            })
                        } as Partial<ContestInfo>;

                        if (Object.hasOwnProperty.call(newContestInfo, matchId)) {
                            newContestInfo[matchId] = {
                                ...newContestInfo[matchId],
                                ...updatedOdds
                            };
                        } else {
                            newContestInfo[matchId] = updatedOdds;
                        }

                        // eslint-disable-next-line -- test info
                        console.log('New global odd store', newContestInfo);

                        return { ...state, contestInfo: newContestInfo };
                    });
                }
            });
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

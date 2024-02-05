import { initStore, convertHandicap, truncateFloatingPoint } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { OriginalContestInfo, ContestInfo } from 'data-center';

type ContestTable = Record<string, Partial<ContestInfo>>;

interface OddsRunningMqttResponse {
    matchId: number;
    companyId: number;
    odds1: string;
    odds2: string;
    odds3: string;
    type: number;
    modifytime: number;
}

interface InitState {
    contestInfo: ContestTable;
}
interface LiveContest extends InitState {
    setContestInfoContest: (info: Partial<OriginalContestInfo>) => void;
    setContestOdds: (odds: OddsRunningMqttResponse) => void;
}

let isInit = true;
let useLiveContestStore: StoreWithSelectors<LiveContest>;

const initialState = (set: (updater: (state: LiveContest) => Partial<LiveContest>) => void) => ({
    contestInfo: {} as ContestTable,
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

            return { ...state, contestInfo: newContestInfo };
        });
    },

    setContestOdds: (odds: OddsRunningMqttResponse) => {
        if (odds.type !== 1 && odds.type !== 6 && odds.type !== 2 && odds.type !== 7) return;

        set(state => {
            const newContestInfo: ContestTable = { ...state.contestInfo };
            let updateData = {};

            switch (odds.type) {
                case 1:
                case 6:
                    updateData = {
                        handicapCurrent: convertHandicap(Number(odds.odds2)),
                        handicapHomeCurrentOdds: truncateFloatingPoint(Number(odds.odds1), 2),
                        handicapAwayCurrentOdds: truncateFloatingPoint(Number(odds.odds3), 2),
                        closed: odds.type === 6
                    };
                    break;
                case 2:
                case 7:
                    updateData = {
                        overUnderCurrent: convertHandicap(Number(odds.odds2)),
                        overUnderOverCurrentOdds: truncateFloatingPoint(Number(odds.odds1), 2),
                        overUnderUnderCurrentOdds: truncateFloatingPoint(Number(odds.odds3), 2),
                        closed: odds.type === 7
                    };
                    break;
                default:
                    console.error('Unknown type');
                    break;
            }

            newContestInfo[odds.matchId] = { ...newContestInfo[odds.matchId], ...updateData };

            return { ...state, contestInfo: newContestInfo };
        });
    }
});

const createLiveContestStore = (init: InitState) => {
    if (isInit) {
        useLiveContestStore = initStore<LiveContest>(initialState, init);
        isInit = false;
    }
};

export { createLiveContestStore, useLiveContestStore };

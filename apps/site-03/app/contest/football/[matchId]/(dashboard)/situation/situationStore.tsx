import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type {
    GetDetailStatusResponse as InitState,
    HandicapsDataType,
    TotalGoalsDataType,
    EventInfoType,
    LineupList
} from 'data-center';

let useSituationStore: StoreWithSelectors<InitState>;

const initialState = (set: (data: InitState) => void) => ({
    handicapsData: {} as HandicapsDataType,
    totalGoalsData: {} as TotalGoalsDataType,
    eventList: [],
    eventInfo: {} as EventInfoType,
    technical: [],
    lineupInfo: {} as LineupList,
    setSituationData: ({
        handicapsData,
        totalGoalsData,
        eventList,
        eventInfo,
        technical,
        lineupInfo
    }: InitState) => {
        set({ handicapsData, totalGoalsData, eventList, eventInfo, technical, lineupInfo });
    }
});

const creatSituationStore = (init: InitState) =>
    (useSituationStore = initStore<InitState>(initialState, init));

export { creatSituationStore, useSituationStore };

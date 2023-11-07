import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type {
    GetDetailStatusResponse,
    HandicapsDataType,
    TotalGoalsDataType,
    EventInfoType,
    LineupList,
    CompanyLiveDetailResponse
} from 'data-center';

interface InitState extends GetDetailStatusResponse {
    companyLiveOddsDetail: CompanyLiveDetailResponse;
}

interface SituationState extends InitState {
    oddsDeatilDrawerTabValue: string;
    isOddsDetailDrawerOpen: boolean;
    companyId: number;
    setCompanyId: (companyId: number) => void;
    setIsOddsDetailDrawerOpen: (isOpen: boolean) => void;
    setOddsDeatilDrawerTabValue: (tabValue: string) => void;
    setCompanyLiveOddsDetail: (detail: CompanyLiveDetailResponse) => void;
}

let useSituationStore: StoreWithSelectors<SituationState>;

const initialState = (set: (data: Partial<SituationState>) => void) => ({
    handicapsData: {} as HandicapsDataType,
    totalGoalsData: {} as TotalGoalsDataType,
    eventList: [],
    eventInfo: {} as EventInfoType,
    technical: [],
    lineupInfo: {} as LineupList,
    companyLiveOddsDetail: {} as CompanyLiveDetailResponse,
    isOddsDetailDrawerOpen: false,
    oddsDeatilDrawerTabValue: 'halfHandicap',
    companyId: 3,
    setCompanyId: (companyId: number) => {
        set({ companyId });
    },
    setIsOddsDetailDrawerOpen: (isOpen: boolean) => {
        set({
            isOddsDetailDrawerOpen: isOpen
        });
    },
    setOddsDeatilDrawerTabValue: (tabValue: string) => {
        set({
            oddsDeatilDrawerTabValue: tabValue
        });
    },
    setCompanyLiveOddsDetail: (detail: CompanyLiveDetailResponse) => {
        set({
            companyLiveOddsDetail: detail
        });
    },
    setSituationData: ({
        handicapsData,
        totalGoalsData,
        eventList,
        eventInfo,
        technical,
        lineupInfo
    }: SituationState) => {
        set({
            handicapsData,
            totalGoalsData,
            eventList,
            eventInfo,
            technical,
            lineupInfo
        });
    }
});

const creatSituationStore = (init: InitState) =>
    (useSituationStore = initStore<SituationState>(initialState, init));

export { creatSituationStore, useSituationStore };

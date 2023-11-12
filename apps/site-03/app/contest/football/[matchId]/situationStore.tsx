import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type {
    GetDetailStatusResponse,
    HandicapsDataType,
    TotalGoalsDataType,
    EventInfoType,
    TechnicalInfo,
    LineupList,
    CompanyLiveDetailResponse
} from 'data-center';

interface OddChangType {
    match: {
        matchId: number;
        homeScore: number;
        awayScore: number;
        state: number;
    };
    handicapHalfList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        homeCurrentOdds: number;
        awayCurrentOdds: number;
        oddsChangeTime: number;
        oddsType: number;
    }[];
    handicapList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        homeCurrentOdds: number;
        awayCurrentOdds: number;
        isMaintained: boolean;
        isInProgress: boolean;
        oddsChangeTime: number;
        isClosed: boolean;
        oddsType: number;
    }[];
    overUnderHalfList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        currentOverOdds: number;
        currentUnderOdds: number;
        oddsChangeTime: number;
        oddsType: number;
    }[];
    overUnderList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        currentOverOdds: number;
        currentUnderOdds: number;
        oddsChangeTime: number;
        isClosed: boolean;
        oddsType: number;
    }[];
    europeOddsHalfList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        currentOverOdds: number;
        currentUnderOdds: number;
        oddsChangeTime: number;
        isClosed: boolean;
        oddsType: number;
    }[];
    europeOddsList: {
        matchId: number;
        companyId: number;
        currentHandicap: number;
        currentOverOdds: number;
        currentUnderOdds: number;
        oddsChangeTime: number;
        oddsType: number;
    }[];
}

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
    setEvents: ({
        eventList,
        eventInfo
    }: {
        eventList: string[];
        eventInfo: EventInfoType;
    }) => void;
    setTechnical: ({ technical }: { technical: TechnicalInfo[] }) => void;
    setOddChange: ({ oddChangeData }: { oddChangeData: OddChangType }) => void;
}

let useSituationStore: StoreWithSelectors<SituationState>;

const initialState = (set: (data: Partial<SituationState>) => void) => ({
    handicapsData: {} as HandicapsDataType,
    totalGoalsData: {} as TotalGoalsDataType,
    eventList: [] as string[],
    eventInfo: {} as EventInfoType,
    technical: [] as TechnicalInfo[],
    lineupInfo: {} as LineupList,
    companyLiveOddsDetail: {} as CompanyLiveDetailResponse,
    isOddsDetailDrawerOpen: false,
    oddsDeatilDrawerTabValue: 'fullHandicap',
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
        set({ handicapsData, totalGoalsData, eventList, eventInfo, technical, lineupInfo });
    },
    setEvents: ({ eventList, eventInfo }: { eventList: string[]; eventInfo: EventInfoType }) => {
        set({ eventList, eventInfo });
    },
    setTechnical: ({ technical }: { technical: TechnicalInfo[] }) => {
        set({ technical });
    },
    setOddChange: ({ oddChangeData }: { oddChangeData: OddChangType }) => {
        // eslint-disable-next-line no-console -- TODO  setOddChange
        console.log(oddChangeData);
    }
});

const creatSituationStore = (init: InitState) =>
    (useSituationStore = initStore<SituationState>(initialState, init));

export { creatSituationStore, useSituationStore };

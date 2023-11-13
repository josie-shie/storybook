import { initStore, convertHandicap, truncateFloatingPoint } from 'lib';
import type { StoreWithSelectors, OddsHashTable } from 'lib';
import type {
    GetDetailStatusResponse,
    HandicapsDataType,
    TotalGoalsDataType,
    EventInfoType,
    TechnicalInfo,
    LineupList,
    CompanyLiveDetailResponse,
    HandicapsInfo,
    TotalGoalsInfo
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
    setOdds: (odds: Partial<OddsHashTable>, matchId: number) => void;
}

let useSituationStore: StoreWithSelectors<SituationState>;

const initialState = (
    set: (updater: (state: SituationState) => Partial<SituationState>) => void
) => ({
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
        set(state => {
            return { ...state, companyId };
        });
    },
    setIsOddsDetailDrawerOpen: (isOpen: boolean) => {
        set(state => {
            return { ...state, isOddsDetailDrawerOpen: isOpen };
        });
    },
    setOddsDeatilDrawerTabValue: (tabValue: string) => {
        set(state => {
            return { ...state, oddsDeatilDrawerTabValue: tabValue };
        });
    },
    setCompanyLiveOddsDetail: (detail: CompanyLiveDetailResponse) => {
        set(state => {
            return { ...state, companyLiveOddsDetail: detail };
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
        set(state => {
            return {
                ...state,
                handicapsData,
                totalGoalsData,
                eventList,
                eventInfo,
                technical,
                lineupInfo
            };
        });
    },
    setEvents: ({ eventList, eventInfo }: { eventList: string[]; eventInfo: EventInfoType }) => {
        set(state => {
            return { ...state, eventList, eventInfo };
        });
    },
    setTechnical: ({ technical }: { technical: TechnicalInfo[] }) => {
        set(state => {
            return { ...state, technical };
        });
    },
    setOddChange: ({ oddChangeData }: { oddChangeData: OddChangType }) => {
        // eslint-disable-next-line no-console -- TODO  setOddChange
        console.log(oddChangeData);
    },
    setOdds: (odds: Partial<OddsHashTable>, matchId: number) => {
        const match = odds[matchId];

        set(state => {
            const newHandicapData: HandicapsDataType = { ...state.handicapsData };
            const newTotalGoal: TotalGoalsDataType = { ...state.totalGoalsData };

            if (match) {
                Object.keys(match).forEach(companyId => {
                    const obj = match[companyId];

                    if (newHandicapData.full[companyId]) {
                        const updatedFullOdds = {
                            ...(typeof obj.handicap.homeInitialOdds === 'number' && {
                                homeInitialOdds: truncateFloatingPoint(
                                    obj.handicap.homeInitialOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.handicap.initialHandicap === 'number' && {
                                initialHandicap: convertHandicap(obj.handicap.initialHandicap)
                            }),
                            ...(typeof obj.handicap.awayInitialOdds === 'number' && {
                                awayInitialOdds: truncateFloatingPoint(
                                    obj.handicap.awayInitialOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.handicap.awayCurrentOdds === 'number' && {
                                awayCurrentOdds: truncateFloatingPoint(
                                    obj.handicap.awayCurrentOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.handicap.currentHandicap === 'number' && {
                                currentHandicap: convertHandicap(obj.handicap.currentHandicap)
                            }),
                            ...(typeof obj.handicap.homeCurrentOdds === 'number' && {
                                homeCurrentOdds: truncateFloatingPoint(
                                    obj.handicap.homeCurrentOdds,
                                    2
                                )
                            })
                        };

                        let updatedStateData: HandicapsInfo[];

                        if (obj.handicap.oddsType === 3) {
                            // 已開賽
                            updatedStateData = newHandicapData.full[Number(companyId)].inProgress;
                        } else {
                            // 未開賽
                            updatedStateData = newHandicapData.full[Number(companyId)].notStarted;
                        }

                        const newUpdatedStateData = updatedStateData.map(item => {
                            return { ...item, ...updatedFullOdds };
                        }) as HandicapsInfo[];

                        newHandicapData.full[Number(companyId)].inProgress =
                            obj.handicap.oddsType === 3
                                ? newUpdatedStateData
                                : newHandicapData.full[Number(companyId)].inProgress;
                        newHandicapData.full[Number(companyId)].notStarted =
                            obj.handicap.oddsType !== 3
                                ? newUpdatedStateData
                                : newHandicapData.full[Number(companyId)].notStarted;
                    }

                    if (newHandicapData.half[companyId]) {
                        const updatedHalfOdds = {
                            ...(typeof obj.handicapHalf.homeInitialOdds === 'number' && {
                                homeInitialOdds: truncateFloatingPoint(
                                    obj.handicapHalf.homeInitialOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.handicapHalf.initialHandicap === 'number' && {
                                initialHandicap: convertHandicap(obj.handicapHalf.initialHandicap)
                            }),
                            ...(typeof obj.handicapHalf.awayInitialOdds === 'number' && {
                                awayInitialOdds: truncateFloatingPoint(
                                    obj.handicapHalf.awayInitialOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.handicapHalf.awayCurrentOdds === 'number' && {
                                awayCurrentOdds: truncateFloatingPoint(
                                    obj.handicapHalf.awayCurrentOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.handicapHalf.currentHandicap === 'number' && {
                                currentHandicap: convertHandicap(obj.handicapHalf.currentHandicap)
                            }),
                            ...(typeof obj.handicapHalf.homeCurrentOdds === 'number' && {
                                homeCurrentOdds: truncateFloatingPoint(
                                    obj.handicapHalf.homeCurrentOdds,
                                    2
                                )
                            })
                        };

                        let updatedStateData: HandicapsInfo[];

                        if (obj.handicapHalf.oddsType === 3) {
                            // 已開賽
                            updatedStateData = newHandicapData.half[Number(companyId)].inProgress;
                        } else {
                            // 未開賽
                            updatedStateData = newHandicapData.half[Number(companyId)].notStarted;
                        }

                        const newUpdatedStateData = updatedStateData.map(item => {
                            return { ...item, ...updatedHalfOdds };
                        }) as HandicapsInfo[];

                        newHandicapData.half[Number(companyId)].inProgress =
                            obj.handicapHalf.oddsType === 3
                                ? newUpdatedStateData
                                : newHandicapData.half[Number(companyId)].inProgress;
                        newHandicapData.half[Number(companyId)].notStarted =
                            obj.handicapHalf.oddsType !== 3
                                ? newUpdatedStateData
                                : newHandicapData.half[Number(companyId)].notStarted;
                    }

                    if (newTotalGoal.full[companyId]) {
                        const updatedFullOdds = {
                            ...(typeof obj.overUnder.currentHandicap === 'number' && {
                                currentHandicap: convertHandicap(obj.overUnder.currentHandicap)
                            }),
                            ...(typeof obj.overUnder.initialHandicap === 'number' && {
                                initialHandicap: convertHandicap(obj.overUnder.initialHandicap)
                            }),
                            ...(typeof obj.overUnder.homeInitialOdds === 'number' && {
                                overInitialOdds: truncateFloatingPoint(
                                    obj.overUnder.homeInitialOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.overUnder.awayInitialOdds === 'number' && {
                                underInitialOdds: truncateFloatingPoint(
                                    obj.overUnder.awayInitialOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.overUnder.currentOverOdds === 'number' && {
                                overCurrentOdds: truncateFloatingPoint(
                                    obj.overUnder.currentOverOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.overUnder.currentUnderOdds === 'number' && {
                                underCurrentOdds: truncateFloatingPoint(
                                    obj.overUnder.currentUnderOdds,
                                    2
                                )
                            })
                        };

                        let updatedStateData: TotalGoalsInfo[];

                        if (obj.overUnder.oddsType === 3) {
                            // 已開賽
                            updatedStateData = newTotalGoal.full[Number(companyId)].inProgress;
                        } else {
                            // 未開賽
                            updatedStateData = newTotalGoal.full[Number(companyId)].notStarted;
                        }

                        const newUpdatedStateData = updatedStateData.map(item => {
                            return { ...item, ...updatedFullOdds };
                        }) as TotalGoalsInfo[];

                        newTotalGoal.full[Number(companyId)].inProgress =
                            obj.handicapHalf.oddsType === 3
                                ? newUpdatedStateData
                                : newTotalGoal.full[Number(companyId)].inProgress;
                        newTotalGoal.full[Number(companyId)].notStarted =
                            obj.handicapHalf.oddsType !== 3
                                ? newUpdatedStateData
                                : newTotalGoal.full[Number(companyId)].notStarted;
                    }

                    if (newTotalGoal.half[companyId]) {
                        const updatedHalfOdds = {
                            ...(typeof obj.overUnderHalf.currentHandicap === 'number' && {
                                currentHandicap: convertHandicap(obj.overUnderHalf.currentHandicap)
                            }),
                            ...(typeof obj.overUnderHalf.initialHandicap === 'number' && {
                                initialHandicap: convertHandicap(obj.overUnderHalf.initialHandicap)
                            }),
                            ...(typeof obj.overUnderHalf.homeInitialOdds === 'number' && {
                                overInitialOdds: truncateFloatingPoint(
                                    obj.overUnderHalf.homeInitialOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.overUnderHalf.awayInitialOdds === 'number' && {
                                underInitialOdds: truncateFloatingPoint(
                                    obj.overUnderHalf.awayInitialOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.overUnderHalf.currentOverOdds === 'number' && {
                                overCurrentOdds: truncateFloatingPoint(
                                    obj.overUnderHalf.currentOverOdds,
                                    2
                                )
                            }),
                            ...(typeof obj.overUnderHalf.currentUnderOdds === 'number' && {
                                underCurrentOdds: truncateFloatingPoint(
                                    obj.overUnderHalf.currentUnderOdds,
                                    2
                                )
                            })
                        };

                        let updatedStateData: TotalGoalsInfo[];

                        if (obj.overUnderHalf.oddsType === 3) {
                            // 已開賽
                            updatedStateData = newTotalGoal.half[Number(companyId)].inProgress;
                        } else {
                            // 未開賽
                            updatedStateData = newTotalGoal.half[Number(companyId)].notStarted;
                        }

                        const newUpdatedStateData = updatedStateData.map(item => {
                            return { ...item, ...updatedHalfOdds };
                        }) as TotalGoalsInfo[];

                        newTotalGoal.half[Number(companyId)].inProgress =
                            obj.handicapHalf.oddsType === 3
                                ? newUpdatedStateData
                                : newTotalGoal.half[Number(companyId)].inProgress;
                        newTotalGoal.half[Number(companyId)].notStarted =
                            obj.handicapHalf.oddsType !== 3
                                ? newUpdatedStateData
                                : newTotalGoal.half[Number(companyId)].notStarted;
                    }
                });
            }

            return { ...state, handicapsData: newHandicapData, totalGoalsData: newTotalGoal };
        });
    }
});

const creatSituationStore = (init: InitState) =>
    (useSituationStore = initStore<SituationState>(initialState, init));

export { creatSituationStore, useSituationStore };

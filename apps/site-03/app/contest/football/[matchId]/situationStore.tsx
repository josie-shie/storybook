import { initStore, convertHandicap, truncateFloatingPoint } from 'lib';
import type { StoreWithSelectors, OddsHashTable, OddsRunningHashTable } from 'lib';
import type {
    GetDetailStatusResponse,
    HandicapsDataType,
    TotalGoalsDataType,
    TechnicalInfo,
    LineupList,
    HandicapsInfo,
    TotalGoalsInfo,
    OddsRunningType,
    RequestPlayType,
    EventInfo
} from 'data-center';

interface HandicapType {
    inProgress: Partial<HandicapsInfo>[];
    notStarted: Partial<HandicapsInfo>[];
}

interface TotalGoalsType {
    inProgress: TotalGoalsInfo[];
    notStarted: TotalGoalsInfo[];
}

interface InitState extends GetDetailStatusResponse {
    liveOddsData: OddsRunningType[];
}

interface SituationState extends InitState {
    oddsDeatilDrawerTabValue: RequestPlayType;
    isOddsDetailDrawerOpen: boolean;
    companyId: number;
    setCompanyId: (companyId: number) => void;
    setIsOddsDetailDrawerOpen: (isOpen: boolean) => void;
    setOddsDeatilDrawerTabValue: (tabValue: RequestPlayType) => void;
    setLiveOddsData: (liveOddsData: OddsRunningType[]) => void;
    setEvents: ({ eventList }: { eventList: EventInfo[] }) => void;
    setTechnical: ({ technical }: { technical: TechnicalInfo[] }) => void;
    setNotStartedOdds: (odds: Partial<OddsHashTable>, matchId: number) => void;
    setInprogressOdds: (odds: Partial<OddsRunningHashTable>, matchId: number) => void;
}

let useSituationStore: StoreWithSelectors<SituationState>;

const initialState = (
    set: (updater: (state: SituationState) => Partial<SituationState>) => void
) => ({
    handicapsData: {} as {
        half: Record<
            number,
            {
                inProgress: HandicapsInfo[];
                notStarted: HandicapsInfo[];
            }
        >;
        full: Record<
            number,
            {
                inProgress: HandicapsInfo[];
                notStarted: HandicapsInfo[];
            }
        >;
    },
    totalGoalsData: {} as TotalGoalsDataType,
    eventList: {} as EventInfo[],
    technical: [] as TechnicalInfo[],
    lineupInfo: {} as LineupList,
    liveOddsData: [],
    isOddsDetailDrawerOpen: false,
    oddsDeatilDrawerTabValue: 'HANDICAP' as RequestPlayType,
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
    setOddsDeatilDrawerTabValue: (tabValue: RequestPlayType) => {
        set(state => {
            return { ...state, oddsDeatilDrawerTabValue: tabValue };
        });
    },
    setLiveOddsData: (liveOddsData: OddsRunningType[]) => {
        set(state => {
            return { ...state, liveOddsData };
        });
    },
    setSituationData: ({
        handicapsData,
        totalGoalsData,
        eventList,
        technical,
        lineupInfo
    }: SituationState) => {
        set(state => {
            return {
                ...state,
                handicapsData,
                totalGoalsData,
                eventList,
                technical,
                lineupInfo
            };
        });
    },
    setEvents: ({ eventList }: { eventList: EventInfo[] }) => {
        set(state => {
            return { ...state, eventList };
        });
    },
    setTechnical: ({ technical }: { technical: TechnicalInfo[] }) => {
        set(state => {
            return { ...state, technical };
        });
    },
    // 只針對未開賽的讓球和總進球進行更新
    setNotStartedOdds: (odds: Partial<OddsHashTable>, matchId: number) => {
        const match = odds[matchId];

        set(state => {
            const newHandicapData: HandicapsDataType = { ...state.handicapsData };
            const newTotalGoal: TotalGoalsDataType = { ...state.totalGoalsData };

            if (match) {
                Object.keys(match).forEach(companyId => {
                    const obj = match[companyId];
                    // Handicap全場
                    if (!newHandicapData.full[companyId]) {
                        newHandicapData.full[companyId] = {
                            inProgress: [],
                            notStarted: []
                        } as HandicapType;
                    }

                    const updatedFullOdds = {
                        ...(typeof obj.handicap.homeInitialOdds === 'number' && {
                            homeInitialOdds: truncateFloatingPoint(obj.handicap.homeInitialOdds, 2)
                        }),
                        ...(typeof obj.handicap.initialHandicap === 'number' && {
                            initialHandicap: convertHandicap(obj.handicap.initialHandicap)
                        }),
                        ...(typeof obj.handicap.awayInitialOdds === 'number' && {
                            awayInitialOdds: truncateFloatingPoint(obj.handicap.awayInitialOdds, 2)
                        }),
                        ...(typeof obj.handicap.awayCurrentOdds === 'number' && {
                            awayCurrentOdds: truncateFloatingPoint(obj.handicap.awayCurrentOdds, 2)
                        }),
                        ...(typeof obj.handicap.currentHandicap === 'number' && {
                            currentHandicap: convertHandicap(obj.handicap.currentHandicap)
                        }),
                        ...(typeof obj.handicap.homeCurrentOdds === 'number' && {
                            homeCurrentOdds: truncateFloatingPoint(obj.handicap.homeCurrentOdds, 2)
                        })
                    };

                    newHandicapData.full[Number(companyId)].notStarted = newHandicapData.full[
                        Number(companyId)
                    ].notStarted.map(item => {
                        return { ...item, ...updatedFullOdds };
                    }) as HandicapsInfo[];

                    // Handicap半場
                    if (!newHandicapData.half[companyId]) {
                        newHandicapData.half[companyId] = {
                            inProgress: [],
                            notStarted: []
                        } as HandicapType;
                    }

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

                    newHandicapData.half[Number(companyId)].notStarted = newHandicapData.half[
                        Number(companyId)
                    ].notStarted.map(item => ({
                        ...item,
                        ...updatedHalfOdds
                    })) as HandicapsInfo[];

                    // TotalGoal全場
                    if (!newTotalGoal.full[companyId]) {
                        newTotalGoal.full[companyId] = {
                            inProgress: [],
                            notStarted: []
                        } as TotalGoalsType;
                    }

                    const updatedTotalGoalFullOdds = {
                        ...(typeof obj.overUnder.currentHandicap === 'number' && {
                            currentHandicap: convertHandicap(obj.overUnder.currentHandicap)
                        }),
                        ...(typeof obj.overUnder.initialHandicap === 'number' && {
                            initialHandicap: convertHandicap(obj.overUnder.initialHandicap)
                        }),
                        ...(typeof obj.overUnder.initialOverOdds === 'number' && {
                            overInitialOdds: truncateFloatingPoint(obj.overUnder.initialOverOdds, 2)
                        }),
                        ...(typeof obj.overUnder.initialUnderOdds === 'number' && {
                            underInitialOdds: truncateFloatingPoint(
                                obj.overUnder.initialUnderOdds,
                                2
                            )
                        }),
                        ...(typeof obj.overUnder.currentOverOdds === 'number' && {
                            overCurrentOdds: truncateFloatingPoint(obj.overUnder.currentOverOdds, 2)
                        }),
                        ...(typeof obj.overUnder.currentUnderOdds === 'number' && {
                            underCurrentOdds: truncateFloatingPoint(
                                obj.overUnder.currentUnderOdds,
                                2
                            )
                        })
                    };

                    newTotalGoal.full[Number(companyId)].notStarted = newTotalGoal.full[
                        Number(companyId)
                    ].notStarted.map(item => {
                        return { ...item, ...updatedTotalGoalFullOdds };
                    }) as TotalGoalsInfo[];

                    // TotalGoal半場
                    if (!newTotalGoal.half[companyId]) {
                        newTotalGoal.half[companyId] = {
                            inProgress: [],
                            notStarted: []
                        } as TotalGoalsType;
                    }

                    const updatedTotalGoalHalfOdds = {
                        ...(typeof obj.overUnderHalf.currentHandicap === 'number' && {
                            currentHandicap: convertHandicap(obj.overUnderHalf.currentHandicap)
                        }),
                        ...(typeof obj.overUnderHalf.initialHandicap === 'number' && {
                            initialHandicap: convertHandicap(obj.overUnderHalf.initialHandicap)
                        }),
                        ...(typeof obj.overUnderHalf.initialOverOdds === 'number' && {
                            overInitialOdds: truncateFloatingPoint(
                                obj.overUnderHalf.initialOverOdds,
                                2
                            )
                        }),
                        ...(typeof obj.overUnderHalf.initialUnderOdds === 'number' && {
                            underInitialOdds: truncateFloatingPoint(
                                obj.overUnderHalf.initialUnderOdds,
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

                    newTotalGoal.half[Number(companyId)].notStarted = newTotalGoal.half[
                        Number(companyId)
                    ].notStarted.map(item => {
                        return { ...item, ...updatedTotalGoalHalfOdds };
                    }) as TotalGoalsInfo[];
                });
            }

            return { ...state, handicapsData: newHandicapData, totalGoalsData: newTotalGoal };
        });
    },
    // 只針對已開賽的讓球和總進球進行更新
    setInprogressOdds: (odds: Partial<OddsRunningHashTable>, matchId: number) => {
        const match = odds[matchId];

        set(state => {
            const newHandicapData: HandicapsDataType = { ...state.handicapsData };
            const newTotalGoal: TotalGoalsDataType = { ...state.totalGoalsData };

            if (match) {
                Object.keys(match).forEach(companyId => {
                    const obj = match[Number(companyId)];

                    // Handicap全場
                    if (!newHandicapData.full[companyId]) {
                        newHandicapData.full[companyId] = {
                            inProgress: [],
                            notStarted: []
                        } as HandicapType;
                    }

                    const updatedFullOdds = {
                        ...(typeof obj.handicap?.homeCurrentOdds === 'number' && {
                            homeCurrentOdds: obj.handicap.homeCurrentOdds
                        }),
                        ...(typeof obj.handicap?.awayCurrentOdds === 'number' && {
                            awayCurrentOdds: obj.handicap.awayCurrentOdds
                        }),
                        ...(typeof obj.handicap?.currentHandicap === 'number' && {
                            currentHandicap: obj.handicap.currentHandicap.toString()
                        }),
                        ...(typeof obj.handicap?.time === 'string' && {
                            time: obj.handicap.time
                        }),
                        ...(typeof obj.handicap?.homeScore === 'number' && {
                            homeScore: obj.handicap.homeScore
                        }),
                        ...(typeof obj.handicap?.awayScore === 'number' && {
                            awayScore: obj.handicap.awayScore
                        }),
                        ...(typeof obj.handicap?.isClosed === 'boolean' && {
                            isClosed: obj.handicap.isClosed
                        }),
                        ...(typeof obj.handicap?.modifytime === 'number' && {
                            oddsChangeTime: obj.handicap.modifytime
                        }),
                        ...(typeof obj.handicap?.currentHandicap === 'number' &&
                            !newHandicapData.full[Number(companyId)].inProgress.length && {
                                initialHandicap: obj.handicap.currentHandicap.toString()
                            }),
                        ...(typeof obj.handicap?.homeCurrentOdds === 'number' &&
                            !newHandicapData.full[Number(companyId)].inProgress.length && {
                                homeInitialOdds: obj.handicap.homeCurrentOdds
                            }),
                        ...(typeof obj.handicap?.awayCurrentOdds === 'number' &&
                            !newHandicapData.full[Number(companyId)].inProgress.length && {
                                awayInitialOdds: obj.handicap.awayCurrentOdds
                            })
                    };

                    if (
                        !newHandicapData.full[Number(companyId)].inProgress.length &&
                        Object.keys(updatedFullOdds).length
                    ) {
                        newHandicapData.full[Number(companyId)].inProgress.push({
                            matchId,
                            companyId: Number(companyId),
                            oddsType: 3,
                            state: 1,
                            homeScore: 0,
                            awayScore: 0,
                            isClosed: false,
                            oddsChangeTime: 0,
                            initialHandicap: '-',
                            homeInitialOdds: 0,
                            awayInitialOdds: 0,
                            homeCurrentOdds: 0,
                            awayCurrentOdds: 0,
                            currentHandicap: '-',
                            time: '-',
                            ...updatedFullOdds
                        }) as unknown as HandicapsInfo[];
                    } else {
                        newHandicapData.full[Number(companyId)].inProgress = newHandicapData.full[
                            Number(companyId)
                        ].inProgress.map(item => {
                            return { ...item, ...updatedFullOdds };
                        }) as unknown as HandicapsInfo[];
                    }

                    if (!newHandicapData.half[companyId]) {
                        newHandicapData.half[companyId] = {
                            inProgress: [],
                            notStarted: []
                        } as HandicapType;
                    }

                    const updatedHalfOdds = {
                        ...(typeof obj.handicapHalf?.homeCurrentOdds === 'number' && {
                            homeCurrentOdds: obj.handicapHalf.homeCurrentOdds
                        }),
                        ...(typeof obj.handicapHalf?.awayCurrentOdds === 'number' && {
                            awayCurrentOdds: obj.handicapHalf.awayCurrentOdds
                        }),
                        ...(typeof obj.handicapHalf?.currentHandicap === 'number' && {
                            currentHandicap: obj.handicapHalf.currentHandicap.toString()
                        }),
                        ...(typeof obj.handicapHalf?.time === 'string' && {
                            time: obj.handicapHalf.time
                        }),
                        ...(typeof obj.handicapHalf?.homeScore === 'number' && {
                            homeScore: obj.handicapHalf.homeScore
                        }),
                        ...(typeof obj.handicapHalf?.awayScore === 'number' && {
                            awayScore: obj.handicapHalf.awayScore
                        }),
                        ...(typeof obj.handicapHalf?.isClosed === 'boolean' && {
                            isClosed: obj.handicapHalf.isClosed
                        }),
                        ...(typeof obj.handicapHalf?.modifytime === 'number' && {
                            oddsChangeTime: obj.handicapHalf.modifytime
                        }),
                        ...(typeof obj.handicapHalf?.currentHandicap === 'number' &&
                            !newHandicapData.full[Number(companyId)].inProgress.length && {
                                initialHandicap: obj.handicapHalf.currentHandicap.toString()
                            }),
                        ...(typeof obj.handicapHalf?.homeCurrentOdds === 'number' &&
                            !newHandicapData.full[Number(companyId)].inProgress.length && {
                                homeInitialOdds: obj.handicapHalf.homeCurrentOdds
                            }),
                        ...(typeof obj.handicapHalf?.awayCurrentOdds === 'number' &&
                            !newHandicapData.full[Number(companyId)].inProgress.length && {
                                awayInitialOdds: obj.handicapHalf.awayCurrentOdds
                            })
                    };

                    if (
                        !newHandicapData.half[Number(companyId)].inProgress.length &&
                        Object.keys(updatedHalfOdds).length
                    ) {
                        newHandicapData.half[Number(companyId)].inProgress.push({
                            matchId,
                            companyId: Number(companyId),
                            oddsType: 3,
                            state: 1,
                            homeScore: 0,
                            awayScore: 0,
                            isClosed: false,
                            oddsChangeTime: 0,
                            initialHandicap: '-',
                            homeInitialOdds: 0,
                            awayInitialOdds: 0,
                            homeCurrentOdds: 0,
                            awayCurrentOdds: 0,
                            currentHandicap: '-',
                            time: '-',
                            ...updatedFullOdds
                        }) as unknown as HandicapsInfo[];
                    } else {
                        newHandicapData.half[Number(companyId)].inProgress = newHandicapData.half[
                            Number(companyId)
                        ].inProgress.map(item => {
                            return { ...item, ...updatedHalfOdds };
                        }) as unknown as HandicapsInfo[];
                    }

                    // TotalGoal全場
                    if (!newTotalGoal.full[companyId]) {
                        newTotalGoal.full[companyId] = {
                            inProgress: [],
                            notStarted: []
                        } as TotalGoalsType;
                    }

                    const updatedTotalGoalFullOdds = {
                        ...(typeof obj.overUnder?.currentHandicap === 'number' && {
                            currentHandicap: obj.overUnder.currentHandicap.toString()
                        }),
                        ...(typeof obj.overUnder?.currentOverOdds === 'number' && {
                            overCurrentOdds: obj.overUnder.currentOverOdds
                        }),
                        ...(typeof obj.overUnder?.currentUnderOdds === 'number' && {
                            underCurrentOdds: obj.overUnder.currentUnderOdds
                        }),
                        ...(typeof obj.overUnder?.time === 'string' && {
                            time: obj.overUnder.time
                        }),
                        ...(typeof obj.overUnder?.homeScore === 'number' && {
                            homeScore: obj.overUnder.homeScore
                        }),
                        ...(typeof obj.overUnder?.awayScore === 'number' && {
                            awayScore: obj.overUnder.awayScore
                        }),
                        ...(typeof obj.overUnder?.isClosed === 'boolean' && {
                            isClosed: obj.overUnder.isClosed
                        }),
                        ...(typeof obj.overUnder?.currentHandicap === 'number' &&
                            !newTotalGoal.full[Number(companyId)].inProgress.length && {
                                initialHandicap: obj.overUnder.currentHandicap.toString()
                            }),
                        ...(typeof obj.overUnder?.currentOverOdds === 'number' &&
                            !newTotalGoal.full[Number(companyId)].inProgress.length && {
                                overInitialOdds: obj.overUnder.currentOverOdds
                            }),
                        ...(typeof obj.overUnder?.currentUnderOdds === 'number' &&
                            !newTotalGoal.full[Number(companyId)].inProgress.length && {
                                underInitialOdds: obj.overUnder.currentUnderOdds
                            })
                    };

                    if (
                        !newTotalGoal.full[Number(companyId)].inProgress.length &&
                        Object.keys(updatedTotalGoalFullOdds).length
                    ) {
                        newTotalGoal.full[Number(companyId)].inProgress.push({
                            overInitialOdds: 0,
                            underInitialOdds: 0,
                            currentHandicap: '0',
                            overCurrentOdds: 0,
                            underCurrentOdds: 0,
                            oddsChangeTime: 0,
                            oddsType: 3,
                            state: 1,
                            homeScore: 0,
                            awayScore: 0,
                            isClosed: false,
                            matchId,
                            time: '-',
                            companyId: Number(companyId),
                            initialHandicap: '0',
                            ...updatedTotalGoalFullOdds
                        }) as unknown as TotalGoalsInfo[];
                    } else {
                        newTotalGoal.full[Number(companyId)].inProgress = newTotalGoal.full[
                            Number(companyId)
                        ].inProgress.map(item => {
                            return { ...item, ...updatedTotalGoalFullOdds };
                        }) as unknown as TotalGoalsInfo[];
                    }

                    // TotalGoal半場
                    if (!newTotalGoal.half[companyId]) {
                        newTotalGoal.half[companyId] = {
                            inProgress: [],
                            notStarted: []
                        } as TotalGoalsType;
                    }

                    const updatedTotalGoalHalfOdds = {
                        ...(typeof obj.overUnderHalf?.currentHandicap === 'number' && {
                            currentHandicap: obj.overUnderHalf.currentHandicap.toString()
                        }),
                        ...(typeof obj.overUnderHalf?.currentOverOdds === 'number' && {
                            overCurrentOdds: obj.overUnderHalf.currentOverOdds
                        }),
                        ...(typeof obj.overUnderHalf?.currentUnderOdds === 'number' && {
                            underCurrentOdds: obj.overUnderHalf.currentUnderOdds
                        }),
                        ...(typeof obj.overUnderHalf?.time === 'string' && {
                            time: obj.overUnderHalf.time
                        }),
                        ...(typeof obj.overUnderHalf?.homeScore === 'number' && {
                            homeScore: obj.overUnderHalf.homeScore
                        }),
                        ...(typeof obj.overUnderHalf?.awayScore === 'number' && {
                            awayScore: obj.overUnderHalf.awayScore
                        }),
                        ...(typeof obj.overUnderHalf?.isClosed === 'boolean' && {
                            isClosed: obj.overUnderHalf.isClosed
                        }),
                        ...(typeof obj.overUnderHalf?.currentHandicap === 'number' &&
                            !newTotalGoal.half[Number(companyId)].inProgress.length && {
                                initialHandicap: obj.overUnderHalf.currentHandicap.toString()
                            }),
                        ...(typeof obj.overUnderHalf?.currentOverOdds === 'number' &&
                            !newTotalGoal.half[Number(companyId)].inProgress.length && {
                                overInitialOdds: obj.overUnderHalf.currentOverOdds
                            }),
                        ...(typeof obj.overUnderHalf?.currentUnderOdds === 'number' &&
                            !newTotalGoal.half[Number(companyId)].inProgress.length && {
                                underInitialOdds: obj.overUnderHalf.currentUnderOdds
                            }),
                        ...(typeof obj.overUnderHalf?.modifytime === 'number' &&
                            !newTotalGoal.half[Number(companyId)].inProgress.length && {
                                oddsChangeTime: obj.overUnderHalf.modifytime
                            })
                    };

                    if (
                        !newTotalGoal.half[Number(companyId)].inProgress.length &&
                        Object.keys(updatedTotalGoalHalfOdds).length
                    ) {
                        newTotalGoal.half[Number(companyId)].inProgress.push({
                            overInitialOdds: 0,
                            underInitialOdds: 0,
                            currentHandicap: '-',
                            overCurrentOdds: 0,
                            underCurrentOdds: 0,
                            oddsChangeTime: 0,
                            oddsType: 3,
                            state: 1,
                            homeScore: 0,
                            awayScore: 0,
                            isClosed: false,
                            matchId,
                            companyId: Number(companyId),
                            initialHandicap: '-',
                            time: '-',
                            ...updatedTotalGoalHalfOdds
                        }) as unknown as TotalGoalsInfo[];
                    } else {
                        newTotalGoal.half[Number(companyId)].inProgress = newTotalGoal.half[
                            Number(companyId)
                        ].inProgress.map(item => {
                            return { ...item, ...updatedTotalGoalHalfOdds };
                        }) as unknown as TotalGoalsInfo[];
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

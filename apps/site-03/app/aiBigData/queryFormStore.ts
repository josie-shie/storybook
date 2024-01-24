import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ReactNode } from 'react';
import dayjs from 'dayjs';

interface Option {
    label: string;
    value: string;
}

interface InitState {
    loading: boolean;
}

export type PlayTypeCheckBox = 'handicap' | 'overUnder';
interface QueryFormState extends InitState {
    setLoading: (loading: boolean) => void;
    dialogContentType: string;
    dialogContent: ReactNode;
    isOpenPayDrawer: boolean;
    setIsOpenPayDrawer: (isOpenPayDrawer: boolean) => void;
    openNoramlDialog: boolean;
    setDialogContentType: (dialogContentType: string) => void;
    setOpenNormalDialog: (openNoramlDialog: boolean) => void;
    setDialogContent: (dialogContent: ReactNode) => void;
    timeRange: string;
    setTimeRange: (timeRange: string) => void;
    analysisError: string;
    setAnalysisError: (analysisError: string) => void;
    startDate: string;
    setStartDate: (startDate: string) => void;
    endDate: string;
    setEndDate: (endDate: string) => void;
    teamSelected: string[];
    setTeamSelected: (teamSelected: string) => void;
    teamHandicapOdds: string;
    setTeamHandicapOdds: (teamHandicapOdds: string) => void;
    handicapOddsSelected: string;
    setHandicapOddsSelected: (handicapOddsSelected: string) => void;
    teamList: Option[];
    handicapNumberList: Option[];
    overUnderNumberList: Option[];
    dateList: Option[];
    openTips: boolean;
    setOpenTips: (openTips: boolean) => void;
    isTipsOpened: boolean;
    setIsTipsOpened: (isTipsOpened: boolean) => void;
    checkboxState: Record<PlayTypeCheckBox, boolean>;
    setCheckboxState: (keyName: PlayTypeCheckBox, checked: boolean) => void;
    isAnalysisBySearch: boolean;
    setIsAnalysisBySearch: (isAnalysisBySearch: boolean) => void;
}

let useQueryFormStore: StoreWithSelectors<QueryFormState>;

const initialState = (
    set: (updater: (state: QueryFormState) => Partial<QueryFormState>) => void
) => ({
    showRecord: false,
    setShowRecord: (showRecord: boolean) => {
        set(state => {
            return { ...state, showRecord };
        });
    },
    timeRange: '',
    setTimeRange: (timeRange: string) => {
        set(state => {
            return { ...state, timeRange };
        });
    },
    analysisError: '',
    setAnalysisError: (analysisError: string) => {
        set(state => {
            return { ...state, analysisError };
        });
    },
    startDate: dayjs().subtract(7, 'day').format('YYYY-M-D'),
    setStartDate: (startDate: string) => {
        set(state => {
            return { ...state, startDate };
        });
    },
    endDate: dayjs().subtract(1, 'day').format('YYYY-M-D'),
    setEndDate: (endDate: string) => {
        set(state => {
            return { ...state, endDate };
        });
    },
    teamSelected: ['home'],
    setTeamSelected: (teamSelected: string) => {
        set(state => {
            let newTeamSelected = [...state.teamSelected];
            if (newTeamSelected.includes(teamSelected)) {
                newTeamSelected = newTeamSelected.filter(item => item !== teamSelected);
                if (newTeamSelected.length <= 0) {
                    newTeamSelected.push(teamSelected);
                }
            } else {
                newTeamSelected.push(teamSelected);
            }

            return {
                ...state,
                teamSelected: newTeamSelected
            };
        });
    },

    teamHandicapOdds: '0.5',
    setTeamHandicapOdds: (teamHandicapOdds: string) => {
        set(state => {
            return { ...state, teamHandicapOdds };
        });
    },
    handicapOddsSelected: '2.5',
    setHandicapOddsSelected: (handicapOddsSelected: string) => {
        set(state => {
            return { ...state, handicapOddsSelected };
        });
    },
    isOpenPayDrawer: false,
    setIsOpenPayDrawer: (isOpenPayDrawer: boolean) => {
        set(state => {
            return { ...state, isOpenPayDrawer };
        });
    },
    dialogContentType: 'payment',
    openNoramlDialog: false,
    dialogContent: null,
    setOpenNormalDialog: (openNoramlDialog: boolean) => {
        set(state => {
            return { ...state, openNoramlDialog };
        });
    },
    setDialogContentType: (dialogContentType: string) => {
        set(state => {
            return { ...state, dialogContentType };
        });
    },
    setDialogContent: (dialogContent: ReactNode) => {
        set(state => {
            return { ...state, dialogContent };
        });
    },
    loading: false,
    setLoading: (loading: boolean) => {
        set(state => {
            return {
                ...state,
                loading
            };
        });
    },
    teamList: [
        {
            label: '主',
            value: 'home'
        },
        {
            label: '客',
            value: 'away'
        },
        {
            label: '全部',
            value: ''
        }
    ],
    handicapNumberList: [
        {
            label: '0',
            value: '0'
        },
        {
            label: '0/0.5',
            value: '0.25'
        },
        {
            label: '0.5',
            value: '0.5'
        },
        {
            label: '0.5/1',
            value: '0.75'
        },
        {
            label: '1',
            value: '1'
        },
        {
            label: '1/1.5',
            value: '1.25'
        },
        {
            label: '1.5',
            value: '1.5'
        },
        {
            label: '1.5/2',
            value: '1.75'
        },
        {
            label: '2',
            value: '2'
        },
        {
            label: '2/2.5',
            value: '2.25'
        },
        {
            label: '2.5',
            value: '2.5'
        },
        {
            label: '2.5+',
            value: '2.5+'
        }
    ],
    overUnderNumberList: [
        {
            label: '2',
            value: '2'
        },
        {
            label: '2/2.5',
            value: '2.25'
        },
        {
            label: '2.5',
            value: '2.5'
        },
        {
            label: '2.5/3',
            value: '2.75'
        },
        {
            label: '3',
            value: '3'
        },
        {
            label: '3/3.5',
            value: '3.25'
        },
        {
            label: '3.5',
            value: '3.5'
        },
        {
            label: '3.5/4',
            value: '3.75'
        },
        {
            label: '4',
            value: '4'
        },
        {
            label: '4+',
            value: '4+'
        }
    ],
    dateList: [
        {
            label: '最近一週',
            value: 'week'
        },
        {
            label: '最近一月',
            value: 'month'
        },
        {
            label: '最近一季',
            value: 'season'
        },
        {
            label: '選擇時間區間',
            value: 'setRange'
        }
    ],
    openTips: false,
    setOpenTips: (openTips: boolean) => {
        set(state => {
            return {
                ...state,
                openTips
            };
        });
    },
    isTipsOpened: false,
    setIsTipsOpened: (isTipsOpened: boolean) => {
        set(state => {
            return {
                ...state,
                isTipsOpened
            };
        });
    },
    checkboxState: {
        handicap: true,
        overUnder: true
    },
    setCheckboxState: (keyName: PlayTypeCheckBox, checked: boolean) => {
        set(state => {
            const isEveryOtherUnchecked = Object.entries(state.checkboxState).every(
                ([key, value]) => key === keyName || !value
            );

            if (!checked && isEveryOtherUnchecked) {
                return state;
            }

            return {
                ...state,
                checkboxState: {
                    ...state.checkboxState,
                    [keyName]: checked
                }
            };
        });
    },
    isAnalysisBySearch: false,
    setIsAnalysisBySearch: (isAnalysisBySearch: boolean) => {
        set(state => {
            return {
                ...state,
                isAnalysisBySearch
            };
        });
    }
});

const creatQueryFormStore = (init: InitState) =>
    (useQueryFormStore = initStore<QueryFormState>(initialState, init));

export { creatQueryFormStore, useQueryFormStore };

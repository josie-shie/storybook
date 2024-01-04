import dayjs from 'dayjs';
import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ReactNode } from 'react';

interface Option {
    label: string;
    value: string;
}

interface AnalysisRecord {
    memberId: number;
    ticketId: string;
    handicapSide: string;
    handicapValues: string;
    overUnderValues: string;
    startTime: number;
    endTime: number;
    analyTime: number;
    isCompleted: boolean;
}

interface InitState {
    recordList: AnalysisRecord[];
}

type PlayTypeCheckBox = 'handicap' | 'overUnder';

interface HandicapAnalysisFormState extends InitState {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    dialogContentType: string;
    dialogContent: ReactNode;
    openNoramlDialog: boolean;
    setDialogContentType: (dialogContentType: string) => void;
    setOpenNormalDialog: (openNoramlDialog: boolean) => void;
    setDialogContent: (dialogContent: ReactNode) => void;
    setRecordList: (recordList: AnalysisRecord[]) => void;
    updateRecord: (recordId: string, missionType: string) => void;
    showRecord: boolean;
    setShowRecord: (showRecord: boolean) => void;
    openDatePicker: boolean;
    setOpenDatePicker: (openDatePicker: boolean) => void;
    timeRange: string;
    setTimeRange: (timeRange: string) => void;
    analysisError: string;
    setAnalysisError: (analysisError: string) => void;
    startDate: number;
    setStartDate: (startDate: number) => void;
    endDate: number;
    setEndDate: (endDate: number) => void;
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

let useHandicapAnalysisFormStore: StoreWithSelectors<HandicapAnalysisFormState>;

const initialState = (
    set: (updater: (state: HandicapAnalysisFormState) => Partial<HandicapAnalysisFormState>) => void
) => ({
    showRecord: false,
    setShowRecord: (showRecord: boolean) => {
        set(state => {
            return { ...state, showRecord };
        });
    },
    openDatePicker: false,
    setOpenDatePicker: (openDatePicker: boolean) => {
        set(state => {
            return { ...state, openDatePicker };
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
    startDate: Math.floor(dayjs().subtract(7, 'day').toDate().getTime() / 1000),
    setStartDate: (startDate: number) => {
        set(state => {
            return { ...state, startDate };
        });
    },
    endDate: Math.floor(dayjs().subtract(1, 'day').toDate().getTime() / 1000),
    setEndDate: (endDate: number) => {
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
    recordList: [],
    setRecordList: (recordList: AnalysisRecord[]) => {
        set(state => {
            return { ...state, recordList };
        });
    },
    updateRecord: (recordId: string, missionType: string) => {
        set(prevState => {
            const updatedRecordList = prevState.recordList.map(record => {
                if (record.ticketId === recordId) {
                    return { ...record, isCompleted: missionType === 'done' };
                }
                return record;
            });

            return { ...prevState, recordList: updatedRecordList };
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

const creatHandicapAnalysisStore = (init: InitState) =>
    (useHandicapAnalysisFormStore = initStore<HandicapAnalysisFormState>(initialState, init));

export { creatHandicapAnalysisStore, useHandicapAnalysisFormStore };

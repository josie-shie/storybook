import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Option {
    label: string;
    value: string;
}

interface Record {
    recordId: number;
    recordTime: number;
    handicap: string;
    odds: string;
    overUnder: string;
    startDate: number;
    endDate: number;
    state: number;
}

interface InitState {
    recordList: Record[];
}

interface HandicapAnalysisFormState extends InitState {
    setRecordList: (recordList: Record[]) => void;
    updateRecord: (recordId: number) => void;
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
    teamSelected: string;
    setTeamSelected: (teamSelected: string) => void;
    teamHandicapOdds: string;
    setTeamHandicapOdds: (teamHandicapOdds: string) => void;
    handicapOddsSelected: string;
    setHandicapOddsSelected: (handicapOddsSelected: string) => void;
    teamList: Option[];
    handicapNumberList: Option[];
    overUnderNumberList: Option[];
    dateList: Option[];
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
    startDate: 0,
    setStartDate: (startDate: number) => {
        set(state => {
            return { ...state, startDate };
        });
    },
    endDate: 0,
    setEndDate: (endDate: number) => {
        set(state => {
            return { ...state, endDate };
        });
    },
    teamSelected: '',
    setTeamSelected: (teamSelected: string) => {
        set(state => {
            return { ...state, teamSelected };
        });
    },
    teamHandicapOdds: '',
    setTeamHandicapOdds: (teamHandicapOdds: string) => {
        set(state => {
            return { ...state, teamHandicapOdds };
        });
    },
    handicapOddsSelected: '',
    setHandicapOddsSelected: (handicapOddsSelected: string) => {
        set(state => {
            return { ...state, handicapOddsSelected };
        });
    },
    recordList: [],
    setRecordList: (recordList: Record[]) => {
        set(state => {
            return { ...state, recordList };
        });
    },
    updateRecord: (recordId: number) => {
        set(prevState => {
            const updatedRecordList = prevState.recordList.map(record => {
                if (record.recordId === recordId) {
                    return { ...record, state: 1 };
                }
                return record;
            });

            return { ...prevState, recordList: updatedRecordList };
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
    ]
});

const creatHandicapAnalysisStore = (init: InitState) =>
    (useHandicapAnalysisFormStore = initStore<HandicapAnalysisFormState>(initialState, init));

export { creatHandicapAnalysisStore, useHandicapAnalysisFormStore };

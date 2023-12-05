import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

type OddsResultType = '赢' | '输' | '大' | '小';

interface HandicapTipType {
    startTime: number;
    matchId: number;
    countryCn: string;
    leagueId: number;
    leagueChsShort: string;
    homeId: number;
    homeChs: string;
    awayId: number;
    awayChs: string;
    teamId: number;
    teamChs: string; // 哪一隊連
    oddsResult: OddsResultType; // 輸、贏、大、小
    longOddsTimes: number; // n場
    isFamous: boolean; // 是否熱門賽事
    leagueLevel: number;
}

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
    handicapTips: HandicapTipType[];
    recordList: Record[];
}

interface DiscSelectState extends InitState {
    setHandicapTips: (handicapTips: HandicapTipType[]) => void;
    teamList: Option[];
    handicapNumberList: Option[];
    overUnderNumberList: Option[];
    dateList: Option[];
    playList: Option[];
    hintsSelected: string;
    setHintsSelected: (hintsSelected: string) => void;
    timeAscending: boolean;
    setTimeAscending: (timeAscending: boolean) => void;
    handicapAscending: boolean;
    setHandicapAscending: (handicapAscending: boolean) => void;
    setRecordList: (recordList: Record[]) => void;
}

let useDiscSelectStore: StoreWithSelectors<DiscSelectState>;

const initialState = (set: (data: Partial<DiscSelectState>) => void) => ({
    handicapTips: [],
    setHandicapTips: (handicapTips: HandicapTipType[]) => {
        set({ handicapTips });
    },
    hintsSelected: '',
    setHintsSelected: (hintsSelected: string) => {
        set({ hintsSelected });
    },
    timeAscending: false,
    setTimeAscending: (timeAscending: boolean) => {
        set({ timeAscending });
    },
    handicapAscending: false,
    setHandicapAscending: (handicapAscending: boolean) => {
        set({ handicapAscending });
    },
    recordList: [],
    setRecordList: (recordList: Record[]) => {
        set({ recordList });
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
        }
    ],
    playList: [
        {
            label: '全場大小球',
            value: 'OVERUNDER'
        },
        {
            label: '半場大小球',
            value: 'OVERUNDERHALF'
        },
        {
            label: '全場讓球',
            value: 'HANDICAP'
        },
        {
            label: '半場讓球',
            value: 'HANDICAPHALF'
        }
    ]
});

const creatDiscSelectStore = (init: InitState) =>
    (useDiscSelectStore = initStore<DiscSelectState>(initialState, init));

export { creatDiscSelectStore, useDiscSelectStore };

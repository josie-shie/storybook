import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { FormatRecordDataResponse } from 'data-center';
import type {
    BattleRecord,
    WinLoseResultProps,
    OddsDetailResultProps,
    GameAmountProps,
    GameTypeProps,
    GameCompanyProps,
    GameHandicapProps,
    GameTimeProps
} from '@/types/analyze';

const DefaultCompany = 'crown';
const DefaultHandicap = 'current';
const DefaultTime = 'full';
const DefaultAmount = 10;
const DefaultGameType = '2';

interface InitState {
    homeRecordData: FormatRecordDataResponse;
}

interface HomeRecordState extends InitState {
    list: BattleRecord[];
    contestAmount: GameAmountProps;
    contestType: GameTypeProps;
    contestCompany: GameCompanyProps;
    contestHandicap: GameHandicapProps;
    contestTime: GameTimeProps;
    gameIsHome: boolean;
    winLoseResult: WinLoseResultProps;
    oddsDetailResult: OddsDetailResultProps;
    setList: (list: BattleRecord[]) => void;
    setContestAmount: (contestAmount: GameAmountProps) => void;
    setContestType: (contestType: GameTypeProps) => void;
    setContestCompany: (contestCompany: GameCompanyProps) => void;
    setContestHandicap: (contestHandicap: GameHandicapProps) => void;
    setContestTime: (contestTime: GameTimeProps) => void;
    setGameIsHome: (gameIsHome: boolean) => void;
    setWinLoseResult: (winLoseResult: WinLoseResultProps) => void;
    setOddsDetailResult: (oddsDetailResult: OddsDetailResultProps) => void;
}

let useHomeRecordStore: StoreWithSelectors<HomeRecordState>;

const initialState = (set: (data: Partial<HomeRecordState>) => void) => ({
    homeRecordData: {} as FormatRecordDataResponse,
    list: [],
    contestAmount: DefaultAmount as GameAmountProps,
    contestType: DefaultGameType as GameTypeProps,
    contestCompany: DefaultCompany as GameCompanyProps,
    contestHandicap: DefaultHandicap as GameHandicapProps,
    contestTime: DefaultTime as GameTimeProps,
    gameIsHome: false,
    winLoseResult: {} as WinLoseResultProps,
    oddsDetailResult: {} as OddsDetailResultProps,
    setHomeRecordData: (homeRecordData: FormatRecordDataResponse) => {
        set({ homeRecordData });
    },
    setList: (list: BattleRecord[]) => {
        set({ list });
    },
    setContestAmount: (contestAmount: GameAmountProps) => {
        set({ contestAmount });
    },
    setContestType: (contestType: GameTypeProps) => {
        set({ contestType });
    },
    setContestCompany: (contestCompany: GameCompanyProps) => {
        set({ contestCompany });
    },
    setContestHandicap: (contestHandicap: GameHandicapProps) => {
        set({ contestHandicap });
    },
    setContestTime: (contestTime: GameTimeProps) => {
        set({ contestTime });
    },
    setGameIsHome: (gameIsHome: boolean) => {
        set({ gameIsHome });
    },
    setWinLoseResult: (winLoseResult: WinLoseResultProps) => {
        set({ winLoseResult });
    },
    setOddsDetailResult: (oddsDetailResult: OddsDetailResultProps) => {
        set({ oddsDetailResult });
    }
});

const createHomeRecordStore = (init: InitState) =>
    (useHomeRecordStore = initStore<HomeRecordState>(initialState, init));

export { createHomeRecordStore, useHomeRecordStore };

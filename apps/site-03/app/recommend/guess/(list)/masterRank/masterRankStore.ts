import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GuessRank } from 'data-center';

interface InitState {
    masterRankList: GuessRank[];
}

interface MasterRankState extends InitState {
    member: GuessRank;
    onlyShowToday: boolean;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setMember: (member: GuessRank) => void;
    setMasterRankList: (masterRankList: GuessRank[]) => void;
    setOnlyShowToday: (show: boolean) => void;
}

let useMasterRankStore: StoreWithSelectors<MasterRankState>;

const initialState = (set: (data: Partial<MasterRankState>) => void) => ({
    member: {
        memberId: 0,
        memberName: '-',
        memberLevel: 0,
        memberAvatar: '',
        ranking: 0,
        today: false,
        totalMatches: 0,
        totalWin: 0,
        totalLose: 0,
        hitRate: 0,
        currentMaxWinStreak: 0,
        historyMaxWinStreak: 0
    },
    masterRankList: [],
    onlyShowToday: false,
    isLoading: false,
    setMember: (member: GuessRank) => {
        set({ member });
    },
    setMasterRankList: (masterRankList: GuessRank[]) => {
        set({ masterRankList });
    },
    setOnlyShowToday: (show: boolean) => {
        set({ onlyShowToday: show });
    },
    setIsLoading: (isLoading: boolean) => {
        set({ isLoading });
    }
});

const creatMasterRankStore = (init: InitState) =>
    (useMasterRankStore = initStore<MasterRankState>(initialState, init));

export { creatMasterRankStore, useMasterRankStore };

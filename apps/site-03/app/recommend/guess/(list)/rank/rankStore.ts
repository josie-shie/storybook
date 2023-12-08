import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GuessRank } from 'data-center';

interface InitState {
    onlyShowToday: boolean;
    rankList: GuessRank[];
    member: GuessRank;
}

interface RankState extends InitState {
    setMember: (member: GuessRank) => void;
    setRankList: (rankList: GuessRank[]) => void;
    setOnlyShowToday: (show: boolean) => void;
}

let useRankStore: StoreWithSelectors<RankState>;

const initialState = (set: (data: Partial<RankState>) => void) => ({
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
    rankList: [],
    onlyShowToday: true,
    setMember: (member: GuessRank) => {
        set({ member });
    },
    setRankList: (rankList: GuessRank[]) => {
        set({ rankList });
    },
    setOnlyShowToday: (show: boolean) => {
        set({ onlyShowToday: show });
    }
});

const creatRankStore = (init: InitState) =>
    (useRankStore = initStore<RankState>(initialState, init));

export { creatRankStore, useRankStore };

import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GuessRank } from 'data-center';

interface InitState {
    weekRankList: GuessRank[];
    monthRankList: GuessRank[];
    seasonRankList: GuessRank[];
    masterRankList: GuessRank[];
}

interface RankState extends InitState {
    onlyShowToday: boolean;
    weekMemberInfo: GuessRank;
    monthMemberInfo: GuessRank;
    seasonMemberInfo: GuessRank;
    memberMasterRank: GuessRank;
    setOnlyShowToday: (show: boolean) => void;
    setWeekMemberInfo: (memberInfo: GuessRank) => void;
    setMonthMemberInfo: (memberInfo: GuessRank) => void;
    setSeasonMemberInfo: (memberInfo: GuessRank) => void;
    setMemberMasterRank: (memberInfo: GuessRank) => void;
    setWeekRankList: (rankList: GuessRank[]) => void;
    setMonthRankList: (rankList: GuessRank[]) => void;
    setSeasonRankList: (rankList: GuessRank[]) => void;
    setMasterRankList: (rankList: GuessRank[]) => void;
}

let useRankStore: StoreWithSelectors<RankState>;

const defaultMemberInfo = {
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
};

const initialState = (set: (data: Partial<RankState>) => void) => ({
    onlyShowToday: false,
    weekMemberInfo: { ...defaultMemberInfo },
    monthMemberInfo: { ...defaultMemberInfo },
    seasonMemberInfo: { ...defaultMemberInfo },
    memberMasterRank: { ...defaultMemberInfo },
    weekRankList: [],
    monthRankList: [],
    seasonRankList: [],
    masterRankList: [],
    setOnlyShowToday: (show: boolean) => {
        set({ onlyShowToday: show });
    },
    setWeekMemberInfo: (memberInfo: GuessRank) => {
        set({ weekMemberInfo: memberInfo });
    },
    setMonthMemberInfo: (memberInfo: GuessRank) => {
        set({ monthMemberInfo: memberInfo });
    },
    setSeasonMemberInfo: (memberInfo: GuessRank) => {
        set({ seasonMemberInfo: memberInfo });
    },
    setMemberMasterRank: (memberInfo: GuessRank) => {
        set({ memberMasterRank: memberInfo });
    },
    setWeekRankList: (rankList: GuessRank[]) => {
        set({ weekRankList: rankList });
    },
    setMonthRankList: (rankList: GuessRank[]) => {
        set({ monthRankList: rankList });
    },
    setSeasonRankList: (rankList: GuessRank[]) => {
        set({ seasonRankList: rankList });
    },
    setMasterRankList: (rankList: GuessRank[]) => {
        set({ masterRankList: rankList });
    }
});

const creatRankStore = (init: InitState) =>
    (useRankStore = initStore<RankState>(initialState, init));

export { creatRankStore, useRankStore };

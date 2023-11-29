import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface PointsItem {
    id: number;
    ranking: number;
    label: number | null;
    name: string;
    total: number;
    wins: number;
    draws: number;
    losses: number;
    scored: number;
    against: number;
    matches: number;
}

interface InitState {
    pointsList: PointsItem[];
}

interface DataState extends InitState {
    setPointsList: (pointsList: PointsItem[]) => void;
}

let useDataStore: StoreWithSelectors<DataState>;

const initialState = (set: (data: Partial<DataState>) => void) => ({
    pointsList: [],
    setPointsList: (pointsList: PointsItem[]) => {
        set({ pointsList });
    }
});

const creatDataStore = (init: InitState) =>
    (useDataStore = initStore<DataState>(initialState, init));

export { creatDataStore, useDataStore };

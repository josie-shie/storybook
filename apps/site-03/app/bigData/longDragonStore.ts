import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    hintsSelectPlay: string;
    hintsSelectType: string;
    hintsSelectProgres: string;
}

interface LongDragonState extends InitState {
    setHintsSelectPlay: (hintsSelectPlay: string) => void;
    setHintsSelectType: (hintsSelectType: string) => void;
    setHintsSelectProgres: (hintsSelectProgres: string) => void;
}

let useLongDragonStore: StoreWithSelectors<LongDragonState>;

const initialState = (
    set: (updater: (state: LongDragonState) => Partial<LongDragonState>) => void
) => ({
    hintsSelectPlay: '',
    setHintsSelectPlay: (hintsSelectPlay: string) => {
        set(state => {
            return { ...state, hintsSelectPlay };
        });
    },
    hintsSelectType: '',
    setHintsSelectType: (hintsSelectType: string) => {
        set(state => {
            return { ...state, hintsSelectType };
        });
    },
    hintsSelectProgres: '',
    setHintsSelectProgres: (hintsSelectProgres: string) => {
        set(state => {
            return { ...state, hintsSelectProgres };
        });
    }
});

const creatLongDragonStore = (init: InitState) =>
    (useLongDragonStore = initStore<LongDragonState>(initialState, init));

export { creatLongDragonStore, useLongDragonStore };

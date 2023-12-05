import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    forbiddenWords: string[];
}

interface MessageInfo extends InitState {
    setForbiddenWords: ({ forbiddenWords }: { forbiddenWords: string[] }) => void;
}

let isInit = true;
let useMessageStore: StoreWithSelectors<MessageInfo>;

const initialState = (set: (updater: (state: MessageInfo) => Partial<MessageInfo>) => void) => ({
    forbiddenWords: [],
    setForbiddenWords: ({ forbiddenWords }: { forbiddenWords: string[] }) => {
        set(() => ({ forbiddenWords }));
    }
});

const createMessageStore = (init: InitState) => {
    if (isInit) {
        useMessageStore = initStore<MessageInfo>(initialState, init);
        isInit = false;
    }
};

export { createMessageStore, useMessageStore };

'use client';
import { useEffect } from 'react';
import { getContestList } from 'data-center';
import { createContestListGlobalStore } from './contestListGlobalStore';

function ContestStoreHandler() {
    useEffect(() => {
        const fetchData = async () => {
            const timestamp = Math.floor(Date.now() / 1000);
            const todayContest = await getContestList(timestamp);
            if (todayContest.success) {
                createContestListGlobalStore(todayContest.data);
            }
        };

        void fetchData();
    }, []);

    return null;
}

export default ContestStoreHandler;

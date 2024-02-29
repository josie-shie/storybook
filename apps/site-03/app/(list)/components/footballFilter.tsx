'use client';
import ContestFilter from '@/components/contestFilter/contestFilter';
import type { FilterList } from '@/components/contestFilter/contestFilter';
import { useContestListStore } from '../contestListStore';

type Status = 'all' | 'progress' | 'schedule' | 'result';

function FootballFilter({
    updateFilterList,
    tabStatus,
    statusFunc,
    scheduleDate,
    resultsDate
}: {
    updateFilterList: (newList: FilterList) => void;
    tabStatus: Status;
    statusFunc: (status: number) => boolean;
    scheduleDate: number;
    resultsDate: number;
}) {
    const contestInfo = useContestListStore.use.contestInfo();
    const scheduleContestInfo = useContestListStore.use.scheduleContestInfo();
    const resultContestInfo = useContestListStore.use.resultContestInfo();

    const targetContestInfoMap = {
        all: contestInfo,
        progress: contestInfo,
        schedule: scheduleContestInfo,
        result: resultContestInfo
    };
    const currentInfo = Object.values(targetContestInfoMap[tabStatus]).filter(item =>
        statusFunc(item.state)
    );

    return (
        <ContestFilter
            contestInfo={currentInfo}
            resultsDate={resultsDate}
            scheduleDate={scheduleDate}
            updateFilterList={updateFilterList}
        />
    );
}

export default FootballFilter;

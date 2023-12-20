'use client';
import ContestFilter from '@/components/contestFilter/contestFilter';
import type { FilterList } from '@/components/contestFilter/contestFilter';
import { useContestListStore } from '../contestListStore';

function FootballFilter({
    updateFilterList,
    statusFunc
}: {
    updateFilterList: (newList: FilterList) => void;
    statusFunc: (status: number) => boolean;
}) {
    const contestInfo = useContestListStore.use.contestInfo();
    const currentInfo = Object.values(contestInfo).filter(item => statusFunc(item.state));

    return <ContestFilter contestInfo={currentInfo} updateFilterList={updateFilterList} />;
}

export default FootballFilter;

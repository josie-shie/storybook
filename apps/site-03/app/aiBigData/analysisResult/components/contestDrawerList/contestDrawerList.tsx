import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { GetFootballStatsMatch } from 'data-center';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import NoData from '@/components/baseNoData/noData';
import MatchFilterDrawer from '../matchFilterDrawer/matchFilterDrawer';
import { useMatchFilterStore } from '../../matchFilterStore';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import style from './contestDrawerList.module.scss';
import iconFilter from './img/filterIcon.png';
import ContestCard from '../contestCard/contestCard';

function ContestDrawerList({
    isOpen,
    onOpen,
    onClose,
    matchList,
    selectedResult
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    matchList: GetFootballStatsMatch[];
    selectedResult: { type: string; odds: string };
}) {
    const pathMatch = {
        0: '让分/大小趋势',
        1: '15分钟进球',
        2: '进球数区间',
        3: '波胆'
    };
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const filterList = useMatchFilterStore.use.filterList();
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const contestList = useMatchFilterStore.use.contestList();
    const defaultPageIndex = useAnalyticsResultStore.use.defaultPageIndex();

    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    const openFilter = () => {
        setIsFilterOpen(true);
    };

    useEffect(() => {
        setFilterInit();
    }, [contestInfo, setFilterInit]);

    useEffect(() => {
        setIsFilterOpen(false);
    }, []);

    const filterByStatus = (list: number[]) => {
        const filterGroup = filterList.group === 'league' ? 'leagueChsShort' : 'countryCn';
        return list.filter(item => {
            if (
                Object.keys(filterList.selectedTable).length > 0 &&
                !filterList.selectedTable[contestInfo[item][filterGroup]]
            ) {
                return false;
            }
            return item;
        });
    };

    const currentList = filterByStatus(contestList);
    const displayList = matchList.filter(match => currentList.includes(match.matchId));

    return (
        <>
            <BottomDrawer
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                propsStyle={{ height: 'calc(100dvh - 54px)' }}
            >
                <div className={style.contestDrawerList}>
                    <div className={style.header}>
                        <h2>
                            <span>{pathMatch[defaultPageIndex] || ''} </span>
                            <span className={style.detail}>
                                {selectedResult.type} {selectedResult.odds},{' '}
                            </span>
                            <span>
                                总共<span className={style.contestNum}>{contestList.length}</span>场
                            </span>
                        </h2>
                        <div
                            className={style.filter}
                            onClick={() => {
                                openFilter();
                            }}
                        >
                            筛选
                            <Image alt="" className={style.image} src={iconFilter} />
                        </div>
                    </div>

                    <div className={style.cardList}>
                        {displayList.length ? (
                            displayList.map(match => (
                                <ContestCard key={match.matchId} match={match} />
                            ))
                        ) : (
                            <NoData text="暂无资料" />
                        )}
                    </div>
                </div>
            </BottomDrawer>
            <MatchFilterDrawer isOpen={isFilterOpen} onClose={closeFilter} onOpen={openFilter} />
        </>
    );
}

export default ContestDrawerList;

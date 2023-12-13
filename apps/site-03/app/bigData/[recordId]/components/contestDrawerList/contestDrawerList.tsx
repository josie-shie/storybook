import { timestampToString } from 'lib';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { GetAiAnalysisContest } from 'data-center';
import MatchFilterDrawer from '../matchFilterDrawer/matchFilterDrawer';
import { useMatchFilterStore } from '../../matchFilterStore';
import style from './contestDrawerList.module.scss';
import iconFilter from './img/filterIcon.png';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import NoData from '@/components/baseNoData/noData';

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
    matchList: GetAiAnalysisContest[];
    selectedResult: { type: string; odds: string };
}) {
    const pathname = usePathname();
    const currentPath = pathname.split('/').pop();
    const pathMatch = {
        handicap: '让球大小',
        minutes: '15分钟进球',
        range: '进球数区间',
        bodan: '波胆'
    };
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const setFilterInit = useMatchFilterStore.use.setFilterInit();
    const filterList = useMatchFilterStore.use.filterList();
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const contestList = useMatchFilterStore.use.contestList();

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
            <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
                <div className={style.contestDrawerList}>
                    <div className={style.header}>
                        <h2>{`${(currentPath && pathMatch[currentPath]) || ''}/${
                            selectedResult.type
                        }${selectedResult.odds ? '/' : ''}${selectedResult.odds}`}</h2>
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
                                <Link
                                    href={`/football/${match.matchId}/analyze`}
                                    key={match.matchId}
                                >
                                    <div className={style.contesntList}>
                                        <div className={style.title}>
                                            <span className={style.sport}>
                                                {match.leagueChsShort}
                                            </span>
                                            <span className={style.time}>
                                                {timestampToString(
                                                    match.startTime,
                                                    'YYYY-MM-DD HH:mm'
                                                )}
                                            </span>
                                        </div>
                                        <div className={style.game}>
                                            <div className={`${style.team} ${style.home}`}>
                                                <div className={style.name}>{match.homeChs}</div>
                                            </div>
                                            <div className={style.contest}>
                                                <span className={`${style.status} ${style.ing}`}>
                                                    {match.homeScore}-{match.awayScore}
                                                </span>
                                                <span className={style.number}>
                                                    ({match.homeHalfScore}-{match.awayHalfScore})
                                                </span>
                                            </div>
                                            <div className={`${style.team} ${style.away}`}>
                                                <div className={style.name}>{match.awayChs}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <NoData />
                        )}
                    </div>
                </div>
            </BottomDrawer>
            <MatchFilterDrawer isOpen={isFilterOpen} onClose={closeFilter} onOpen={openFilter} />
        </>
    );
}

export default ContestDrawerList;

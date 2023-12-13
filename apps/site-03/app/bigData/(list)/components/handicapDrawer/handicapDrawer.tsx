import Image from 'next/image';
import { useState } from 'react';
import HandicapTips from '../handicapTips/handicapTips';
import { useHintsFormStore } from '../../hintsFormStore';
import MatchFilterDrawer from '../matchFilterDrawer/matchFilterDrawer';
import { useMatchFilterStore } from '../../matchFilterStore';
import style from './handicapDrawer.module.scss';
import iconSort from './img/sort.png';
import iconFilter from './img/filterIcon.png';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import NoData from '@/components/baseNoData/noData';

function RecordFilter({
    isOpen,
    onOpen,
    onClose,
    hintsSelected
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    hintsSelected: string;
}) {
    const handicapTips = useHintsFormStore.use.handicapTips();
    const contestInfo = useMatchFilterStore.use.contestInfo();
    const contestList = useMatchFilterStore.use.contestList();
    const filterList = useMatchFilterStore.use.filterList();
    const setHandicapTips = useHintsFormStore.use.setHandicapTips();
    const timeAscending = useHintsFormStore.use.timeAscending();
    const setTimeAscending = useHintsFormStore.use.setTimeAscending();
    const handicapAscending = useHintsFormStore.use.handicapAscending();
    const setHandicapAscending = useHintsFormStore.use.setHandicapAscending();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const changeTimeSorting = () => {
        const newHandicapTips = [...handicapTips];

        newHandicapTips.sort((a, b) =>
            !timeAscending ? a.startTime - b.startTime : b.startTime - a.startTime
        );

        setTimeAscending(!timeAscending);
        setHandicapTips(newHandicapTips);
    };

    const changeHandicapSorting = () => {
        const newHandicapTips = [...handicapTips];

        newHandicapTips.sort((a, b) =>
            !handicapAscending
                ? a.longOddsTimes - b.longOddsTimes
                : b.longOddsTimes - a.longOddsTimes
        );

        setHandicapAscending(!handicapAscending);
        setHandicapTips(newHandicapTips);
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    const openFilter = () => {
        setIsFilterOpen(true);
    };

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
    const displayList = handicapTips.filter(match => currentList.includes(match.matchId));

    return (
        <>
            <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
                <div className={style.handicapDrawer}>
                    <div className={style.title}>盘路提示</div>
                    <div className={style.sort}>
                        <div className={style.orderButton}>
                            <div className={style.button} onClick={changeTimeSorting}>
                                <span>开赛时间</span>
                                <Image alt="" className={style.image} src={iconSort} />
                            </div>
                            <div className={style.button} onClick={changeHandicapSorting}>
                                <span>盘路</span>
                                <Image alt="" className={style.image} src={iconSort} />
                            </div>
                        </div>
                        <button
                            className={style.filter}
                            disabled={!displayList.length}
                            onClick={openFilter}
                            type="button"
                        >
                            筛选
                            <Image alt="" className={style.image} src={iconFilter} />
                        </button>
                    </div>
                    {displayList.length ? (
                        displayList.map(ele => (
                            <HandicapTips
                                hintsSelected={hintsSelected}
                                key={ele.matchId}
                                tipsData={ele}
                            />
                        ))
                    ) : (
                        <NoData />
                    )}
                </div>
            </BottomDrawer>
            <MatchFilterDrawer isOpen={isFilterOpen} onClose={closeFilter} onOpen={openFilter} />
        </>
    );
}

export default RecordFilter;

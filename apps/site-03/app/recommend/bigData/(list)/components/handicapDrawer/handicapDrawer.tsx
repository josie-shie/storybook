import Image from 'next/image';
import HandicapTips from '../handicapTips/handicapTips';
import { useDiscSelectStore } from '../../discSelectStore';
import style from './handicapDrawer.module.scss';
import iconSort from './img/sort.png';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function RecordFilter({
    isOpen,
    onOpen,
    onClose
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    const handicapTips = useDiscSelectStore.use.handicapTips();
    const setHandicapTips = useDiscSelectStore.use.setHandicapTips();
    const timeAscending = useDiscSelectStore.use.timeAscending();
    const setTimeAscending = useDiscSelectStore.use.setTimeAscending();
    const handicapAscending = useDiscSelectStore.use.handicapAscending();
    const setHandicapAscending = useDiscSelectStore.use.setHandicapAscending();

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

    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <div className={style.handicapDrawer}>
                <div className={style.title}>盘路提示</div>
                <div className={style.sort}>
                    <div className={style.button} onClick={changeTimeSorting}>
                        <span>开赛时间</span>
                        <Image alt="" className={style.image} src={iconSort} />
                    </div>
                    <div className={style.button} onClick={changeHandicapSorting}>
                        <span>盘路</span>
                        <Image alt="" className={style.image} src={iconSort} />
                    </div>
                </div>
                {handicapTips.map(ele => (
                    <HandicapTips key={ele.matchId} tipsData={ele} />
                ))}
            </div>
        </BottomDrawer>
    );
}

export default RecordFilter;

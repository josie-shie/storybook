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

    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <div className={style.handicapDrawer}>
                <div className={style.title}>盘路提示</div>
                <div className={style.sort}>
                    <div className={style.button}>
                        <span>开赛时间</span>
                        <Image alt="" className={style.image} src={iconSort} />
                    </div>
                    <div className={style.button}>
                        <span>盘路</span>
                        <Image alt="" className={style.image} src={iconSort} />
                    </div>
                </div>
                {handicapTips.map(ele => (
                    <HandicapTips
                        betStatus={ele.betStatus}
                        betType={ele.betType}
                        gamesNumber={ele.gamesNumber}
                        hot={ele.hot}
                        key={ele.id}
                    />
                ))}
            </div>
        </BottomDrawer>
    );
}

export default RecordFilter;

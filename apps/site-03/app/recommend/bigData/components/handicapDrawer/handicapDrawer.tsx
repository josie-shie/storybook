import Image from 'next/image';
import HandicapTips from '../handicapTips/handicapTips';
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
                <HandicapTips gamesNumber={4} hot />
                <HandicapTips gamesNumber={3} hot={false} />
                <HandicapTips gamesNumber={3} hot={false} />
                <HandicapTips gamesNumber={3} hot={false} />
                <HandicapTips gamesNumber={3} hot={false} />
                <HandicapTips gamesNumber={3} hot={false} />
                <HandicapTips gamesNumber={3} hot={false} />
                <HandicapTips gamesNumber={3} hot={false} />
                <HandicapTips gamesNumber={3} hot={false} />
            </div>
        </BottomDrawer>
    );
}

export default RecordFilter;

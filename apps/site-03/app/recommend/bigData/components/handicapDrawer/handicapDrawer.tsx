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
                <HandicapTips betType="handicap" gamesNumber={5} />
                <HandicapTips betStatus="win" gamesNumber={3} />
                <HandicapTips betStatus="lose" gamesNumber={3} />
                <HandicapTips betStatus="big" gamesNumber={3} hot />
                <HandicapTips gamesNumber={6} hot />
                <HandicapTips betStatus="big" gamesNumber={6} />
                <HandicapTips betStatus="big" gamesNumber={6} />
            </div>
        </BottomDrawer>
    );
}

export default RecordFilter;

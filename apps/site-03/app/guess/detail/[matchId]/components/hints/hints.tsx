import FingerPointer from '../../img/highlight.svg';
import style from './hints.module.scss';

function Hints({ onClose }: { onClose: () => void }) {
    return (
        <div className={style.hints} onClick={onClose}>
            <div className={style.overlay} />
            <FingerPointer className={style.finger} />
            <div className={style.text}>
                <p>点击猜球</p>
                即可解锁高胜率玩家风向
            </div>
        </div>
    );
}

export default Hints;

import { useState } from 'react';
import FingerPointer from '../../img/highlight.svg';
import style from './hints.module.scss';

function Hints() {
    const [showHints, setShowHints] = useState(localStorage.getItem('guessHints') || 'show');

    const handleCloseHints = () => {
        localStorage.setItem('guessHints', 'hide');
        setShowHints('hide');
    };

    if (showHints !== 'show') return null;
    return (
        <div className={style.hints} onClick={handleCloseHints}>
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

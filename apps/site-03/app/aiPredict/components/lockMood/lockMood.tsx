import PaidButton from './paidButton';
import style from './lockMood.module.scss';

function LockMood() {
    return (
        <div className={style.lockMood}>
            <div className={style.content} />
            <PaidButton />
        </div>
    );
}

export default LockMood;

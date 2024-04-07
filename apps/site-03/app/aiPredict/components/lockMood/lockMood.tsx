import PaidButton from './paidButton';
import style from './lockMood.module.scss';

function LockMood({ onPay }: { onPay: () => void }) {
    return (
        <div className={style.lockMood}>
            <div className={style.content} />
            <PaidButton onPay={onPay} />
        </div>
    );
}

export default LockMood;

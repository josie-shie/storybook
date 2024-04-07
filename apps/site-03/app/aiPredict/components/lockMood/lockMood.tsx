import PaidButton from './paidButton';
import style from './lockMood.module.scss';

function LockMood({
    setIsOpenPayDrawer
}: {
    setIsOpenPayDrawer: (isOpenPayDrawer: boolean) => void;
}) {
    return (
        <div className={style.lockMood}>
            <div className={style.content} />
            <PaidButton setIsOpenPayDrawer={setIsOpenPayDrawer} />
        </div>
    );
}

export default LockMood;

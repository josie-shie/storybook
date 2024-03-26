import { useUserStore } from '@/store/userStore';
import style from './lockMood.module.scss';
import StarIcon from './img/starIcon.svg';
import Lightning from './img/lightning.svg';

function PaidButton() {
    const isLogin = useUserStore.use.isLogin();
    return (
        <div className={style.paidButton}>
            <StarIcon />
            {isLogin ? <div>0</div> : null}
            <div className={`${isLogin ? style.line : ''}`}>30</div>
            <div>解锁本场预测</div>
            {isLogin ? (
                <div className={`${style.freeIcon} ${style.paddingLess}`}>
                    <div>限时免费</div>
                    <Lightning />
                </div>
            ) : (
                <div className={style.freeIcon}>
                    <div className={style.opacity}>会员</div>
                    <div>限时免费</div>
                    <Lightning />
                </div>
            )}
        </div>
    );
}

export default PaidButton;

import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import style from './lockMood.module.scss';
import StarIcon from './img/starIcon.svg';
import Lightning from './img/lightning.svg';

function PaidButton({
    setIsOpenPayDrawer
}: {
    setIsOpenPayDrawer: (isOpenPayDrawer: boolean) => void;
}) {
    const isLogin = useUserStore.use.isLogin();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();

    const openLoginDrawer = () => {
        setAuthQuery('login');
        setIsDrawerOpen(true);
    };

    const handleClick = () => {
        isLogin ? setIsOpenPayDrawer(true) : openLoginDrawer();
    };

    return (
        <div className={style.paidButton} onClick={handleClick}>
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
                <div className={style.freeIcon} onClick={openLoginDrawer}>
                    <div className={style.opacity}>会员</div>
                    <div>限时免费</div>
                    <Lightning />
                </div>
            )}
        </div>
    );
}

export default PaidButton;

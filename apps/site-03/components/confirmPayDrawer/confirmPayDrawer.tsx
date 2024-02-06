import { Button } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useUserStore } from '@/store/userStore';
import style from './confirmPayDrawer.module.scss';
import Soccer from './img/soccer.svg';
import Coin from './img/coin.svg';

interface ConfirmPayDrawerProps {
    title?: string;
    price: number;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    onPay: () => void;
}

function ConfirmPayDrawer({
    isOpen,
    onClose,
    onOpen,
    onPay,
    price,
    title = '解锁本场?'
}: ConfirmPayDrawerProps) {
    const userInfo = useUserStore.use.userInfo();

    return (
        <SwipeableDrawer
            PaperProps={{
                style: {
                    overflowY: 'unset',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px'
                }
            }}
            anchor="bottom"
            onClose={onClose}
            onOpen={onOpen}
            open={isOpen}
            swipeAreaWidth={20}
            transitionDuration={{ enter: 300, exit: 200 }}
        >
            <div className={style.confirmPay}>
                <div className={style.PayHandImg}>
                    <Soccer />
                </div>
                <div className={style.payContent}>
                    <div className={style.price}>
                        <span className={style.text}>支付</span>
                        <span className={style.number}>
                            <Coin className={style.star} />
                            {price}
                        </span>
                    </div>
                    <span className={style.text}>{title}</span>
                </div>
                <div className={style.balance}>
                    我的余额: {userInfo.balance ? userInfo.balance : 0}金币
                </div>
                <Button className={style.payBtn} fullWidth onClick={onPay}>
                    <Coin className={style.star} />
                    <span>支付</span>
                </Button>
            </div>
        </SwipeableDrawer>
    );
}

export default ConfirmPayDrawer;

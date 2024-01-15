import Image from 'next/image';
import { useUserStore } from '@/app/userStore';
import style from './confirmPayArticle.module.scss';
import Star from './img/star.png';

function ConfirmPayArticle({ price }: { price: number }) {
    const userInfo = useUserStore.use.userInfo();
    return (
        <div className={style.confirmPay}>
            <div className={style.payContent}>
                <div className={style.price}>
                    <span className={style.text}>支付</span>
                    <span className={style.number}>
                        <Image alt="" className={style.image} src={Star} width={14} />
                        {price}
                    </span>
                </div>
                <span className={style.text}>解锁本场?</span>
            </div>
            <div className={style.balance}>
                我的餘額: {userInfo.balance ? userInfo.balance : 0}金幣
            </div>
        </div>
    );
}

export default ConfirmPayArticle;

import Image from 'next/image';
import { type PaymentData } from '../tradeDetailStore';
import style from './payment.module.scss';
import incomeIcon from './img/income.png';
import paymentIcon from './img/payment.png';

interface PropsType {
    data: PaymentData;
}

const typeMap = {
    1: '支付-包月訂閱',
    2: '支付-解锁高手分布',
    3: '收入-邀请好友奖励',
    4: '收入-文章解锁'
};

function Payment({ data }: PropsType) {
    const money = data.result > 0 ? `+${data.result}` : data.result;
    const isPayment = data.type === 1 || data.type === 2;

    return (
        <div className={style.payment}>
            <div className={style.left}>
                {isPayment ? (
                    <Image alt="" height={32} src={paymentIcon} width={32} />
                ) : (
                    <Image alt="" height={32} src={incomeIcon} width={32} />
                )}
            </div>
            <div className={style.center}>
                <div className={`${style.title} ${isPayment ? style.black : ''}`}>
                    {typeMap[data.type]}
                </div>
                <div className={style.content}>{data.time}</div>
            </div>
            <div className={style.right}>
                <div className={`${style.money} ${isPayment ? style.black : ''}`}>RMB {money}</div>
                <div className={style.overage}>可用馀额：{data.overage}</div>
            </div>
        </div>
    );
}

export default Payment;

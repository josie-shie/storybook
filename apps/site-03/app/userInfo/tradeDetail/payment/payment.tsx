import Image from 'next/image';
import { type PaymentData } from '../tradeDetailStore';
import style from './payment.module.scss';
import incomeIcon from './img/income.png';
import paymentIcon from './img/payment.png';

interface PropsType {
    data: PaymentData;
}

function Payment({ data }: PropsType) {
    const money = data.amountOfChange > 0 ? `+${data.amountOfChange}` : data.amountOfChange;
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
                <div className={`${style.title} ${isPayment && style.black}`}>
                    {data.changeTypeDisplayName}
                </div>
                <div className={style.content}>{data.createdAt}</div>
            </div>
            <div className={style.right}>
                <div className={`${style.money} ${isPayment && style.black}`}>RMB {money}</div>
                <div className={style.overage}>可用馀额：{data.balanceAfter}</div>
            </div>
        </div>
    );
}

export default Payment;

import Image from 'next/image';
import { timestampToString } from 'lib';
import { type GetMemberTransactionData } from 'data-center';
import style from './payment.module.scss';
import incomeIcon from './img/income.png';
import paymentIcon from './img/payment.png';

interface PropsType {
    data: GetMemberTransactionData;
}

function Payment({ data }: PropsType) {
    const money = data.amountOfChange > 0 ? `+${data.amountOfChange}` : data.amountOfChange;
    const isPayment = data.changeTypeCategory === 'PAY';

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
                    {data.changeTypeCategoryDisplayName}-{data.changeTypeDisplayName}
                </div>
                <div className={style.content}>
                    {timestampToString(data.createdAt, 'YYYY/MM/DD HH:mm')}
                </div>
            </div>
            <div className={style.right}>
                <div className={`${style.money} ${isPayment && style.black}`}>平台币 {money}</div>
                <div className={style.overage}>可用馀额：{data.balanceAfter}</div>
            </div>
        </div>
    );
}

export default Payment;
